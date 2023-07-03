from src.services.orderService import OrderService
from ..mock.cartRepositoryMock import CartRepositoryMock
from ..mock.productRepositoryMock import ProductRepositoryMock
from ..mock.orderRepositoryMock import OrderRepositoryMock
from ..mock.httpRequestMock import httpRequestMock

cartRepositoryMock = CartRepositoryMock()
orderRepositoryMock = OrderRepositoryMock()
productRepositoryMock = ProductRepositoryMock()
orderService = OrderService(cartRepository=cartRepositoryMock,
                            orderRepository=orderRepositoryMock, productRepository=productRepositoryMock)

def test_create_order():
	response = orderService.createOrder(httpRequest=httpRequestMock)
	body: dict = response.get("body")
	statusCode: int = response.get("statusCode")
	assert body.get("order_id") == "123"
	assert statusCode == 201