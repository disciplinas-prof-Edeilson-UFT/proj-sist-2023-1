from flask import Blueprint, request
from .flaskAdapter import flaskAdapter
from src.services.categoryService import CategoryService
from src.infra.mongo.repositories.categoryRepository import CategoryRepository

categoryRoutes = Blueprint(
    name="categoryRoutes", import_name=__name__)
categoryRepository = CategoryRepository()
categoryService = CategoryService(
    categoryRepository=categoryRepository)


@categoryRoutes.route("/categories", methods=["POST"])
def addCategory():
    return flaskAdapter(service=categoryService.addCategory)(request=request)


@categoryRoutes.route("/categories", methods=["GET"])
def searchCategory():
    return flaskAdapter(service=categoryService.searchCategory)(request=request)
