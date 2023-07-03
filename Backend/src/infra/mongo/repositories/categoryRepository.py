from ..connection import getDatabase
from src.models.category import Category
from src.repositories.categoryRepository import CategoryRepository


class CategoryRepository(CategoryRepository):
    __database = getDatabase()
    __collection = __database.categories

    def findMany(self):
        return self.__collection.find()

    def findOne(self, filter: dict) -> Category:
        return self.__collection.find_one(filter=filter)

    def insert(self, data: dict):
        self.__collection.insert_one(data)

    def findOneAndUpdate(self, filter: dict, data: dict):
        return self.__collection.find_one_and_update(filter, {'$set': data})
