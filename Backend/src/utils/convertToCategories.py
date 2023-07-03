from src.models.category import Category


def convertToCategories(body: dict):
    categories = Category(name=body.get("name"))
    return categories
