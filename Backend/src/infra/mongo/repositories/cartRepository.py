from ..connection import getDatabase
from src.models.cart import Cart
from src.repositories.cartRepository import CartRepository


class CartRepository(CartRepository):
    __database = getDatabase()
    __collection = __database.carts

    def findOne(self, filter: dict) -> Cart:
        cartFound: dict = self.__collection.find_one(filter=filter)
        cart = Cart()
        if cartFound:
            cart.setId(id=str(cartFound.get('_id')))
            cart.setUserId(user_id=str(cartFound.get("user_id")))
            cart.setProducts(products=cartFound.get("products"))
            return cart
        return cart

    def insert(self, data: dict):
        self.__collection.insert_one(data)

    def findOneAndUpdate(self, filter: dict, data: dict):
        return self.__collection.find_one_and_update(filter, {'$set': data})
