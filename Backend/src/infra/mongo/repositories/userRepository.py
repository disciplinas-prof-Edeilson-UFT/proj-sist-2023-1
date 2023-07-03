from ..connection import getDatabase
from src.models.user import User
from src.repositories.userRepository import UserRepository


class UserRepository(UserRepository):
    __database = getDatabase()
    __collection = __database.users

    def findOne(self, filter: dict) -> User:
        userFinded: dict = self.__collection.find_one(filter=filter)
        user = User()
        if userFinded:
            user.setId(id=str(userFinded.get('_id')))
            user.setFirstName(first_name=userFinded.get("first_name"))
            user.setLastName(last_name=userFinded.get("last_name"))
            user.setEmail(email=userFinded.get("email"))
            user.setPassword(password=userFinded.get("password"))
            user.setIsVerified(isVerified=userFinded.get("is_verified"))
            user.setSocialName(social_name=userFinded.get("social_name"))
            user.setUserDocument(user_document=userFinded.get("user_document"))
            user.setIsSeller(is_seller=userFinded.get("is_seller"))
            user.setDocumentType(document_type=userFinded.get("document_type"))
            return user
        return user

    def insert(self, data: dict):
        self.__collection.insert_one(data)

    def findOneAndUpdate(self, filter: dict, data: dict):
        return self.__collection.find_one_and_update(filter, {'$set': data})
