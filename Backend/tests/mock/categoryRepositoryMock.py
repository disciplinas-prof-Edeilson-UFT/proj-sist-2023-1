from src.models.category import Category
from src.repositories.categoryRepository import CategoryRepository
from typing import List


class CategoryRepositoryMock(CategoryRepository):
    def findOne(self, filter: dict) -> Category:
        return 

    def insert(self, data: dict):
        return

    def findOneAndUpdate(self, filter: dict, data: dict):
        return
    
    def findMany(self) -> List[Category]:
        return [{'_id':123,'name':'livro'},{'_id':321,'name':'romance'}]
    
    def deleteOne(self, filter: dict):
        return
