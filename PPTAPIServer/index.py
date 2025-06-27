from flask import Flask
from flask_cors import CORS
from flask_socketio import SocketIO

app = Flask(__name__)
CORS(app, resources={"/*": {"origins": "*"}})  # En producción, cambia "*" por dominio frontend
app.secret_key = 'IsAdamAligheri'
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0

# Configurar socketio con cors permitido para todos (modificar en prod)
socketio = SocketIO(app, cors_allowed_origins="*")

# Importa tus rutas HTTP
from routes.danRouters import *

# Importa tus servicios socket y registra eventos
from services.danSocketServices import *

if __name__ == "__main__":
    socketio.run(app, host='0.0.0.0', port=5000, use_reloader=False, log_output=True)



    



