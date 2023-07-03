from src.repositories.certificateRepository import CertificateRepository
from src.repositories.userRepository import UserRepository
from src.repositories.invoiceRepository import InvoiceRepository
from src.repositories.orderRepository import OrderRepository
from src.utils.convertToCertificate import convertToCertificate
from bson.objectid import ObjectId


class CertificateService:

    __certificateRepository: CertificateRepository
    __userRepository: UserRepository
    __invoiceRepository: InvoiceRepository
    __orderRepository: OrderRepository

    def __init__(self, certificateRepository: CertificateRepository, userRepository: UserRepository, invoiceRepository: InvoiceRepository, orderRepository: OrderRepository):
        self.__certificateRepository = certificateRepository
        self.__userRepository = userRepository
        self.__invoiceRepository = invoiceRepository
        self.__orderRepository = orderRepository

    def genCertificate(self, httpRequest: dict):
        certificate = convertToCertificate(httpRequest.get("body"))
        user = self.__userRepository.findOne(
            {"_id": ObjectId(certificate.getUserId())})
        invoice = self.__invoiceRepository.findOne(
            {"_id": ObjectId(certificate.getInvoiceId())})
        order = self.__orderRepository.findOne(
            {"_id": ObjectId(certificate.getOrderId())})

        if not user.getId() or not invoice.getId() or not order.getId():
            return {"body": {"message": "impossible to generate certificate"}, "statusCode": 404}

        data = {
            "user_id": ObjectId(certificate.getUserId()),
            "invoice_id": ObjectId(certificate.getInvoiceId()),
            "order_id": ObjectId(certificate.getOrderId()),
            "product_id": ObjectId(certificate.getProductId()),
            "certificate_url": certificate.getCertificateUrl(),
        }
        self.__certificateRepository.insert(data)

        return {"body": {"message": "certificate created successfuly"}, "statusCode": 200}
