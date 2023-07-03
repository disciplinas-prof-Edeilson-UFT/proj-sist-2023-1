from src.repositories.productRepository import ProductRepository
from src.utils.convertToProduct import convertToProduct
from bson.objectid import ObjectId


class ProductService:

    __productRepository = ProductRepository

    def __init__(self, productRepository: ProductRepository) -> None:
        self.__productRepository = productRepository

    def searchProducts(self, httpRequest: dict):

        queryParams: dict = httpRequest.get("query")
        requiredName = queryParams.get('search')
        filter = {'$or': [{'name': {'$regex': requiredName}},
                          {'description': {'$regex': requiredName}}]}
        result = self.__productRepository.findMany(filter)

        products = []
        for product in result:
            products.append({
                "id": product.getId(),
                "name": product.getName(),
                "price": product.getPrice(),
                "description": product.getDescription(),
                "license_url": product.getLicenseUrl(),
                "photo": product.getPhoto(),
                "categories": product.getCategories(),
                "type": product.getType()
            })

        return {"body": products, "statusCode": 200}

    def updateProduct(self, httpRequest: dict):
        product = convertToProduct(httpRequest.get("body"))
        productId = httpRequest['params']

        if not self.__productRepository.findOne({"_id": ObjectId(productId)}).getId():
            return {"body": {"message": "not found"}, "statusCode": 404}

        data = {}

        if product.getName():
            data["name"] = product.getName()
        if product.getPrice():
            data["price"] = product.getPrice()
        if product.getDescription():
            data["description"] = product.getDescription()
        if product.getPhoto():
            data["photo"] = product.getPhoto()
        if product.getLicenseUrl():
            data["license_url"] = product.getLicenseUrl()

        self.__productRepository.findOneAndUpdate(
            {"_id": ObjectId(productId)}, data)

        return {"body": {"message": "updated with success"}, "statusCode": 200}

    def getProduct(self, httpRequest: dict):
        productId = httpRequest['params']
        product = self.__productRepository.findOne(
            {"_id": ObjectId(productId)})
        if not product.getId():
            return {"body": {"message": "product not found"}, "statusCode": 404}

        return {
            "body": {
                "id": str(product.getId()),
                "name": product.getName(),
                "price": product.getPrice(),
                "description": product.getDescription(),
                "license_url": product.getLicenseUrl(),
                "photo": product.getPhoto(),
                "categories": product.getCategories(),
                "type": product.getType()
            },
            "statusCode": 200
        }
