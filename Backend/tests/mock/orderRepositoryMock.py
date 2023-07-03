from src.models.order import Order
from src.repositories.orderRepository import OrderRepository


class OrderRepositoryMock(OrderRepository):
    def findOne(self, filter: dict) -> Order:
        return Order(id="123", products=["123456789"], user_id="123", amount=10)

    def insert(self, data: dict):
        return "123"

    def findOneAndUpdate(self, filter: dict, data: dict):
        return
