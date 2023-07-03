from src.services.userService import UserService
from src.services.productService import ProductService
from ..mock.productRepositoryMock import ProductRepositoryMock
from ..mock.userRepositoryMock import UserRepositoryMock
from ..mock.cardRepositoryMock import CardRepositoryMock
from ..mock.cartRepositoryMock import CartRepositoryMock
from ..mock.categoryRepositoryMock import CategoryRepositoryMock
from ..mock.invoiceRepositoryMock import InvoiceRepositoryMock
from ..mock.certificateRepositoryMock import CertificateRepositoryMockk
from ..mock.httpRequestMock import httpRequestMock, httpRequestMock_getInvoices
from ..mock import httpRequestUserServiceMock, httpRequestProductMock

productRepositoryMock = ProductRepositoryMock()
userRepositoryMock = UserRepositoryMock()
cardRepositoryMock = CardRepositoryMock()
cartRepositoryMock = CartRepositoryMock()
categoryRepositoryMock = CategoryRepositoryMock()
invoiceRepositoryMock = InvoiceRepositoryMock()
certificateRepositoryMockk = CertificateRepositoryMockk()
userService = UserService(userRepository=userRepositoryMock, productRepository=productRepositoryMock, cardRepository=cardRepositoryMock, cartRepository=cartRepositoryMock,
                          categoryRepository=categoryRepositoryMock, invoiceRepository=invoiceRepositoryMock, certificateRepository=certificateRepositoryMockk)
productService = ProductService(productRepository=productRepositoryMock)


def test_add_product():
    response = UserService.addProduct(userService, httpRequest=httpRequestMock)
    body: dict = response.get("body")
    statusCode: int = response.get("statusCode")
    assert body.get("message") == "product added successfully"
    assert statusCode == 201


def test_add_card():
    response = UserService.addCard(userService, httpRequest=httpRequestMock)
    body: dict = response.get("body")
    statusCode: int = response.get("statusCode")
    assert body.get("message") == "card added successfully"
    assert statusCode == 201


def test_updateUse_se_user_existe():
    response = UserService.updateUser(
        userService, httpRequest=httpRequestUserServiceMock.httpRequestMockUpdateUser)
    body: dict = response.get("body")
    statusCode: int = response.get("statusCode")
    assert body.get("message") == "updated with success"
    assert statusCode == 200


def test_updateUser_se_user_não_existe():
    response = UserService.updateUser(
        userService, httpRequest=httpRequestUserServiceMock.httpRequestMockFailuser)
    body: dict = response.get("body")
    statusCode: int = response.get("statusCode")
    assert body.get("message") == "not found"
    assert statusCode == 404


def test_becomeSeller_se_user_existe():
    response = UserService.becomeSeller(
        userService, httpRequest=httpRequestUserServiceMock.httpRequestMockbecomeSeller)
    body: dict = response.get("body")
    statusCode: int = response.get("statusCode")
    assert body.get("message") == "updated with success"
    assert statusCode == 200


def test_becomeSeller_se_user_não_existe():
    response = UserService.becomeSeller(
        userService, httpRequest=httpRequestUserServiceMock.httpRequestMockFailuser)
    body: dict = response.get("body")
    statusCode: int = response.get("statusCode")
    assert body.get("message") == "not found"
    assert statusCode == 404


def test_addProductCart():
    response = UserService.addCart(
        userService, httpRequest=httpRequestUserServiceMock.httpRequestMockaddCart)
    body: dict = response.get("body")
    statusCode: int = response.get("statusCode")
    assert body.get("message") == "added successfully"
    assert statusCode == 200


def test_editProduct():
    response = ProductService.updateProduct(productService,
                                            httpRequest=httpRequestProductMock.httpRequestMockeditProduct)
    body: dict = response.get("body")
    statusCode: int = response.get("statusCode")
    assert body.get("message") == "updated with success"
    assert statusCode == 200


def test_getCertificates():
    response = UserService.getCertificates(
        userService, httpRequest=httpRequestUserServiceMock.httpRequestMockgetCertificates)
    body: dict = response.get("body")
    statusCode: int = response.get("statusCode")
    assert body == [{'id': '1',
                     'user_id': '1',
                     'invoice_id': '1',
                     'order_id': '1',
                     'certificate_url': 'www.url.com',
                     },
                    {
        'id': '2',
        'user_id': '2',
        'invoice_id': '2',
        'order_id': '2',
        'certificate_url': 'www.url2.com', }
    ]
    assert statusCode == 200
# def test_getInvoices():
#     response = UserService.getInvoices(userService, httpRequest=httpRequestMock_getInvoices)
#     body: dict = response.get("body")
#     statusCode: int = response.get("statusCode")
#     assert body.get("message") == "updated with success"
#     assert statusCode == 200
