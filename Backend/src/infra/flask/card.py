from flask import Blueprint, request
from .flaskAdapter import flaskAdapter
from src.services.cardService import CardService
from src.infra.mongo.repositories.cardRepository import CardRepository

cardRoutes = Blueprint(
    name="cardRoutes", import_name=__name__
)
cardRepository = CardRepository()
cardService = CardService(cardRepository=cardRepository)

@cardRoutes.route("/cards/<id>", methods=['PATCH'])
def updateCard(id):
    return flaskAdapter(service=cardService.updateCard)(request=request, params=id)

@cardRoutes.route('/cards/<id>', methods=['DELETE'])
def deleteCard(id):
    return flaskAdapter(service=cardService.deleteCard)(request=request, params=id)