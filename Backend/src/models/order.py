class Order:
    __id: str
    __user_id: str
    __products: list
    __amount: float

    def __init__(self, id: str = "", user_id="", products=[], amount=0) -> None:
        self.__id = id
        self.__user_id = user_id
        self.__products = products
        self.__amount = amount

    def setId(self, id: str):
        self.__id = id

    def getId(self) -> str:
        return self.__id

    def setUserId(self, user_id: str):
        self.__user_id = user_id

    def getUserId(self) -> str:
        return self.__user_id

    def setProducts(self, products: list):
        self.__products = products

    def getProducts(self) -> list:
        return self.__products

    def setAmount(self, amount: float):
        self.__amount = amount

    def getAmount(self) -> float:
        return self.__amount
