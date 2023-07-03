from src.services.productService import ProductService
from ..mock.productRepositoryMock import ProductRepositoryMock
from ..mock.httpRequestMock import httpRequestMock

productRepositoryMock = ProductRepositoryMock()
productService = ProductService(productRepository=productRepositoryMock)

def test_search_all():
    
    response = productService.searchProducts(httpRequest=httpRequestMock)
    body: dict = response.get("body")[0]
    statusCode: int = response.get("statusCode")
    assert body.get("name") == "livro"
    assert statusCode == 200
    
