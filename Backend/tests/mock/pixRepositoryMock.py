from src.models.pix import Pix
from src.repositories.pixRepository import PixRepository


class PixRepositoryMock(PixRepository):
    def findOne(self, filter: dict) -> Pix:
        return Pix(
            id="123",
            order_id="123",
            user_id="123",
            amount=10.0,
            br_code="12345678901234567890123456789012345678901234"
        )

    def insert(self, data: dict):
        return "123"

    def findOneAndUpdate(self, filter: dict, data: dict):
        pass
