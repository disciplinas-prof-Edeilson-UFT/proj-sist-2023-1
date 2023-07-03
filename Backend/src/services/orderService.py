from bson.objectid import ObjectId
from src.repositories.cartRepository import CartRepository
from src.repositories.productRepository import ProductRepository
from src.repositories.orderRepository import OrderRepository


class OrderService:

    __cartRepository: CartRepository
    __productRepository: ProductRepository
    __orderRepository: OrderRepository

    def __init__(self, cartRepository: CartRepository, productRepository: ProductRepository, orderRepository: OrderRepository) -> None:
        self.__cartRepository = cartRepository
        self.__productRepository = productRepository
        self.__orderRepository = orderRepository

    def createOrder(self, httpRequest: dict):

        cartId = httpRequest.get("params")
        filter = {
            "_id": ObjectId(cartId)
        }

        cart = self.__cartRepository.findOne(filter=filter)

        if not cart.getId():
            return {"body": {"message": "cart not found"}, "statusCode": 404}
        print("cart", cart.getProducts())

        amount = 0
        for productId in cart.getProducts():
            print("productId", productId)
            product = self.__productRepository.findOne(
                filter={"_id": ObjectId(productId)})
            amount += product.getPrice()

        order = {
            "user_id": cart.getUserId(),
            "products": cart.getProducts(),
            "amount": amount
        }
        orderId = self.__orderRepository.insert(order)

        return {"body": {"order_id": orderId}, "statusCode": 201}
