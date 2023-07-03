from src.models.product import Product
from src.repositories.productRepository import ProductRepository
from typing import List


class ProductRepositoryMock(ProductRepository):
        
    def findOne(self, filter: dict) -> Product:
        return Product(
            name="livro",
            id="123"
        )

    def insert(self, data: dict):
        return {
            	"description": "descrição de livro",
	            "name": "livro",
	            "price": 1.0,
	            "photo": "urldafoto.com",
	            "categories": ["esporte, vida, saúde"],
	            "type": "ebook"
        }

    def findOneAndUpdate(self, filter: dict, data: dict):
        return {
                "id": "646aa34810132814b12b7e83",
                "user_id": "644b035f21eec2c9e5983ecf",
            	"description": "alterando"

        }

    def findMany(self, filter: dict) -> List[Product]:
        resultado = [Product(
            id="712312dsa",
            user_id="sadasda123",
            name="livro",
            price="10",
            photo="urlqualquer.com",
            description="descrição qualquer",
            categories="21783618273Sasda",
            type="Doc"
        )]

        return resultado
    
