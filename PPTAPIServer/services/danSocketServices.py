from flask_socketio import SocketIO, emit, join_room

# Importa app desde index.py (asegúrate que no haya importaciones circulares)
from index import app

# Configuración del socketio con CORS
socketio = SocketIO(app, cors_allowed_origins='*')


@socketio.on('connect')
def on_connect():
    print('Cliente conectado')


@socketio.on('disconnect')
def on_disconnect():
    print('Cliente desconectado')


@socketio.on('join_room')
def on_join(data):
    room = str(data)
    join_room(room)
    print(f'Usuario se unió a sala {room}')


@socketio.on('send_message')
def handle_send_message(data):
    sender = str(data.get('sender'))
    receiver = str(data.get('receiver'))
    text = data.get('text')
    timestamp = data.get('timestamp')

    # Validar campos mínimos (opcional pero recomendable)
    if not all([sender, receiver, text, timestamp]):
        emit('error', {'msg': 'Datos incompletos en send_message'})
        return

    message = {
        "sender": sender,
        "text": text,
        "timestamp": timestamp,
    }

    # Emitir solo al usuario receptor (room)
    emit('receive_message', message, room=receiver)
    # Opcional: emitir al remitente para confirmar recepción
    emit('receive_message', message, room=sender)