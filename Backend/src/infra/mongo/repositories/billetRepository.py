from ..connection import getDatabase
from src.models.billet import Billet
from src.repositories.billetRepository import BilletRepository


class BilletRepository(BilletRepository):
    __database = getDatabase()
    __collection = __database.billets

    def findOne(self, filter: dict) -> Billet:
        billetFound: dict = self.__collection.find_one(filter=filter)
        billet = Billet()
        if billetFound:
            billet.setId(id=str(billetFound.get("_id")))
            billet.setOrderId(order_id=str(billetFound.get("order_id")))
            billet.setUserId(user_id=str(billetFound.get("user_id")))
            billet.setAmount(amount=float(billetFound.get("amount")))
            billet.setBrCode(br_code=str(billetFound.get("br_code")))
            return billet
        return billet

    def insert(self, data: dict):
        return str(self.__collection.insert_one(data).inserted_id)

    def findOneAndUpdate(self, filter: dict, data: dict):
        return self.__collection.find_one_and_update(filter, {'$set': data})
