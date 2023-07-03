import base64
from src.repositories.cardRepository import CardRepository
from src.repositories.userRepository import UserRepository
from src.repositories.cartRepository import CartRepository
from src.repositories.productRepository import ProductRepository
from src.repositories.categoryRepository import CategoryRepository
from src.repositories.invoiceRepository import InvoiceRepository
from src.repositories.certificateRepository import CertificateRepository
from src.utils.convertToCard import convertToCard
from src.utils.convertToUser import convertToUser
from src.utils.convertToProduct import convertToProduct
from bson.objectid import ObjectId
from typing import Type


class UserService:

    __cartRepository: CartRepository
    __userRepository: UserRepository
    __cardRepository: CardRepository
    __productRepository: ProductRepository
    __categoryRepository: CategoryRepository
    __invoiceRepository: InvoiceRepository
    __certificateRepository: CertificateRepository

    def __init__(self, userRepository: UserRepository, cardRepository: CardRepository, cartRepository: CartRepository, productRepository: ProductRepository, categoryRepository: CategoryRepository, invoiceRepository: InvoiceRepository, certificateRepository: CertificateRepository) -> None:
        self.__userRepository = userRepository
        self.__cardRepository = cardRepository
        self.__cartRepository = cartRepository
        self.__productRepository = productRepository
        self.__categoryRepository = categoryRepository
        self.__invoiceRepository = invoiceRepository
        self.__certificateRepository = certificateRepository

    def updateUser(self, httpRequest: dict):
        user = convertToUser(httpRequest.get("body"))
        userId = httpRequest['params']

        if not self.__userRepository.findOne({"_id": ObjectId(userId)}).getId():
            return {"body": {"message": "not found"}, "statusCode": 404}

        data = {}

        if user.getFirstName():
            data["first_name"] = user.getFirstName()
        if user.getLastName():
            data["last_name"] = user.getLastName()
        if user.getEmail():
            data["email"] = user.getEmail()

        self.__userRepository.findOneAndUpdate(
            {"_id": ObjectId(userId)}, data)

        return {"body": {"message": "updated with success"}, "statusCode": 200}

    def addCard(self, httpRequest: dict):
        card = convertToCard(httpRequest.get("body"))
        userId = httpRequest['params']
        CardNumber = card.getCardNumber()

        if not self.__userRepository.findOne({"_id": ObjectId(userId)}).getId():
            return {"body": {"message": "not found"}, "statusCode": 404}

        encodeCardNumber = CardNumber.encode('utf-8')
        CardData = base64.b64encode(encodeCardNumber).decode('utf-8')

        data = {"user_id": ObjectId(userId), "owner_name":  card.getOwnerName(
        ), "card_number": CardData, "expiration_date": card.getExpirationDate()}
        self.__cardRepository.insert(data)

        return {"body": {"message": "card added successfully"}, "statusCode": 201}

    def getCard(self, httpRequest: dict):
        userId = httpRequest['params']

        if not self.__userRepository.findOne({"_id": ObjectId(userId)}).getId():
            return {"body": {"message": "not found"}, "statusCode": 404}

        filter = {"user_id": ObjectId(userId)}
        result = self.__cardRepository.findMany(filter)

        cards = []
        for card in result:
            cardNumberDecode = base64.b64decode(card.getCardNumber())
            CardData = cardNumberDecode.decode('utf-8')
            cards.append({
                "id": card.getId(),
                "owner_name": card.getOwnerName(),
                "card_number": CardData[-4:],
                "expiration_date": card.getExpirationDate()
            })
        return {"body": cards, "statusCode": 200}

    def addCart(self, httpRequest: dict):
        products = httpRequest.get('body').get("products")
        userId = httpRequest['params']

        if not self.__userRepository.findOne({"_id": ObjectId(userId)}).getId():
            return {"body": {"message": "user not found"}, "statusCode": 404}

        if not self.__cartRepository.findOne({"user_id": ObjectId(userId)}).getId():
            data = {"user_id": ObjectId(userId), "products": products}
            self.__cartRepository.insert(data)
            return {"body": {"message": "created successfully"}, "statusCode": 200}

        self.__cartRepository.findOneAndUpdate(
            filter={"user_id": ObjectId(userId)}, data={"products": products})
        return {"body": {"message": "added successfully"}, "statusCode": 200}

    def getCart(self, httpRequest: dict):
        userId = httpRequest['params']
        filter = {"user_id": ObjectId(userId)}
        cart = self.__cartRepository.findOne(filter=filter)

        if not cart.getId():
            return {"body": {"message": "cart not found"}, "statusCode": 404}

        return {"body": {"user_id": cart.getUserId(), "products": cart.getProducts(), "id": cart.getId()}, "statusCode": 200}

    def becomeSeller(self, httpRequest: dict):
        user = convertToUser(httpRequest.get("body"))
        userId = httpRequest['params']

        if not self.__userRepository.findOne({"_id": ObjectId(userId)}).getId():
            return {"body": {"message": "not found"}, "statusCode": 404}
        data = {}
        data["is_seller"] = True
        if user.getSocialName():
            data["social_name"] = user.getSocialName()
        if user.getUserDocument():
            data["user_document"] = user.getUserDocument()
        if user.getDocumentType():
            data["document_type"] = user.getDocumentType()

        self.__userRepository.findOneAndUpdate(
            {"_id": ObjectId(userId)}, data)

        return {"body": {"message": "updated with success"}, "statusCode": 200}

    def addProduct(self, httpRequest: dict):
        prod = convertToProduct(httpRequest.get("body"))
        userId = httpRequest['params']
        user = self.__userRepository.findOne({"_id": ObjectId(userId)})

        if not user.getId():
            return {"body": {"message": "user not found"}, "statusCode": 404}

        if user.getIsSeller() == False:
            return {"body": {"message": "not allowed"}, "statusCode": 403}

        categoriesId = []
        for categoryId in prod.getCategories():
            categoriesId.append(ObjectId(categoryId))

        data = {
            "user_id":  ObjectId(userId),
            "name": prod.getName(),
            "price": prod.getPrice(),
            "description": prod.getDescription(),
            "photo": prod.getPhoto(),
            "categories": categoriesId,
            "type": prod.getType(),
            "license_url": prod.getLicenseUrl()
        }

        insertedId = self.__productRepository.insert(data)

        return {"body": {"id": insertedId}, "statusCode": 201}

    def getInvoices(self, httpRequest: dict):
        userId = httpRequest['params']

        user = self.__userRepository.findOne({"_id": ObjectId(userId)})

        if not user.getId():
            return {"body": {"message": "user not found"}, "statusCode": 404}

        filter = {"user_id": ObjectId(userId)}
        invoices = self.__invoiceRepository.findMany(filter=filter)
        response = []
        for invoice in invoices:
            response.append({
                "id": invoice.getId(),
                "user_id": invoice.getUserId(),
                "order_id": invoice.getId(),
                "type": invoice.getType(),
                "amount": invoice.getAmount(),
                "card_id": invoice.getCardId(),
                "status": invoice.getStatus(),
                "created_at": invoice.getCreatedAt()
            })

        return {"body": response, "statusCode": 200}

    def getCertificates(self, httpRequest: dict):
        userId = httpRequest['params']

        user = self.__userRepository.findOne({"_id": ObjectId(userId)})

        if not user.getId():
            return {"body": {"message": "user not found"}, "statusCode": 404}

        filter = {"user_id": ObjectId(userId)}
        certificates = self.__certificateRepository.findMany(filter=filter)
        response = []

        for certificate in certificates:
            response.append({
                "id": certificate.getId(),
                "user_id": certificate.getUserId(),
                "invoice_id": certificate.getInvoiceId(),
                "order_id": certificate.getOrderId(),
                "certificate_url": certificate.getCertificateUrl(),
                "product_id": certificate.getProductId()
            })

        return {"body": response, "statusCode": 200}
