from src.services.invoiceService import InvoiceService
from ..mock.httpRequestInvoicesMock import httpRequestMock_updateInvoice
from ..mock.orderRepositoryMock import OrderRepositoryMock
from ..mock.invoiceRepositoryMock import InvoiceRepositoryMock
from ..mock.billetRepositoryMock import BilletRepositoryMock
from ..mock.pixRepositoryMock import PixRepositoryMock
from ..mock.httpRequestMock import httpRequestMock

orderRepositoryMock = OrderRepositoryMock()
billetRepositoryMock = BilletRepositoryMock()
invoiceRepositoryMock = InvoiceRepositoryMock()
pixRepositoryMock = PixRepositoryMock()
invoiceService = InvoiceService(
    orderRepository=orderRepositoryMock, invoiceRepository=invoiceRepositoryMock, billetRepository=billetRepositoryMock,
    pixRepository=pixRepositoryMock)


def test_create_invoice():
    response = invoiceService.createInvoice(httpRequest=httpRequestMock)
    body: dict = response.get("body")
    statusCode: int = response.get("statusCode")
    assert body.get("id") == "123"
    assert statusCode == 201


def test_updateInvoice():
    response = invoiceService.updateInvoice(httpRequest=httpRequestMock_updateInvoice)
    body: dict = response.get("body")
    statusCode: int = response.get("statusCode")
    assert body.get("message") == "updated with success"
    assert statusCode == 200
