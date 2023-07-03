from src.repositories.cardRepository import CardRepository
from src.utils.convertToCard import convertToCard
from bson.objectid import ObjectId
import base64


class CardService:
    __cardRepository: CardRepository

    def __init__(self, cardRepository: CardRepository) -> None:
        self.__cardRepository = cardRepository

    def updateCard(self, httpRequest: dict):
        card = convertToCard(httpRequest.get("body"))
        cardId = httpRequest['params']

        if not self.__cardRepository.findOne({"_id": ObjectId(cardId)}).getId():
            return {"body": {"message": "not found"}, "statusCode": 404}

        data = {}

        if card.getOwnerName():
            data["owner_name"] = card.getOwnerName()
        if card.getExpirationDate():
            data["expiration_date"] = card.getExpirationDate()
        if card.getCardNumber():
            CardNumber = card.getCardNumber()
            encodeCardNumber = CardNumber.encode('utf-8')
            CardData = base64.b64encode(encodeCardNumber).decode('utf-8')
            data["card_number"] = CardData

        self.__cardRepository.findOneAndUpdate(
            {"_id": ObjectId(cardId)}, data)

        return {"body": {"message": "updated with success"}, "statusCode": 200}

    def deleteCard(self, httpRequest: dict):
        cardId = httpRequest['params']

        if not self.__cardRepository.findOne({"_id": ObjectId(cardId)}).getId():
            return {"body": {"message": "not found"}, "statusCode": 404}

        self.__cardRepository.deleteOne(
            {"_id": ObjectId(cardId)})

        return {"body": {"message": "deleted successfully"}, "statusCode": 200}
