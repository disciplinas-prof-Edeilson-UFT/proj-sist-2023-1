from src.models.card import Card

def convertToCard(body: dict):
    card = Card(owner_name=body.get("owner_name"),
                card_number=body.get("card_number"), expiration_date=body.get("expiration_date"))
    return card
