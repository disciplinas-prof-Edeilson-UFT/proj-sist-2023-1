from ..connection import getDatabase
from src.models.certificate import Certificate
from src.repositories.certificateRepository import CertificateRepository
from typing import List


class CertificateRepository(CertificateRepository):
    __database = getDatabase()
    __collection = __database.certificates

    def findOne(self, filter: dict) -> Certificate:
        CertificatesFound: dict = self.__collection.find_one(filter=filter)
        certificate = Certificate()
        if CertificatesFound:
            certificate.setId(id=str(CertificatesFound.get('_id')))
            certificate.setUserId(user_id=str(
                CertificatesFound.get('user_id')))
            certificate.setInvoiceId(
                invoice_id=CertificatesFound.get('invoice_id'))
            certificate.setOrderId(order_id=CertificatesFound.get('order_id'))
            certificate.setCertificateUrl(
                certificate_url=CertificatesFound.get('certificate_url'))
            certificate.setProductId(
                product_id=str(CertificatesFound.get('product_id')))

        return certificate

    def insert(self, data: dict):
        return self.__collection.insert_one(data)

    def findOneAndUpdate(self, filter: dict, data: dict):
        return self.__collection.find_one_and_update(filter, {'$set': data})

    def findMany(self, filter: dict) -> List[Certificate]:
        CertificatesFound: dict = self.__collection.find(filter=filter)
        certificates = []
        for item in CertificatesFound:
            certificate = Certificate()
            certificate.setId(id=str(item.get('_id')))
            certificate.setUserId(user_id=str(item.get('user_id')))
            certificate.setInvoiceId(invoice_id=str(item.get('invoice_id')))
            certificate.setOrderId(order_id=str(item.get('order_id')))
            certificate.setCertificateUrl(
                certificate_url=item.get('certificate_url'))
            certificate.setProductId(
                product_id=str(item.get('product_id')))
            certificates.append(certificate)
        return certificates
