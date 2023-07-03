class User:

    __id: str
    __first_name: str
    __last_name: str
    __email: str
    __password: str
    __isVerified: bool
    __social_name: str
    __user_document: str
    __document_type: str
    __is_seller: bool


    def __init__(self, id="", first_name="", last_name="", email="", password="", isVerified=False, social_name="", user_document="",document_type="", is_seller=False) -> None:
        self.__id = id
        self.__first_name = first_name
        self.__last_name = last_name
        self.__email = email
        self.__password = password
        self.__isVerified = isVerified if isVerified else False
        self.__social_name = social_name
        self.__user_document = user_document
        self.__document_type = document_type
        self.__is_seller = is_seller if is_seller else False

    def setId(self, id: str):
        self.__id = id

    def getId(self) -> str:
        return self.__id

    def setFirstName(self, first_name: str):
        self.__first_name = first_name

    def getFirstName(self) -> str:
        return self.__first_name

    def setLastName(self, last_name: str):
        self.__last_name = last_name

    def getLastName(self) -> str:
        return self.__last_name

    def setEmail(self, email: str):
        self.__email = email

    def getEmail(self) -> str:
        return self.__email

    def setPassword(self, password: str):
        self.__password = password

    def getPassword(self) -> str:
        return self.__password

    def setIsVerified(self, isVerified: bool):
        self.__isVerified = isVerified

    def getIsVerified(self) -> bool:
        return self.__isVerified

    def setSocialName(self, social_name: str):
        self.__social_name = social_name

    def getSocialName(self) -> str:
        return self.__social_name
    
    def setUserDocument(self, user_document: str):
        self.__user_document = user_document

    def getUserDocument(self) -> str:
        return self.__user_document
    
    def setDocumentType(self, document_type: str):
        self.__document_type = document_type

    def getDocumentType(self) -> str:
        return self.__document_type

    def setIsSeller(self, is_seller: bool):
        self.__is_seller = is_seller

    def getIsSeller(self) -> bool:
        return self.__is_seller