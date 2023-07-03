from typing import List
from src.models.certificate import Certificate
from src.repositories.certificateRepository import CertificateRepository


class CertificateRepositoryMockk(CertificateRepository):
    def findOne(self, filter: dict) -> Certificate:
        return

    def insert(self, data: dict):
        return {
            "user_id": "123456789123456789123456",
            "invoice_id": "123456789123456789123456",
            "order_id": "123456789123456789123456",
            "certificate_url": "certificadodeurl.com"
        }

    def findOneAndUpdate(self, filter: dict, data: dict):
        return

    def findMany(self, filter: dict) -> List[Certificate]:
        return [Certificate(id='1', user_id='1', invoice_id='1', order_id='1', certificate_url='www.url.com'),
                Certificate(id='2', user_id='2', invoice_id='2', order_id='2', certificate_url='www.url2.com')]
