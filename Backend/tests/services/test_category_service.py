from src.services.categoryService import CategoryService
from ..mock.categoryRepositoryMock import CategoryRepositoryMock

from ..mock import httpRequestCategoryServiceMock


categoryRepositoryMock = CategoryRepositoryMock()
categoryService = CategoryService(categoryRepository=categoryRepositoryMock)

def test_addCategory():
    response = CategoryService.addCategory(categoryService, httpRequest=httpRequestCategoryServiceMock.httpRequestMockaddCategory)
    body: dict = response.get("body")
    statusCode: int = response.get("statusCode")
    assert body.get("message") == "category created successfuly"
    assert statusCode == 200

def test_addCategory_se_bad_request():
    response = CategoryService.addCategory(categoryService, httpRequest=httpRequestCategoryServiceMock.httpRequestMockaddCategoryFail)
    body: dict = response.get("body")
    statusCode: int = response.get("statusCode")
    assert body.get("message") == "bad request"
    assert statusCode == 404

def test_searchCategory():
    response = CategoryService.searchCategory(categoryService, httpRequest=httpRequestCategoryServiceMock.httpRequestMockaddCategory)
    body: dict = response.get("body")
    statusCode: int = response.get("statusCode")
    assert body == [{'id':'123','name':'livro'},{'id':'321','name':'romance'}]
    assert statusCode == 200

