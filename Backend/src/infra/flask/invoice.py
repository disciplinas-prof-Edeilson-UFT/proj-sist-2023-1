from flask import Blueprint, request
from .flaskAdapter import flaskAdapter
from src.infra.mongo.repositories.orderRepository import OrderRepository
from src.infra.mongo.repositories.invoiceRepository import InvoiceRepository
from src.infra.mongo.repositories.billetRepository import BilletRepository
from src.infra.mongo.repositories.pixRepository import PixRepository
from src.services.invoiceService import InvoiceService

invoiceRoutes = Blueprint(
    name="invoicesRoutes", import_name=__name__)

orderRepository = OrderRepository()
invoiceRepository = InvoiceRepository()
billetRepository = BilletRepository()
pixRepository = PixRepository()
invoiceService = InvoiceService(billetRepository=billetRepository, invoiceRepository=invoiceRepository,
                                orderRepository=orderRepository, pixRepository=pixRepository)


@invoiceRoutes.route("/invoices", methods=['POST'])
def createInvoice():
    return flaskAdapter(service=invoiceService.createInvoice)(request=request)


@invoiceRoutes.route("/invoices/<id>", methods=['GET'])
def updateInvoice(id):
    return flaskAdapter(service=invoiceService.updateInvoice)(request=request, params=id)
