from flask import Blueprint, request
from .flaskAdapter import flaskAdapter
from src.services.orderService import OrderService
from src.infra.mongo.repositories.cartRepository import CartRepository
from src.infra.mongo.repositories.productRepository import ProductRepository
from src.infra.mongo.repositories.orderRepository import OrderRepository

orderRoutes = Blueprint(
    name="ordersRoutes", import_name=__name__)
cartRepository = CartRepository()
productRepository = ProductRepository()
orderRepository = OrderRepository()
orderService = OrderService(cartRepository=cartRepository,
                            orderRepository=orderRepository, productRepository=productRepository)


@orderRoutes.route("/orders/<id>", methods=['POST'])
def createOrder(id: str):
    return flaskAdapter(service=orderService.createOrder)(request=request, params=id)
