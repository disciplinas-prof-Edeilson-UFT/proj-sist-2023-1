from src.models.product import Product


def convertToProduct(body: dict):
    product = Product(name=body.get("name"),
                      price=body.get("price"), description=body.get("description"), photo=body.get("photo"), categories=body.get("categories"), type=body.get("type"), license_url=body.get("license_url"))
    return product
