class Pix:

    __id: str
    __order_id: str
    __user_id: str
    __amount: float
    __br_code: str

    def __init__(self, id="", order_id="", user_id="", amount=0.0, br_code=""):
        self.__id = id
        self.__order_id = order_id
        self.__user_id = user_id
        self.__amount = amount
        self.__br_code = br_code

    def setId(self, id):
        self.__id = id

    def getId(self):
        return self.__id

    def setOrderId(self, order_id):
        self.__order_id = order_id

    def getOrderId(self):
        return self.__order_id

    def setUserId(self, user_id):
        self.__user_id = user_id

    def getUserId(self):
        return self.__user_id

    def setAmount(self, amount):
        self.__amount = amount

    def getAmount(self):
        return self.__amount

    def setBrCode(self, br_code):
        self.__br_code = br_code

    def getBrCode(self):
        return self.__br_code
