from src.models.cart import Cart
from src.repositories.cartRepository import CartRepository


class CartRepositoryMock(CartRepository):
    def findOne(self, filter: dict) -> Cart:
        return Cart(id="123", products=["123456789"], user_id="123")

    def insert(self, data: dict):
        return {
                "user_id": "644b035f21eec2c9e5983ecs",
            	"products": ["646aa34810132814b12b7e83"]
        }

    def findOneAndUpdate(self, filter: dict, data: dict):
        return
