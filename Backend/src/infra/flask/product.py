from flask import Blueprint, request
from .flaskAdapter import flaskAdapter
from src.services.productService import ProductService
from src.infra.mongo.repositories.productRepository import ProductRepository

productRoutes = Blueprint(
    name="productsRoutes", import_name=__name__)
productRepository = ProductRepository()
productService = ProductService(productRepository=productRepository)


@productRoutes.route("/products", methods=["GET"])
def searchProducts():
    return flaskAdapter(service=productService.searchProducts)(request=request)


@productRoutes.route("/products/<id>", methods=['PATCH'])
def updateProduct(id):
    return flaskAdapter(service=productService.updateProduct)(request=request, params=id)


@productRoutes.route("/products/<id>", methods=['GET'])
def getProduct(id):
    return flaskAdapter(service=productService.getProduct)(request=request, params=id)
