from src.infra.flask.index import app
from dotenv import load_dotenv

load_dotenv()

app.run(host="0.0.0.0")
