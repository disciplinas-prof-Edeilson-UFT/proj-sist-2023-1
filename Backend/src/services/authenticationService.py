import os
import base64
from src.services.emailService import EmailService
from src.repositories.userRepository import UserRepository
from src.repositories.productRepository import ProductRepository
from src.utils.convertToUser import convertToUser
from bson.objectid import ObjectId


class AuthenticationService:

    __userRepository: UserRepository
    __productRepository: ProductRepository
    __emailService: EmailService

    def __init__(self, userRepository: UserRepository, productRepository: ProductRepository, emailService: EmailService) -> None:
        self.__userRepository = userRepository
        self.__productRepository = productRepository
        self.__emailService = emailService

    def signUp(self, httpRequest: dict):
        user = convertToUser(httpRequest.get("body"))
        userEmail = user.getEmail()
        userPassword = user.getPassword()

        if self.__userRepository.findOne({"email": userEmail}).getEmail():
            return {"body": {"message": "email already used"}, "statusCode": 400}

        encodePassword = userPassword.encode('utf-8')
        password = base64.b64encode(encodePassword).decode('utf-8')

        data = {"first_name": user.getFirstName(), "last_name": user.getLastName(), "email": user.getEmail(), "password": password, "is_verified": user.getIsVerified(
        ), "is_seller": user.getIsSeller(), "user_document": user.getUserDocument(), "document_type": user.getDocumentType(),  "social_name": user.getSocialName()}
        self.__userRepository.insert(data)
        return {"body": {"message": "user created successfully"}, "statusCode": 201}

    def signIn(self, httpRequest: dict):
        user = convertToUser(httpRequest.get("body"))
        userEmail = user.getEmail()
        userPassword = user.getPassword()
        user = self.__userRepository.findOne({"email": userEmail})

        if not user.getEmail():
            return {"body": {"message": "invalid login credentials"}, "statusCode": 404}

        passwordDecode = base64.b64decode(user.getPassword())
        decodePassword = passwordDecode.decode('utf-8')

        userId = user.getId()

        if not decodePassword == userPassword:
            return {"body": {"message": "invalid login credentials"}, "statusCode": 401}

        filter = {"user_id": ObjectId(userId)}
        result = self.__productRepository.findMany(filter)
        products = []
        for product in result:
            products.append({
                "id": product.getId(),
                "name": product.getName(),
                "price": product.getPrice(),
                "description": product.getDescription(),
                "categories": product.getCategories(),
                "license_url": product.getLicenseUrl()
            })

        return {
            "body": {
                "id": user.getId(),
                "first_name": user.getFirstName(),
                "last_name": user.getLastName(),
                "email": user.getEmail(),
                "is_verified": user.getIsVerified(),
                "is_seller": user.getIsSeller(),
                "social_name": user.getSocialName(),
                "user_document": user.getUserDocument(),
                "document_type": user.getDocumentType(),
                "products": products
            },
            "statusCode": 200
        }

    def emailAuthentication(self, httpRequest: dict):
        user = convertToUser(httpRequest.get("body"))
        userEmail: str = user.getEmail()
        AUTHENTICATION_EMAIL_BODY = os.getenv("AUTHENTICATION_EMAIL_BODY")
        AUTHENTICATION_EMAIL_URL = os.getenv("AUTHENTICATION_EMAIL_URL")
        AUTHENTICATION_EMAIL_SUBJECT = os.getenv(
            "AUTHENTICATION_EMAIL_SUBJECT")
        body = AUTHENTICATION_EMAIL_BODY.format(
            AUTHENTICATION_EMAIL_URL, userEmail)
        self.__emailService.sendEmail(
            email=userEmail, subject=AUTHENTICATION_EMAIL_SUBJECT, body=body)

        return {"body": {"message": "received"}, "statusCode": 200}

    def confirmEmailAuthentication(self, httpRequest: dict):
        queryParams: dict = httpRequest.get("query")
        userEmail = queryParams.get("email")
        filter = {"email": userEmail}
        toUpdate = {"is_verified": True}
        result = self.__userRepository.findOneAndUpdate(filter, toUpdate)
        response = {"message": "email successfully verified"}
        if result:
            return {
                "body": response,
                "statusCode": 200
            }
        response = {"message": "a error occurred"}
        return {
            "body": response,
            "statusCode": 400
        }

    def sendEmailToRecoveryPassword(self, httpRequest: dict):
        user = convertToUser(httpRequest.get("body"))
        userEmail: str = user.getEmail()
        RECOVERY_PASSWORD_EMAIL_BODY = os.getenv(
            "RECOVERY_PASSWORD_EMAIL_BODY")
        RECOVERY_PASSWORD_EMAIL_URL = os.getenv("RECOVERY_PASSWORD_EMAIL_URL")
        RECOVERY_PASSWORD_EMAIL_SUBJECT = os.getenv(
            "RECOVERY_PASSWORD_EMAIL_SUBJECT")
        body = RECOVERY_PASSWORD_EMAIL_BODY.format(
            RECOVERY_PASSWORD_EMAIL_URL, userEmail)
        self.__emailService.sendEmail(
            email=userEmail, subject=RECOVERY_PASSWORD_EMAIL_SUBJECT, body=body)

        return {"body": {"message": "received"}, "statusCode": 200}

    def recoveryPassword(self, httpRequest):
        user = convertToUser(httpRequest.get("body"))
        userEmail = user.getEmail()
        userPassword = user.getPassword()

        if not self.__userRepository.findOne({"email": userEmail}).getEmail():
            return {"body": {"message": "user not found"}, "statusCode": 404}

        encodePassword = userPassword.encode('utf-8')
        password = base64.b64encode(encodePassword).decode('utf-8')
        self.__userRepository.findOneAndUpdate(
            {"email": userEmail}, {"password": password})
        return {"body": {"message": "updated with success"}, "statusCode": 200}
