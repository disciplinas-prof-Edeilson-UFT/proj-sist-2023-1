class Product:

    __id: str
    __user_id: str
    __name: str
    __price: float
    __description: str
    __photo: str
    __categories: list
    __type: str
    __license_url: str

    def __init__(self, id="", user_id="", name="", price="", description="", photo="", categories="", type="", license_url="") -> None:
        self.__id = id
        self.__user_id = user_id
        self.__name = name
        self.__price = price
        self.__description = description
        self.__photo = photo
        self.__categories = categories
        self.__type = type
        self.__license_url = license_url

    def setId(self, id: str):
        self.__id = id

    def getId(self) -> str:
        return self.__id

    def setType(self, type: str):
        self.__type = type

    def getType(self) -> str:
        return self.__type

    def setUserId(self, user_id: str):
        self.__user_id = user_id

    def getUserId(self) -> str:
        return self.__user_id

    def setPhoto(self, photo: str):
        self.__photo = photo

    def getPhoto(self) -> str:
        return self.__photo

    def setName(self, name: str):
        self.__name = name

    def getName(self) -> str:
        return self.__name

    def setPrice(self, price: float):
        self.__price = price

    def getPrice(self) -> float:
        return self.__price

    def setDescription(self, description: str):
        self.__description = description

    def getDescription(self):
        return self.__description

    def setCategories(self, categories: list):
        self.__categories = categories

    def getCategories(self):
        return self.__categories

    def setLicenseUrl(self, license_url: str):
        self.__license_url = license_url

    def getLicenseUrl(self):
        return self.__license_url