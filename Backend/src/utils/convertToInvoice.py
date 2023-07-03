from src.models.invoice import Invoice


def convertToInvoice(body: dict) -> Invoice:
    invoice = Invoice(id=body.get("id"), user_id=body.get("user_id"), order_id=body.get("order_id"),
                      type=body.get("type"), amount=body.get("amount"), cardId=body.get("card_id"))
    return invoice
