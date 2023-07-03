from src.services.certificateService import CertificateService
from ..mock.orderRepositoryMock import OrderRepositoryMock
from ..mock.userRepositoryMock import UserRepositoryMock
from ..mock.invoiceRepositoryMock import InvoiceRepositoryMock
from ..mock.certificateRepositoryMock import CertificateRepositoryMock
from ..mock import httpRequestCertificateServiceMock

certificateRepositoryMock = CertificateRepositoryMock()
orderRepositoryMock = OrderRepositoryMock()
invoiceRepositoryMock = InvoiceRepositoryMock()
userRepositoryMock = UserRepositoryMock()
certificateService = CertificateService(certificateRepository=certificateRepositoryMock,userRepository=userRepositoryMock,invoiceRepository=invoiceRepositoryMock,
    orderRepository=orderRepositoryMock)


def test_gen_certificate():
    response = certificateService.genCertificate(httpRequest=httpRequestCertificateServiceMock.httpRequestMockgenCertificate)
    body: dict = response.get("body")
    statusCode: int = response.get("statusCode")
    assert body.get("message") == "certificate created successfuly"
    assert statusCode == 200
