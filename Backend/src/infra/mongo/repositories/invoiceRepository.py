from ..connection import getDatabase
from src.models.invoice import Invoice
from src.repositories.invoiceRepository import InvoiceRepository
from typing import List


class InvoiceRepository(InvoiceRepository):
    __database = getDatabase()
    __collection = __database.invoices

    def findOne(self, filter: dict) -> Invoice:
        invoiceFinded: dict = self.__collection.find_one(filter=filter)
        invoice = Invoice()
        if invoiceFinded:
            invoice.setId(id=str(invoiceFinded.get('_id')))
            invoice.setUserId(user_id=str(invoiceFinded.get("user_id")))
            invoice.setOrderId(order_id=invoiceFinded.get("order_id"))
            invoice.setType(type=invoiceFinded.get("type"))
            invoice.setAmount(amount=invoiceFinded.get("amount"))
            invoice.setCardId(id=invoiceFinded.get("card_id"))
            invoice.setBeneficiary(id=invoiceFinded.get("beneficiary"))
            invoice.setStatus(status=invoiceFinded.get("status"))
            invoice.setCreatedAt(datetime=invoiceFinded.get("created_at"))
            return invoice
        return invoice

    def insert(self, data: dict):
        return str(self.__collection.insert_one(data).inserted_id)

    def findOneAndUpdate(self, filter: dict, data: dict):
        return self.__collection.find_one_and_update(filter, {'$set': data})

    def findMany(self, filter: dict) -> List[Invoice]:
        invoicesFinded = self.__collection.find(filter)

        invoices = []
        for invoiceFinded in invoicesFinded:
            invoice = Invoice()
            invoice.setId(id=str(invoiceFinded.get('_id')))
            invoice.setUserId(user_id=str(invoiceFinded.get("user_id")))
            invoice.setOrderId(order_id=str(invoiceFinded.get("order_id")))
            invoice.setType(type=invoiceFinded.get("type"))
            invoice.setAmount(amount=invoiceFinded.get("amount"))
            invoice.setCardId(id=str(invoiceFinded.get("card_id")))
            invoice.setBeneficiary(id=invoiceFinded.get("beneficiary"))
            invoice.setStatus(status=invoiceFinded.get("status"))
            invoice.setCreatedAt(datetime=invoiceFinded.get("created_at"))
            invoices.append(invoice)
        return invoices
