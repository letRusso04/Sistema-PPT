import base64
from datetime import datetime
import mimetypes
from flask import Blueprint, abort, request, jsonify, current_app, send_file, send_from_directory
from flask_jwt_extended import jwt_required, get_jwt_identity
from werkzeug.utils import secure_filename
import os, uuid
import asyncio

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
from models.authModel import AuthModels

"""
Rutas principales de autenticacion del usuario. 
Para funcionar correctamente, se recomienda installar flask[async].
"""
@app.route('/registro', methods=['POST'])
async def RegisterUser():
    print("llega los datos")
    email = request.json['email']
    nombre = request.json['name']
    password = request.json['password']
    cedula = request.json['cedula']
    ubicacion = request.json['ubicacion']
    estado = request.json['estado']
    telefono = request.json['telefono']
    response = await AuthControllers.controllerRegister(email, nombre, cedula, password, ubicacion, estado, telefono)
    return response

@app.route('/inicio', methods=['POST'])
async def routerAuth():
    try: 
        email= request.json['email']
        password= request.json['password']
        return await AuthControllers.controllerAuth(email, password)
    except ValueError:
        print(f"error {ValueError}")
        


@app.route('/cambiarcontra', methods=['POST'])
async def routerCPassword():
    iduser= request.json['iduser']
    contranueva= request.json['contranueva']
    contravieja= request.json['contravieja']
    await AuthModels.Auditory(iduser, f"Ha cambiado su contraseña", 2)    
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
    await AuthModels.Auditory(user_id, f"Ha cambiado su imagen", 2)    
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
    await AuthModels.Auditory(iduser, f"Ha sido aceptado del sistema", 4)    
    return await MemberControllers.controllerAcceptMember(iduser)

@app.route('/miembros/eliminar',methods=['POST'])
async def LeftOutBusiness():
    iduser = request.json['iduser']
    await AuthModels.Auditory(iduser, f"Ha sido expulsado del sistema", 3)    
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
    await AuthModels.Auditory(iduser, f"Ha sido recientemente actualizado", 2)    
    return await MemberControllers.controllerChangeMember(iduser, rol, correo, cedula, estado, ubicacion, telefono)


"""
Rutas coherentes a los mensajes de la aplicacion.
"""

@app.route('/mensajes/enviar', methods=['POST'])
async def SendMessages():
    userId = request.json['by_id']    
    UserFriend = request.json['to_id']
    message = request.json['message']
    timestamp = request.json['timestamp']
    return await MessageControllers.controllerCreateMessage(userId, UserFriend, timestamp, message)

@app.route('/mensajes/buscar', methods=['POST'])
async def SearchMessages():
    data = request.get_json()
    from_id = data.get('from_id')
    to_id = data.get('to_id')
    return await MessageControllers.controllerSearchMessage(from_id, to_id)


@app.route('/publicaciones/llamar', methods=['POST'])
async def CallPost():
    return await MessageControllers.controllerPublicacionLlamar()


@app.route('/publicaciones/guardar', methods=['POST'])
async def GuardarPublicaciones():
    data = request.get_json()
    title = data.get('title')
    content = data.get('content')
    image_base64 = data.get('image_base64')
    iduser = data.get('iduser')
    timestamp = data.get('timestamp')
    await AuthModels.Auditory(iduser, f"Se ha hecho una nueva publicacion: {title}", 1)    
    if not title or not content:
        return jsonify({'error': 'Título y contenido son obligatorios'}), 400

    image_path = None
    if image_base64:
        try:
            image_data = base64.b64decode(image_base64)
            filename = f"pub_{datetime.utcnow().strftime('%Y%m%d%H%M%S%f')}.png"
            upload_folder = os.path.join(current_app.instance_path, 'uploads', 'publicaciones')
            os.makedirs(upload_folder, exist_ok=True)
            # Crear el nombre de archivo
            filename = f"pub_{datetime.utcnow().strftime('%Y%m%d%H%M%S%f')}.png"

            # Crear ruta de carpeta donde guardar
            folder = os.path.join(current_app.instance_path, 'uploads', 'publicaciones')
            os.makedirs(folder, exist_ok=True)

            # Guardar archivo en esa carpeta
            file_path = os.path.join(folder, filename)
            with open(file_path, 'wb') as f:
                f.write(image_data)

            # Solo guardar el nombre en la base de datos
            image_path = filename
        except Exception as e:
            return jsonify({'error': f'Error al guardar la imagen: {str(e)}'}), 500

    return await MessageControllers.controllerPublicacionGuardar(
        iduser, title, content, image_path, timestamp
    )


@app.route('/publicaciones/imagen/<filename>')
def server_post(filename):
    file_path = os.path.join(current_app.instance_path, 'uploads', 'publicaciones', filename)

    if not os.path.exists(file_path):
        abort(404)

    return send_file(open(file_path, 'rb'), mimetype='image/png')

@app.route('/auditoria/llamar', methods=['POST'])
async def CallAudit():
    return await AuthControllers.modelCallAudit()