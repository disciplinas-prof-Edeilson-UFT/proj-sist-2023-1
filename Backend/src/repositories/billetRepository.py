from abc import ABC, abstractmethod
from src.models.billet import Billet


class BilletRepository(ABC):

    @abstractmethod
    def findOne(self, filter: dict) -> Billet:
        raise Exception("method not implemented")

    @abstractmethod
    def insert(self, data: dict):
        raise Exception("method not implemented")

    @abstractmethod
    def findOneAndUpdate(self, filter: dict, data: dict):
        raise Exception("method not implemented")
