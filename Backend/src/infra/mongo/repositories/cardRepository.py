from ..connection import getDatabase
from src.models.card import Card
from src.repositories.cardRepository import CardRepository
from typing import List


class CardRepository(CardRepository):
    __database = getDatabase()
    __collection = __database.cards

    def findMany(self, filter: dict) -> List[Card]:
        cardFinded = self.__collection.find(filter)
        results = []

        for card in cardFinded:
            cards = Card(
                id = str(card.get("_id")),
                owner_name = card.get("owner_name"),
                card_number = card.get("card_number"),
                expiration_date = card.get("expiration_date")
            )
            results.append(cards)

        return results  

    def findOne(self, filter: dict) -> Card:
        cardFinded: dict = self.__collection.find_one(filter=filter)
        card = Card()
        if cardFinded:
            card.setId(id=str(cardFinded.get("_id")))
            card.setCardNumber(card_number=str(cardFinded.get("card_number")))
            card.setOwnerName(owner_name=cardFinded.get("owner_name"))
            card.setExpirationDate(expiration_date=cardFinded.get("expiration_date"))
            return card
        return card

    def insert(self, data: dict):
        self.__collection.insert_one(data)

    def findOneAndUpdate(self, filter: dict, data: dict):
        return self.__collection.find_one_and_update(filter, {'$set': data})
    
    def deleteOne(self, filter: dict):
        return self.__collection.delete_one(filter)
