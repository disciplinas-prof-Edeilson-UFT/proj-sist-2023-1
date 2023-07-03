from src.services.authenticationService import AuthenticationService
from src.services.emailService import EmailService
from ..mock.userRepositoryMock import UserRepositoryMock
from ..mock.productRepositoryMock import ProductRepositoryMock
from ..mock.httpRequestMock import httpRequestMock, httpRequestMock_recoveryPassword,\
    httpRequestMock_confirmEmailAuthentication
from dotenv import load_dotenv
load_dotenv()

userRepositoryMock = UserRepositoryMock()
emailService = EmailService()
productRepositoryMock = ProductRepositoryMock()
authenticationService = AuthenticationService(
    userRepository=userRepositoryMock, emailService=emailService, productRepository=productRepositoryMock)


def test_signup():
    response = authenticationService.signUp(httpRequest=httpRequestMock)
    body: dict = response.get("body")
    statusCode: int = response.get("statusCode")
    assert body.get("message") == "user created successfully"
    assert statusCode == 201


def test_signin():
    response = authenticationService.signIn(httpRequest=httpRequestMock)
    body: dict = response.get("body")
    statusCode = response.get("statusCode")
    assert body.get("email") == httpRequestMock.get("body").get("email")
    assert statusCode == 200


def test_email_authentication():
    response = authenticationService.emailAuthentication(
        httpRequest=httpRequestMock)
    body: dict = response.get("body")
    statusCode = response.get("statusCode")
    assert body.get("message") == "received"
    assert statusCode == 200


def test_send_email_to_recovery_password():
    response = authenticationService.emailAuthentication(
        httpRequest=httpRequestMock)
    body: dict = response.get("body")
    statusCode = response.get("statusCode")
    assert body.get("message") == "received"
    assert statusCode == 200


def test_recovery_password():
    response = authenticationService.recoveryPassword(httpRequest=httpRequestMock_recoveryPassword)
    body: dict = response.get("body")
    statusCode: int = response.get("statusCode")
    assert body.get("message") == "updated with success"
    assert statusCode == 200


def test_confirmEmailAuthentication():
    response = authenticationService.confirmEmailAuthentication(httpRequest=httpRequestMock_confirmEmailAuthentication)
    body: dict = response.get("body")
    statusCode: int = response.get("statusCode")
    assert body.get("message") == "email successfully verified"
    assert statusCode == 200


