from src.models.user import User
from src.repositories.userRepository import UserRepository


class UserRepositoryMock(UserRepository):
    def findOne(self, filter: dict) -> User:
        return User(id="123", first_name="John", last_name="Doe", email="john@example.com", password="MTIzNDU2Nzk4", isVerified=True, is_seller=True)

    def insert(self, data: dict):
        return {	
            "owner_name": "Edinho",
	        "card_number": "123456789",
	        "expiration_date": "05/25"
         }

    def findOneAndUpdate(self, filter: dict, data: dict):
        return
