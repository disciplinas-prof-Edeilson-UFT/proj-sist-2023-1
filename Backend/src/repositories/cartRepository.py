from abc import ABC, abstractmethod
from src.models.cart import Cart


class CartRepository(ABC):

    @abstractmethod
    def findOne(self, filter: dict) -> Cart:
        raise Exception("method not implemented")

    @abstractmethod
    def insert(self, data: dict):
        raise Exception("method not implemented")

    @abstractmethod
    def findOneAndUpdate(self, filter: dict, data: dict):
        raise Exception("method not implemented")
