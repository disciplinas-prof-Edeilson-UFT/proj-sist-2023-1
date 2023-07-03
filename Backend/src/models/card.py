class Card:
    __id: str
    __user_id: str
    __owner_name: str
    __card_number: str 
    __expiration_date: str

    def __init__(self, id="", user_id="",owner_name="", card_number="", expiration_date="") -> None:
        self.__id = id
        self.__user_id = user_id
        self.__owner_name = owner_name
        self.__card_number = card_number
        self.__expiration_date = expiration_date
    
    def setId(self, id: str):
        self.__id = id

    def getId(self) -> str:
        return self.__id
    
    def setUserId(self, user_id: str):
        self.__user_id = user_id

    def getUserId(self) -> str:
        return self.__user_id
    
    def setOwnerName(self, owner_name: str):
        self.__owner_name = owner_name

    def getOwnerName(self) -> str:
        return self.__owner_name

    def setCardNumber(self, card_number: str):
        self.__card_number = card_number

    def getCardNumber(self) -> str:
        return self.__card_number

    def setExpirationDate(self, expiration_date: str):
        self.__expiration_date = expiration_date

    def getExpirationDate(self) -> str:
        return self.__expiration_date


   
