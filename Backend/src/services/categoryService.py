from src.repositories.categoryRepository import CategoryRepository
from src.utils.convertToCategories import convertToCategories


class CategoryService:

    __categoryRepository: CategoryRepository

    def __init__(self, categoryRepository: CategoryRepository):
        self.__categoryRepository = categoryRepository

    def addCategory(self, httpRequest: dict):
        category = convertToCategories(httpRequest.get("body"))

        if not category.getName():
            return {"body": {"message": "bad request"}, "statusCode": 404}

        data = {"name": category.getName()}
        self.__categoryRepository.insert(data)

        return {"body": {"message": "category created successfuly"}, "statusCode": 200}

    def searchCategory(self,  httpRequest: dict):
        result = self.__categoryRepository.findMany()

        categories = []
        for category in result:
            categories.append(
                {
                    "id": str(category.get("_id")),
                    "name": category.get("name"),
                }
            )

        return {"body": categories, "statusCode": 200}
