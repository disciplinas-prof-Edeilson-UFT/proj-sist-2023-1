from abc import ABC, abstractmethod
from src.models.card import Card
from typing import List


class CardRepository(ABC):

    @abstractmethod
    def findMany(self, filter: dict) -> List[Card]:
        raise Exception("method not implemented")

    @abstractmethod
    def findOne(self, filter: dict) -> Card:
        raise Exception("method not implemented")

    @abstractmethod
    def insert(self, data: dict):
        raise Exception("method not implemented")

    @abstractmethod
    def findOneAndUpdate(self, filter: dict, data: dict):
        raise Exception("method not implemented")
    
    @abstractmethod
    def deleteOne(self, filter: dict):
        raise Exception("method not implemented")
