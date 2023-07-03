from abc import ABC, abstractmethod
from src.models.product import Product
from typing import List


class ProductRepository(ABC):

    @abstractmethod
    def findMany(self, filter: dict) -> List[Product]:
        raise Exception("method not implemented")

    @abstractmethod
    def findOne(self, filter: dict) -> Product:
        raise Exception("method not implemented")

    @abstractmethod
    def insert(self, data: dict) -> str:
        raise Exception("method not implemented")

    @abstractmethod
    def findOneAndUpdate(self, filter: dict, data: dict):
        raise Exception("method not implemented")
