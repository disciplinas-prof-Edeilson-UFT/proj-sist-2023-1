from flask import Blueprint, request
from .flaskAdapter import flaskAdapter
from src.services.userService import UserService
from src.infra.mongo.repositories.userRepository import UserRepository
from src.infra.mongo.repositories.cardRepository import CardRepository
from src.infra.mongo.repositories.cartRepository import CartRepository
from src.infra.mongo.repositories.productRepository import ProductRepository
from src.infra.mongo.repositories.categoryRepository import CategoryRepository
from src.infra.mongo.repositories.invoiceRepository import InvoiceRepository
from src.infra.mongo.repositories.certificateRepository import CertificateRepository


userRoutes = Blueprint(
    name="userRoutes", import_name=__name__)
userRepository = UserRepository()
cardRepository = CardRepository()
cartRepository = CartRepository()
productRepository = ProductRepository()
categoryRepository = CategoryRepository()
invoiceRepository = InvoiceRepository()
certificateRepository = CertificateRepository()

userService = UserService(userRepository=userRepository,
                          cardRepository=cardRepository,
                          cartRepository=cartRepository,
                          productRepository=productRepository,
                          categoryRepository=categoryRepository,
                          invoiceRepository=invoiceRepository,
                          certificateRepository=certificateRepository)


@ userRoutes.route("/users/<id>", methods=['PATCH'])
def updateUser(id):
    return flaskAdapter(service=userService.updateUser)(request=request, params=id)


@ userRoutes.route("/users/<id>/seller", methods=['POST'])
def becomeSeller(id):
    return flaskAdapter(service=userService.becomeSeller)(request=request, params=id)


@ userRoutes.route("/users/<id>/cards", methods=["POST"])
def addCard(id):
    return flaskAdapter(service=userService.addCard)(request=request, params=id)


@ userRoutes.route("/users/<id>/cards", methods=["GET"])
def getCard(id):
    return flaskAdapter(service=userService.getCard)(request=request, params=id)


@userRoutes.route("/users/<id>/cart", methods=['PATCH'])
def addCart(id):
    return flaskAdapter(service=userService.addCart)(request=request, params=id)


@userRoutes.route("/users/<id>/cart", methods=['GET'])
def getCart(id):
    return flaskAdapter(service=userService.getCart)(request=request, params=id)


@userRoutes.route("/users/<id>/products", methods=["POST"])
def addProduct(id):
    return flaskAdapter(service=userService.addProduct)(request=request, params=id)


@userRoutes.route("/users/<id>/invoices", methods=["GET"])
def getInvoices(id):
    return flaskAdapter(service=userService.getInvoices)(request=request, params=id)

@userRoutes.route("/users/<id>/certificates", methods=["GET"])
def getCertificates(id):
    return flaskAdapter(service=userService.getCertificates)(request=request, params=id)