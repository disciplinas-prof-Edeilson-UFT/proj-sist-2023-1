from abc import ABC, abstractmethod
from src.models.user import User


class UserRepository(ABC):

    @abstractmethod
    def findOne(self, filter: dict) -> User:
        raise Exception("method not implemented")

    @abstractmethod
    def insert(self, data: dict):
        raise Exception("method not implemented")

    @abstractmethod
    def findOneAndUpdate(self, filter: dict, data: dict):
        raise Exception("method not implemented")
