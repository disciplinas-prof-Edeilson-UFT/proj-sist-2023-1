from src.models.user import User

def convertToUser(body: dict):
    user = User(first_name=body.get("first_name"),
                last_name=body.get("last_name"), email=body.get("email"), password=body.get("password"), isVerified=body.get("isVerified"), social_name=body.get("social_name"), user_document=body.get("user_document"), document_type=body.get("document_type"), is_seller=body.get("is_seller"))
    return user
