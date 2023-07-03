from src.models.card import Card
from src.repositories.cardRepository import CardRepository
from typing import List

class CardRepositoryMock(CardRepository):
    def findOne(self, filter: dict) -> Card:
        return Card (id="6449c9872ae737b6a694a931",owner_name="Iana ovos da silva gloria", expiration_date="05/28",card_number="987654321")

    def insert(self, data: dict):
        return 
    def findOneAndUpdate(self, filter: dict, data: dict):
        return Card (id="6449c9872ae737b6a694a931",owner_name="Iana ovos da silva gloria", expiration_date="05/28",card_number="987654321")
    
    def findMany(self, filter: dict) -> List[Card]:
        return
    
    def deleteOne(self, filter: dict):
        return Card (id="6449c9872ae737b6a694a931")
