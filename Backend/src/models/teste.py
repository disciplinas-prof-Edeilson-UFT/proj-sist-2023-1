from pymongo import MongoClient

client = MongoClient('mongodb://localhost:27017')
db = client['teste']
users = db.users


def insert_users(post):
    users = post
    user_id = users.insert_one(users).inserted_id
