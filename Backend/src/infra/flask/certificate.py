from flask import Blueprint, request
from .flaskAdapter import flaskAdapter
from src.infra.mongo.repositories.certificateRepository import CertificateRepository
from src.infra.mongo.repositories.userRepository import UserRepository
from src.infra.mongo.repositories.invoiceRepository import InvoiceRepository
from src.infra.mongo.repositories.orderRepository import OrderRepository
from src.services.certificateService import CertificateService

certificateRoutes = Blueprint(
    name="certificateRoutes", import_name=__name__)

certificateRepository = CertificateRepository()
userRepository = UserRepository()
invoiceRepository =  InvoiceRepository()
orderRepository = OrderRepository()
certificateService = CertificateService(certificateRepository=certificateRepository, userRepository=userRepository,
                                invoiceRepository=invoiceRepository, orderRepository=orderRepository)


@certificateRoutes.route("/certificates", methods=['POST'])
def createInvoice():
    return flaskAdapter(service=certificateService.genCertificate)(request=request)

