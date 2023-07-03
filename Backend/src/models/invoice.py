class Invoice:

    __id: str
    __user_id: str
    __order_id: str
    __type: str
    __amount: float
    __card_id: str
    __beneficiary: str
    __status: str
    __created_at: str

    def __init__(self, id: str = "", user_id: str = "", order_id: str = "", type: str = "", amount: float = 0, cardId: str = "", beneficiary: str = "", status: str = "created", created_at: str = "") -> None:
        self.__id = id
        self.__user_id = user_id
        self.__order_id = order_id
        self.__type = type
        self.__amount = amount
        self.__card_id = cardId
        self.__beneficiary = beneficiary
        self.__status = status
        self.__created_at = created_at

    def setId(self, id: str):
        self.__id = id

    def getId(self) -> str:
        return self.__id

    def setUserId(self, user_id: str):
        self.__user_id = user_id

    def getUserId(self) -> str:
        return self.__user_id

    def setOrderId(self, order_id: str):
        self.__order_id = order_id

    def getOrderId(self) -> str:
        return self.__order_id

    def setType(self, type: str):
        self.__type = type

    def getType(self) -> str:
        return self.__type

    def setAmount(self, amount: float):
        self.__amount = amount

    def getAmount(self) -> float:
        return self.__amount

    def setCardId(self, id: str):
        self.__card_id = id

    def getCardId(self) -> str:
        return self.__card_id

    def setBeneficiary(self, id: str):
        self.__beneficiary = id

    def getBeneficiary(self) -> str:
        return self.__beneficiary

    def setStatus(self, status: str):
        self.__status = status

    def getStatus(self) -> str:
        return self.__status

    def setCreatedAt(self, datetime: str):
        self.__created_at = datetime

    def getCreatedAt(self) -> str:
        return self.__created_at
