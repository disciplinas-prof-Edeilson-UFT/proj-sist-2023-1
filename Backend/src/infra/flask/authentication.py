from flask import Blueprint, request
from .flaskAdapter import flaskAdapter
from src.services.authenticationService import AuthenticationService
from src.services.emailService import EmailService
from src.infra.mongo.repositories.userRepository import UserRepository
from src.infra.mongo.repositories.productRepository import ProductRepository

authenticationRoutes = Blueprint(
    name="authenticationRoutes", import_name=__name__)
userRepository = UserRepository()
productRepository = ProductRepository()
emailService = EmailService()
authenticationService = AuthenticationService(
    userRepository=userRepository, productRepository=productRepository, emailService=emailService)


@authenticationRoutes.route("/authentication/signup", methods=["POST"])
def signUp():
    return flaskAdapter(service=authenticationService.signUp)(request=request)


@authenticationRoutes.route("/authentication/signin", methods=["POST"])
def signIn():
    return flaskAdapter(service=authenticationService.signIn)(request=request)


@authenticationRoutes.route("/authentication/email", methods=["GET"])
def confirmAuthentication():
    return flaskAdapter(service=authenticationService.confirmEmailAuthentication)(request=request)


@authenticationRoutes.route("/authentication/email", methods=["POST"])
def emailAuthentication():
    return flaskAdapter(service=authenticationService.emailAuthentication)(request=request)


@authenticationRoutes.route("/authentication/email/recovery", methods=["POST"])
def sendEmailToRecoveryPassword():
    return flaskAdapter(service=authenticationService.sendEmailToRecoveryPassword)(request=request)


@authenticationRoutes.route("/authentication/recovery", methods=["POST"])
def recoveryPassword():
    return flaskAdapter(service=authenticationService.recoveryPassword)(request=request)
