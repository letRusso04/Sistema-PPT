from flask import Blueprint, request, jsonify, current_app, send_from_directory
from flask_jwt_extended import jwt_required, get_jwt_identity
from werkzeug.utils import secure_filename
import os, uuid

"""
Trae el "app" construido desde el index, donde se le asignan las rutas que va a contener.
"""
from index import app

"""
Invoca la clases de cada controlador, trae cada metodo que pertenecen a las rutas.
"""
from Controllers.authController import AuthControllers
from Controllers.memberController import MemberControllers
from Controllers.messageController import MessageControllers
"""
Rutas principales de autenticacion del usuario. 
Para funcionar correctamente, se recomienda installar flask[async].
"""
@app.route('/registro', methods=['POST'])
async def RegisterUser():
    print("llamando a registro")
    email = request.json['email']
    nombre = request.json['name']
    password = request.json['password']
    cedula = request.json['cedula']
    ubicacion = request.json['ubicacion']
    estado = request.json['estado']
    telefono = request.json['telefono']
    return await AuthControllers.controllerRegister(email, nombre, cedula, password, ubicacion, estado, telefono)

@app.route('/inicio', methods=['POST'])
async def routerAuth():
    email= request.json['email']
    password= request.json['password']
    return await AuthControllers.controllerAuth(email, password)


@app.route('/cambiarcontra', methods=['POST'])
async def routerCPassword():
    iduser= request.json['iduser']
    contranueva= request.json['contranueva']
    contravieja= request.json['contravieja']
    return await AuthControllers.controllerChangePassword(iduser, contranueva, contravieja)

@app.route('/avatar/change', methods=['POST'])
async def avatarsChanges():
    if 'avatar' not in request.files:
        return {'error': 'archivo faltante'}, 400
    img = request.files['avatar']
    user_id = request.form.get('iduser')
    ext = os.path.splitext(img.filename)[1]
    filename = f"{user_id}{ext}"
    save_dir = os.path.join(current_app.instance_path, 'uploads', 'avatars')
    os.makedirs(save_dir, exist_ok=True)
    img.save(os.path.join(save_dir, filename))
    return await AuthControllers.controllerChangeImage(filename, user_id)

# Avatars del usuario 
@app.route('/avatars/<filename>')
def serve_avatar(filename):
    avatar_folder = os.path.join(current_app.instance_path, 'uploads', 'avatars')
    print(avatar_folder)
    return send_from_directory(avatar_folder, filename)



# MIEMBROS


"""
Rutas coherentes a los miembros de la aplicacion
"""
@app.route('/miembros/llamar', methods=['POST'])
async def CallMemberBusiness():
    return await MemberControllers.controllerCallMember()


@app.route('/miembros/aprobar',methods=['POST'])
async def NewPromise():
    iduser = request.json['iduser']
    return await MemberControllers.controllerAcceptMember(iduser)

@app.route('/miembros/eliminar',methods=['POST'])
async def LeftOutBusiness():
    iduser = request.json['iduser']
    return await MemberControllers.controllerKickMember(iduser)

@app.route('/miembros/actualizar',methods=['POST'])
async def UpdateMembers():
    data = request.get_json()
    iduser    = data.get('id')
    rol       = data.get('rol')
    correo    = data.get('correo')
    cedula    = data.get('cedula')
    estado    = data.get('estado')
    ubicacion = data.get('ubicacion')
    telefono  = data.get('telefono')
    return await MemberControllers.controllerChangeMember(iduser, rol, correo, cedula, estado, ubicacion, telefono)


"""
Rutas coherentes a los mensajes de la aplicacion.
"""

@app.route('/mensajes/enviar', methods=['POST'])
async def SendMessages():
    userId = request.json['userId']    
    UserFriend = request.json['UserFriend']
    uid = request.json['id']
    message = request.json['messageSend'];
    return await MessageControllers.controllerCreateMessage(userId, UserFriend, uid, message)

@app.route('/mensajes/buscar/bot', methods=['POST'])
async def SearchMessagesBot():
    userid = request.json['userid']  
    return await MessageControllers.controllerSearchBotMessage(userid)

@app.route('/message/APIllamar/bot', methods=['POST'])
async def CallMessageBot():
    userid = request.json['userid']
    message = request.json['message']
    chatbot = request.json['chatbot']
    return await MessageControllers.controllerMessageAPIBot(userid, message, chatbot)


@app.route('/mensajes/buscar/miembro', methods=['POST'])
async def SearchMessages():
    UserId = request.json['userId']    
    UserFriend = request.json['UserFriend']
    return await MessageControllers.controllerSearchMessage(UserId, UserFriend)



