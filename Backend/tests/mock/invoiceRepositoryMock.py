from src.models.invoice import Invoice
from src.repositories.invoiceRepository import InvoiceRepository
from typing import List


class InvoiceRepositoryMock(InvoiceRepository):
    def findMany(self, filter: dict) -> List[Invoice]:
        return Invoice(id="123", user_id="123", order_id="123", type="card", amount=10)
    
    def findOne(self, filter: dict) -> Invoice:
        return Invoice(id="123", user_id="123", order_id="123", type="card", amount=10)

    def insert(self, data: dict):
        return "123"

    def findOneAndUpdate(self, filter: dict, data: dict):
        return
    
    def findMany(self, filter: dict) -> List[Invoice]:
        return
