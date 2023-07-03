from abc import ABC, abstractmethod
from src.models.order import Order


class OrderRepository(ABC):

    @abstractmethod
    def findOne(self, filter: dict) -> Order:
        raise Exception("method not implemented")

    @abstractmethod
    def insert(self, data: dict):
        raise Exception("method not implemented")

    @abstractmethod
    def findOneAndUpdate(self, filter: dict, data: dict):
        raise Exception("method not implemented")
