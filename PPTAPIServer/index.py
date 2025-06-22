from flask import Flask
from flask_cors import CORS
app = Flask(__name__)
CORS(app, resources={"/*":{"origins": "*"}})
# http://localhost:3000 se debe cambiar luego * por la ruta 3000, apertura * para testear por curl
app.secret_key = 'IsAdamAligheri'

from routes.danRouters import *
from services.danSocketServices import *

if __name__ == "__main__":
   socketio.run(app, host='127.0.0.1', port=5000, debug=True)



    



