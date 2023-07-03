from flask import Flask
from flask_cors import CORS
from .user import userRoutes

from .authentication import authenticationRoutes
from .product import productRoutes
from .user import userRoutes
from .category import categoryRoutes
from .order import orderRoutes
from .invoice import invoiceRoutes
from .card import cardRoutes
from .certificate import certificateRoutes

app = Flask(__name__)
CORS(app=app)


@app.route("/health")
def health():
    return {"ok": True}


app.register_blueprint(blueprint=authenticationRoutes)
app.register_blueprint(blueprint=userRoutes)
app.register_blueprint(blueprint=productRoutes)
app.register_blueprint(blueprint=categoryRoutes)
app.register_blueprint(blueprint=orderRoutes)
app.register_blueprint(blueprint=invoiceRoutes)
app.register_blueprint(blueprint=cardRoutes)
app.register_blueprint(blueprint=certificateRoutes)

