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
from Controllers.businessController import BusinessControllers
from Controllers.productsController import ProductsControllers
from Controllers.memberController import MemberControllers
from Controllers.clientController import ClientControllers
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


@app.route('/miembros/permisos',methods=['POST'])
async def NewPromise():
    idBusiness = request.json['idBusiness']
    idUser = request.json['idUser']
    selectedOption = request.json['selectedOption']
    return await MemberControllers.controllerPermissionsMember(idBusiness, idUser, selectedOption)
@app.route('/miembros/expulsar',methods=['POST'])
async def LeftOutBusiness():
    idBusiness = request.json['idBusiness']
    sendUserId = request.json['sendUserId']
    return await MemberControllers.controllerKickMember(idBusiness, sendUserId)
@app.route('/miembros/busqueda', methods=['POST'])
async def CallUser():
    searchUser = request.json['searchUser']
    userId = request.json['userId']
    return await MemberControllers.controllerSearchMember(searchUser, userId)
    
@app.route('/miembros/invitar/amigos', methods=['POST'])
async def InviteUser():
    userId = request.json['userId']    
    userIdInvite = request.json['UserIdInvite']
    inviteType = request.json['InviteType']
    inviteStatus = 1
    return await MemberControllers.controllerInviteMember(userId, userIdInvite, inviteType, inviteStatus)
@app.route('/miembros/invitar/tienda', methods=['POST'])
async def InviteUserBusiness():

    idBusiness = request.json['getIdBusiness']
    userId = request.json['userId']    
    userIdInvite = request.json['UserIdInvite']
    inviteType = request.json['InviteType']
    inviteStatus = 1;
    return await MemberControllers.controllerInviteBusinessMember(idBusiness, userId, userIdInvite, inviteType, inviteStatus)
@app.route('/miembros/busqueda/invitaciones', methods=['POST'])
async def SearchInvitesUser():
    getUserInvite = request.json['userId']
    return await MemberControllers.controllerSearchInvitesMember(getUserInvite)
@app.route('/miembros/eliminar/invitaciones/amigos', methods=['POST'])
async def DeleteInvitesUser():
    getUserByInvite = request.json['userId']
    getUserToInvite = request.json['userInviteId']
    return await MemberControllers.controllerDeleteInvitesMember(getUserByInvite, getUserToInvite)
@app.route('/miembros/eliminar/invitaciones/negocio', methods=['POST'])
async def DeleteInviteBusiness():
    getUserByInvite = request.json['userId']
    idNegocio = request.json['idNegocio']
    return await MemberControllers.controllerDeleteInvitesBusiness(getUserByInvite, idNegocio)
@app.route('/miembros/aceptar/invitaciones/amigos', methods=['POST'])
async def AcceptInvitesUser():
    getUserByInvite = request.json['userId']
    getUserToInvite = request.json['userInviteId']
    return await MemberControllers.controllerAcceptInvitesMember(getUserByInvite, getUserToInvite)
@app.route('/miembros/aceptar/invitaciones/negocio', methods=['POST'])
async def AcceptInviteBusiness():
    getUserByInvite = request.json['userId']
    idNegocio = request.json['idNegocio']
    return await MemberControllers.controllerAcceptInvitesBusiness(getUserByInvite, idNegocio)
@app.route('/miembros/busqueda/amigos', methods=['POST'])
async def SearchFriendList():
    getUserInvite = request.json['userId']
    return await MemberControllers.controllerSearchListFriend(getUserInvite)
@app.route('/miembros/obtener/nombre', methods=['POST'])
async def LoadName():
    userFriend = request.json['UserFriend']
    return await MemberControllers.controllerLoadName(userFriend)
@app.route('/miembros/permisos/observar', methods=['POST'])
async def SearchPassword():
    # Solo pass
    idUser = request.json['idUser'] 
    return await MemberControllers.controllerViewData(idUser)
@app.route('/miembros/permisos/cambiar', methods=['POST'])
async def ChangePassword():
    #Solo Pass
    idUser = request.json['idUser'] 
    newPassword = request.json['newPassword']   
    return await MemberControllers.controllerChangeData(idUser, newPassword)

"""
Rutas coherentes a los clientes de los negocios de la aplicacion.
"""
@app.route('/cliente/cambiar',methods=['POST'])
async def ChangeClient():
    idClient = request.json['idClient']
    name = request.json['name']
    address = request.json['address']
    cid = request.json['cid']
    phone = request.json['phone']
    return await ClientControllers.controllerChangeClient(idClient,name, address, cid, phone)

@app.route('/cliente/borrar',methods=['POST'])
async def DeleteClient():
    idClient = request.json['idClient']
    return await ClientControllers.controllerDeleteClient(idClient)

@app.route('/cliente/crear', methods=['POST'])
async def CreateClient():    
    idBusiness = request.json['idBusiness']
    name = request.json['name']
    address = request.json['address']
    cid = request.json['cid']
    phone = request.json['phone']
    idAccount = request.json['idAccount']
    return await ClientControllers.controllerCreateClient(idBusiness, name, address, cid, phone, idAccount)
@app.route('/cliente/llamar', methods=['POST'])
async def CallClient():
    idBusiness = request.json['idBusiness']
    return await ClientControllers.controllerCallClient(idBusiness)

@app.route('/cliente/llamar/unico', methods=['POST'])
async def CallClientID():
    idClient = request.json['idClient']
    idBusiness = request.json['idBusiness']
    return await ClientControllers.controllerCallIDClient(idClient, idBusiness)

@app.route('/cliente/buscar', methods=['POST'])
async def SearchClient():
    IdBusiness = request.json['idBusiness']
    nameSearch = request.json['nameSearch']
    return await ClientControllers.controllerSearchClient(IdBusiness, nameSearch)
