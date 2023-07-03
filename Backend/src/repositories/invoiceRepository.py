from abc import ABC, abstractmethod
from src.models.invoice import Invoice
from typing import List


class InvoiceRepository(ABC):

    @abstractmethod
    def findOne(self, filter: dict) -> Invoice:
        raise Exception("method not implemented")

    @abstractmethod
    def insert(self, data: dict):
        raise Exception("method not implemented")

    @abstractmethod
    def findOneAndUpdate(self, filter: dict, data: dict):
        raise Exception("method not implemented")

    @abstractmethod
    def findMany(self, filter: dict) -> List[Invoice]:
        raise Exception("method not implemented")
