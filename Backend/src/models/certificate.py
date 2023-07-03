class Certificate:

    __id: str
    __user_id: str
    __invoice_id: str
    __order_id: str
    __certificate_url: str
    __product_id: str

    def __init__(self, id: str = "", user_id="", invoice_id="", order_id="", certificate_url="", product_id="") -> None:
        self.__id = id
        self.__user_id = user_id
        self.__invoice_id = invoice_id
        self.__order_id = order_id
        self.__certificate_url = certificate_url
        self.__product_id = product_id

    def setId(self, id: str):
        self.__id = id

    def getId(self) -> str:
        return self.__id

    def setUserId(self, user_id):
        self.__user_id = user_id

    def getUserId(self) -> str:
        return self.__user_id

    def setInvoiceId(self, invoice_id):
        self.__invoice_id = invoice_id

    def getInvoiceId(self) -> str:
        return self.__invoice_id

    def setOrderId(self, order_id):
        self.__order_id = order_id

    def getOrderId(self) -> str:
        return self.__order_id

    def setCertificateUrl(self, certificate_url):
        self.__certificate_url = certificate_url

    def getCertificateUrl(self) -> str:
        return self.__certificate_url

    def setProductId(self, product_id):
        self.__product_id = product_id

    def getProductId(self) -> str:
        return self.__product_id