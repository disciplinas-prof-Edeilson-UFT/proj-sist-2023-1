from bson.objectid import ObjectId
from src.repositories.orderRepository import OrderRepository
from src.repositories.invoiceRepository import InvoiceRepository
from src.repositories.billetRepository import BilletRepository
from src.repositories.pixRepository import PixRepository
from src.utils.convertToInvoice import convertToInvoice
from datetime import datetime


class InvoiceService:

    __orderRepository: OrderRepository
    __invoicesRepository: InvoiceRepository
    __billetRepository: BilletRepository
    __pixRepository: PixRepository

    def __init__(self, orderRepository: OrderRepository, invoiceRepository: InvoiceRepository, billetRepository: BilletRepository, pixRepository: PixRepository) -> None:
        self.__orderRepository = orderRepository
        self.__invoicesRepository = invoiceRepository
        self.__billetRepository = billetRepository
        self.__pixRepository = pixRepository

    def createInvoice(self, httpRequest: dict):
        invoice = convertToInvoice(httpRequest.get("body"))

        order = self.__orderRepository.findOne(
            {"_id": ObjectId(invoice.getOrderId())})

        if not order.getId():
            return {"body": {"message": "order not found"}, "statusCode": 404}

        now = datetime.now().replace(microsecond=0).isoformat()

        data = {
            "user_id": ObjectId(order.getUserId()),
            "order_id": ObjectId(order.getId()),
            "type": invoice.getType(),
            "amount": order.getAmount(),
            "status": "created",
            "created_at": now
        }

        response = {
            "user_id": order.getUserId(),
            "order_id": order.getId(),
            "type": invoice.getType(),
            "amount": order.getAmount(),
            "status": "created",
            "created_at": now
        }

        if invoice.getType() == "card":
            data["card_id"] = ObjectId(invoice.getCardId())
            response["card"] = invoice.getCardId()
            insertedId = self.__invoicesRepository.insert(data=data)
            response["id"] = insertedId
            return {"body": response, "statusCode": 201}

        if invoice.getType() == "billet":
            billet = {
                "user_id": ObjectId(order.getUserId()),
                "order_id": ObjectId(order.getId()),
                "amount": order.getAmount(),
                "br_code": ""
            }
            insertedId = self.__billetRepository.insert(data=billet)

            billetCreated = self.__billetRepository.findOne(
                {"_id": ObjectId(insertedId)})

            data["type"] = "billet"
            data["billet"] = ObjectId(insertedId)
            insertedId = self.__invoicesRepository.insert(data=data)

            response["id"] = insertedId
            response["billet"] = {
                "id": billetCreated.getId(),
                "br_code": billetCreated.getBrCode(),
            }

            return {"body": response, "statusCode": 201}

        if invoice.getType() == "pix":
            pix = {
                "user_id": ObjectId(order.getUserId()),
                "order_id": ObjectId(order.getId()),
                "amount": order.getAmount(),
                "br_code": ""
            }

            insertedId = self.__pixRepository.insert(data=pix)

            pixCreated = self.__pixRepository.findOne(
                {"_id": ObjectId(insertedId)})

            data["type"] = "pix"
            data["pix"] = ObjectId(insertedId)
            insertedId = self.__invoicesRepository.insert(data=data)

            response["id"] = insertedId
            response["pix"] = {
                "id": pixCreated.getId(),
                "br_code": pixCreated.getBrCode()
            }

            return {"body": response, "statusCode": 201}

    def updateInvoice(self, httpRequest: dict):
        invoiceId = httpRequest['params']

        invoice = self.__invoicesRepository.findOne(
            {"_id": ObjectId(invoiceId)})

        if not invoice.getId():
            return {"body": {"message": "invoice not found"}, "statusCode": 404}

        data = {"status": "paid"}

        self.__invoicesRepository.findOneAndUpdate(
            {"_id": ObjectId(invoiceId)}, data)

        return {"body": {"message": "updated with success"}, "statusCode": 200}
