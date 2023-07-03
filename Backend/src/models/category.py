class Category:

    __id: str
    __name: str

    def __init__(self, id="", name="") -> None:
        self.__id = id
        self.__name = name

    def setId(self, id: str):
        self.__id = id

    def getId(self) -> str:
        return self.__id

    def setName(self, name: str):
        self.__name = name

    def getName(self) -> str:
        return self.__name
