from ..connection import getDatabase
from src.models.pix import Pix
from src.repositories.pixRepository import PixRepository


class PixRepository(PixRepository):
    __database = getDatabase()
    __collection = __database.pix

    def findOne(self, filter: dict) -> Pix:
        pixFound: dict = self.__collection.find_one(filter=filter)
        pix = Pix()
        if pixFound:
            pix.setId(id=str(pixFound.get("_id")))
            pix.setOrderId(order_id=str(pixFound.get("order_id")))
            pix.setUserId(user_id=str(pixFound.get("user_id")))
            pix.setAmount(amount=float(pixFound.get("amount")))
            pix.setBrCode(br_code=str(pixFound.get("br_code")))
            return pix
        return pix

    def insert(self, data: dict):
        return str(self.__collection.insert_one(data).inserted_id)

    def findOneAndUpdate(self, filter: dict, data: dict):
        return self.__collection.find_one_and_update(filter, {'$set': data})
