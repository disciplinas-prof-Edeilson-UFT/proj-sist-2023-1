from pymongo.mongo_client import MongoClient
from pymongo.database import Database
from os import getenv
from dotenv import load_dotenv

load_dotenv()

database: Database = None


def getDatabase() -> Database:
    if database:
        return database
    DATABASE_NAME = getenv("DATABASE_NAME")
    DATABASE_URL = getenv("DATABASE_URL")
    client = MongoClient(DATABASE_URL, maxPoolSize=2)
    return client[DATABASE_NAME]
