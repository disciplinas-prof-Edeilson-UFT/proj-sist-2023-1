class Cart:
    __id: str
    __user_id: str
    __products: list

    def __init__(self, id: str = "", user_id="", products=[]) -> None:
        self.__id = id
        self.__user_id = user_id
        self.__products = products

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
