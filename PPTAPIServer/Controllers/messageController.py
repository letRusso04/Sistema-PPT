from models.messageModel import MessageModel
class MessageControllers:

    async def controllerCreateMessage(userId, UserFriend, uid, message):
      return await MessageModel.modelCreateMessage(userId, UserFriend, uid, message)

    async def controllerSearchMessage(UserId, UserFriend):
      return await MessageModel.modelSearchMessage(UserId, UserFriend)

    async def controllerSearchBotMessage(UserId):
       return await MessageModel.modelSearchBotMessage(UserId)

    async def controllerMessageAPIBot(userId, MessageSend, chabot):
       return await MessageModel.modelMessageAPIBot(userId, MessageSend, chabot)