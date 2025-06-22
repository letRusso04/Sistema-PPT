from models.memberModel import MemberModel
class MemberControllers:
    async def controllerCallMember():
        return await MemberModel.modelCallMember()

    async def controllerAcceptMember(iduser):
        return await MemberModel.modelAcceptMember(iduser)

    async def controllerKickMember(iduser):
        return await MemberModel.modelKickMember(iduser)

    async def controllerChangeMember(iduser, rol, correo, cedula, estado, ubicacion, telefono):
        return await MemberModel.modelChangeMember(iduser, rol, correo, cedula, estado, ubicacion, telefono)

# ##
#     async def controllerSearchMember(searchUser, userId):
#        await MemberModel.modelSearchMember(searchUser, userId)

#     async def controllerInviteMember(userId, userIdInvite, inviteType, inviteStatus):
#         await MemberModel.modelInviteMember(userId, userIdInvite, inviteType, inviteStatus)

#     async def controllerInviteBusinessMember(idBusiness, userId, userIdInvite, inviteType, inviteStatus): 
#         await MemberModel.modelInviteBusinessMember(idBusiness, userId, userIdInvite, inviteType, inviteStatus)

#     async def controllerSearchInvitesMember(getUserInvite):
#         await MemberModel.modelSearchInvitesMember(getUserInvite)

#     async def controllerDeleteInvitesMember(getUserByInvite, getUserToInvite):
#         await MemberModel.modelDeleteInvitesMember(getUserByInvite, getUserToInvite)

#     async def controllerDeleteInvitesBusiness(getUserByInvite, idNegocio):
#         await MemberModel.modelDeleteInvitesBusiness(getUserByInvite, idNegocio)

#     async def controllerAcceptInvitesMember(getUserByInvite, getUserToInvite):
#         await MemberModel.modelAcceptInvitesMember(getUserByInvite, getUserToInvite)

#     async def controllerAcceptInvitesBusiness(getUserByInvite, idNegocio):
#         await MemberModel.modelAcceptInvitesBusiness(getUserByInvite, idNegocio)

#     async def controllerSearchListFriend(getUserInvite):
#         await MemberModel.modelSearchListFriend(getUserInvite)

#     async def controllerLoadName(userFriend):
#         await MemberModel.modelLoadName(userFriend)
        
#     async def controllerViewData(idUser):
#         await MemberModel.modelViewData(idUser)

#     async def controllerChangeData(idUser, newPassword):
#         await MemberModel.modelChangeData(idUser, newPassword)
