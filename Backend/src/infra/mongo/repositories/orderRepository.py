from ..connection import getDatabase
from src.models.order import Order
from src.repositories.orderRepository import OrderRepository


class OrderRepository(OrderRepository):
    __database = getDatabase()
    __collection = __database.orders

    def findOne(self, filter: dict) -> Order:
        orderFinded: dict = self.__collection.find_one(filter=filter)
        order = Order()
        if orderFinded:
            order.setId(id=str(orderFinded.get('_id')))
            order.setProducts(products=orderFinded.get("products"))
            order.setUserId(user_id=str(orderFinded.get("user_id")))
            order.setAmount(amount=orderFinded.get("amount"))
            return order
        return order

    def insert(self, data: dict):
        return str(self.__collection.insert_one(data).inserted_id)

    def findOneAndUpdate(self, filter: dict, data: dict):
        return self.__collection.find_one_and_update(filter, {'$set': data})
