from models.memberModel import MemberModel
class MemberControllers:
    async def controllerCallMember(idBusiness):
        await MemberModel.modelCallMember(idBusiness)

    async def controllerPermissionsMember(idBusiness, idUser, selectedOption):
        await MemberModel.modelPermissionsMember(idBusiness, idUser, selectedOption)

    async def controllerKickMember(idBusiness, sendUserId):
        await MemberModel.modelKickMember(idBusiness, sendUserId)

    async def controllerSearchMember(searchUser, userId):
       await MemberModel.modelSearchMember(searchUser, userId)

    async def controllerInviteMember(userId, userIdInvite, inviteType, inviteStatus):
        await MemberModel.modelInviteMember(userId, userIdInvite, inviteType, inviteStatus)

    async def controllerInviteBusinessMember(idBusiness, userId, userIdInvite, inviteType, inviteStatus): 
        await MemberModel.modelInviteBusinessMember(idBusiness, userId, userIdInvite, inviteType, inviteStatus)

    async def controllerSearchInvitesMember(getUserInvite):
        await MemberModel.modelSearchInvitesMember(getUserInvite)

    async def controllerDeleteInvitesMember(getUserByInvite, getUserToInvite):
        await MemberModel.modelDeleteInvitesMember(getUserByInvite, getUserToInvite)

    async def controllerDeleteInvitesBusiness(getUserByInvite, idNegocio):
        await MemberModel.modelDeleteInvitesBusiness(getUserByInvite, idNegocio)

    async def controllerAcceptInvitesMember(getUserByInvite, getUserToInvite):
        await MemberModel.modelAcceptInvitesMember(getUserByInvite, getUserToInvite)

    async def controllerAcceptInvitesBusiness(getUserByInvite, idNegocio):
        await MemberModel.modelAcceptInvitesBusiness(getUserByInvite, idNegocio)

    async def controllerSearchListFriend(getUserInvite):
        await MemberModel.modelSearchListFriend(getUserInvite)

    async def controllerLoadName(userFriend):
        await MemberModel.modelLoadName(userFriend)
        
    async def controllerViewData(idUser):
        await MemberModel.modelViewData(idUser)

    async def controllerChangeData(idUser, newPassword):
        await MemberModel.modelChangeData(idUser, newPassword)
