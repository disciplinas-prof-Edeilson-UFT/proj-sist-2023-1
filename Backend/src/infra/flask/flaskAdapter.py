from flask import Request, jsonify
from src.utils.getInternalError import getInternalError
from src.utils.serialize import serialize


def flaskAdapter(service):
    def adapter(request: Request, params: str = ""):
        httpRequest = {
            "params": params,
            "query": request.args.to_dict(),
            "headers": request.headers,
            "request": request
        }
        if request.method != "GET":
            httpRequest["body"] = request.get_json()
        httpResponse: dict = service(httpRequest)
        if not httpResponse.get("statusCode") and not httpResponse:
            return getInternalError()
        return jsonify(serialize(httpResponse.get("body"))), httpResponse.get("statusCode")
    return adapter
