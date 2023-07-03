from ..connection import getDatabase
from src.models.product import Product
from src.repositories.productRepository import ProductRepository
from typing import List


class ProductRepository(ProductRepository):
    __database = getDatabase()
    __collection = __database.products

    def findMany(self, filter: dict) -> List[Product]:
        productFinded = self.__collection.find(filter)
        results = []

        for prod in productFinded:
            product = Product(id=str(prod.get('_id')), name=prod.get(
                "name"), price=prod.get("price"), description=prod.get("description"), categories=prod.get("categories"), license_url=prod.get("license_url"), photo=prod.get("photo"))
            results.append(product)

        return results

    def findOne(self, filter: dict) -> Product:
        productFinded: dict = self.__collection.find_one(filter=filter)
        product = Product()
        if productFinded:
            product.setId(id=productFinded.get('_id'))
            product.setName(name=productFinded.get("name"))
            product.setPrice(price=productFinded.get("price"))
            product.setDescription(
                description=productFinded.get("description"))
            product.setCategories(categories=productFinded.get("categories"))
            product.setLicenseUrl(license_url=productFinded.get("license_url"))
            product.setPhoto(photo=productFinded.get("photo"))
            return product
        return product

    def insert(self, data: dict):
        return str(self.__collection.insert_one(data).inserted_id)

    def findOneAndUpdate(self, filter: dict, data: dict):
        return self.__collection.find_one_and_update(filter, {'$set': data})
