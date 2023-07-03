from abc import ABC, abstractmethod
from src.models.category import Category


class CategoryRepository(ABC):

    @abstractmethod
    def findMany(self):
        raise Exception("method not implemented")

    @abstractmethod
    def findOne(self, filter: dict) -> Category:
        raise Exception("method not implemented")

    @abstractmethod
    def insert(self, data: dict):
        raise Exception("method not implemented")

    @abstractmethod
    def findOneAndUpdate(self, filter: dict, data: dict):
        raise Exception("method not implemented")
