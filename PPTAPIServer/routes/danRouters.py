from flask import request
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

@app.route('/inicio', methods=['POST'])
async def routerAuth():
    email= request.json['email']
    password= request.json['password']
    return await AuthControllers.controllerAuth(email, password)

@app.route('/registro', methods=['POST'])
async def RegisterUser():
    email = request.json['email']
    name = request.json['name']
    businessName = request.json['businessName']
    password = request.json['password']
    iduser =  request.json['id']
    return await AuthControllers.controllerRegister(email, name, businessName, password, iduser)

@app.route('/cuenta/registro', methods=['POST'])
async def RegisterAccount():
    globalUser = request.json['globalUser']
    name = request.json['name']
    number = request.json['number']
    password = request.json['password']
    selectedOption = request.json['selectedOption']
    timeDesing = request.json['timeDesing']
    iduser =  request.json['id']
    userIdSQL =  request.json['userId']
    return await AuthControllers.controllerAccount(globalUser, name, number, password, selectedOption, timeDesing, iduser, userIdSQL)

@app.route('/cuenta/llamar', methods=['POST'])
async def callAccount():
    clientID =  request.json['clientID']
    return await AuthControllers.controllerCallListUser(clientID)

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

@app.route('/mensajes/buscar/miembro', methods=['POST'])
async def SearchMessages():
    UserId = request.json['userId']    
    UserFriend = request.json['UserFriend']
    return await MessageControllers.controllerSearchMessage(UserId, UserFriend)
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















"""
Rutas coherentes a los negocios de la aplicacion
"""

@app.route('/negocio/crear', methods=['POST'])
async def CrearNeg():
    userId = request.json['userId']
    nombre = request.json['nombre']
    ubicacion = request.json['ubicacion']
    rif = request.json['rif']
    numero = request.json['numero']
    return await BusinessControllers.controllerCreateBusiness(userId, nombre, ubicacion, rif, numero)

@app.route('/negocio/llamar', methods=['POST'])
async def CallBusiness():
    getUserId = request.json['sendUserId']
    return await BusinessControllers.controllerCallBusiness(getUserId)

@app.route('/negocio/traer', methods=['POST'])
async def GetBusiness():
    idNegocio = request.json['idNegocio']
    return BusinessControllers.controllerQueryBusiness(idNegocio)

@app.route('/negocio/eliminar', methods=['POST'])
async def DeleteBusiness():
    idBusiness = request.json['idBusiness']
    return await BusinessControllers.controllerDeleteBusiness(idBusiness)
@app.route('/negocio/generar/reporte', methods=['POST'])
async def GenerateReport():
    callsentProduct = request.json['callsentProduct']
    nameUser = request.json['nameUser']
    IdBusiness = request.json['IdBusiness']
    nameClient = request.json['nameClient']
    reportUid = request.json['reportUid']
    return await BusinessControllers.controllerGenerateReport(callsentProduct, nameUser, IdBusiness, nameClient, reportUid)
@app.route('/negocio/busqueda/reporte', methods=['POST'])
async def SearchReport():
    idBusiness = request.json['IdBusiness']   
    return await BusinessControllers.controllerSearchReport(idBusiness)
@app.route('/negocio/busqueda/reporteID', methods=['POST'])
async def SearchReportId():
    idReportData = request.json['idReportData'] 
    return await BusinessControllers.controllerSearchReportID(idReportData)
@app.route('/negocio/obtener/global', methods=['POST'])
async def CallTotalGlobal():
   idBusiness = request.json['idBusiness']   
   return await BusinessControllers.controllerGetGlobal(idBusiness)


"""
Rutas coherentes a los productos de la aplicacion.
"""
@app.route('/producto/crear', methods=['POST'])
async def CreateProduct():
    idBusiness = request.json['idBusiness']
    name = request.json['name']
    category = request.json['category']
    price = request.json['price']
    cost = request.json['cost']
    idAccount = request.json['idAccount']
    return await ProductsControllers.controllerCreateProduct(idBusiness, name, cost, price, category, idAccount)

@app.route('/producto/llamar', methods=['POST'])
async def CallProduct():
    idBusiness = request.json['IdBusiness']
    return await ProductsControllers.controllerCallProduct(idBusiness)

@app.route('/producto/buscar', methods=['POST'])
async def SearchProduct():
    nameSearch = request.json['nameSearch']
    IdBusiness = request.json['IdBusiness']
    return await ProductsControllers.controllerSearchProduct(nameSearch, IdBusiness)

@app.route('/producto/buscar/unico',methods=['POST'])
async def CallIDProduct():
    idBusiness = request.json['idBusiness']
    idProduct = request.json['idProduct']
    return await ProductsControllers.controllerSearchIDProduct(idBusiness, idProduct)

@app.route('/producto/cambiar',methods=['POST'])
async def ChangeProduct():
    idProduct = request.json['idProduct']
    name = request.json['name']
    amount = request.json['amount']
    cost = request.json['cost']
    sent = request.json['sent']
    category = request.json['category']
    return await ProductsControllers.controllerChangeProduct(idProduct, name, amount, cost, sent, category)
@app.route('/producto/borrar',methods=['POST'])
async def DeleteProduct():
    idProduct = request.json['idProduct']
    return await ProductsControllers.controllerDeleteProduct(idProduct)
@app.route('/producto/obtener', methods=['POST'])
async def FirstSearchProduct():
    nameSearch = request.json['companyId']
    return await ProductsControllers.controllerFirstProduct(nameSearch)

"""
Rutas coherentes a los miembros de la aplicacion
"""
@app.route('/miembros/llamar', methods=['POST'])
async def CallMemberBusiness():
    idBusiness = request.json['idBusiness']
    return await MemberControllers.controllerCallMember(idBusiness)
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
