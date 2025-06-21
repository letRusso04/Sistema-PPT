from flask_socketio import SocketIO, emit, join_room, leave_room, rooms

"""
Trae el "app" desde el index, le asigna las configuraciones del SOCKETIO y lo retorna por medio de importación.
"""
from index import app
"""
Configuracion estandar del SocketIO. (CORS)
"""
socketio = SocketIO(app, cors_allowed_origins='*')

"""
Escucha de todos los eventos por medio del SOCKETIO 
Informacion General:
Estado de desarrollo, su implementación no se encuentra completa. Disponible para futuras actualizaciones.
"""
@socketio.on('message_send')
def handleMessage(MessageInformation):
  """UserName = MessageInformation[0];
  LastName = MessageInformation[1];
  MessageContent = MessageInformation[3];"""
  emit('message_received',MessageInformation, broadcast=True)
  
"""
Sistema sin implementar, se agregará para futuras actualizaciones. 
"""
@socketio.on('connect')
def handleConnect():
    print(f'se ha conectado:')

@socketio.on('disconnect')
def handleDisconnect():
    print('Usuario desconectado')

