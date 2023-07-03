from abc import ABC, abstractmethod
from src.models.pix import Pix


class PixRepository(ABC):

    @abstractmethod
    def findOne(self, filter: dict) -> Pix:
        raise Exception("method not implemented")

    @abstractmethod
    def insert(self, data: dict):
        raise Exception("method not implemented")

    @abstractmethod
    def findOneAndUpdate(self, filter: dict, data: dict):
        raise Exception("method not implemented")
