import json
from bson.json_util import dumps


def serialize(data):
    return json.loads(dumps(data))
