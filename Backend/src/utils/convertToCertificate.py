from src.models.certificate import Certificate

def convertToCertificate(body: dict):
    certificate = Certificate(id=body.get("id"),user_id=body.get("user_id"),
                invoice_id=body.get("invoice_id"), order_id=body.get("order_id"), certificate_url=body.get("certificate_url"), product_id=body.get("product_id"))
    return certificate
