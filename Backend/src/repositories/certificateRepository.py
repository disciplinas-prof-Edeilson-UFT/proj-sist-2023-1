from abc import ABC, abstractmethod
from src.models.certificate import Certificate
from typing import List


class CertificateRepository(ABC):

    @abstractmethod
    def findOne(self, filter: dict) -> Certificate:
        raise Exception("method not implemented")

    @abstractmethod
    def insert(self, data: dict):
        raise Exception("method not implemented")

    @abstractmethod
    def findOneAndUpdate(self, filter: dict, data: dict):
        raise Exception("method not implemented")

    @abstractmethod
    def findMany(self, filter: dict) -> List[Certificate]:
        raise Exception("method not implemented")
