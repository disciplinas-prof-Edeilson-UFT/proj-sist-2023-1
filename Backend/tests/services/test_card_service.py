from src.services.cardService import CardService
from ..mock.cardRepositoryMock import CardRepositoryMock
from ..mock import httpRequestCardMock

cardRepositoryMock = CardRepositoryMock()
cardService = CardService(cardRepository=cardRepositoryMock)


def test_editCard():
    response = CardService.updateCard(cardService,
                                            httpRequest=httpRequestCardMock.httpRequestMockeditCard)
    body: dict = response.get("body")
    statusCode: int = response.get("statusCode")
    assert body.get("message") == "updated with success"
    assert statusCode == 200


def test_DeleteCard():
    response = CardService.deleteCard(cardService,
                                            httpRequest=httpRequestCardMock.httpRequestMockDeleteCard)
    body: dict = response.get("body")
    statusCode: int = response.get("statusCode")
    assert body.get("message") == "deleted successfully"
    assert statusCode == 200


