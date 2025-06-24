from models.messageModel import MessageModel
class MessageControllers:

    async def controllerCreateMessage(userId, UserFriend, timestamp, message):
      return await MessageModel.modelCreateMessage(userId, UserFriend, timestamp, message)

    async def controllerSearchMessage(UserId, UserFriend):
      return await MessageModel.modelSearchMessage(UserId, UserFriend)

    async def controllerSearchBotMessage(UserId):
       return await MessageModel.modelSearchBotMessage(UserId)

    async def  controllerPublicacionGuardar(iduser, title, content, image_path, timestamp):
       return await MessageModel.modelPublicacionGuardar(iduser, title, content, image_path, timestamp)
 
    async def controllerPublicacionLlamar():
       return await MessageModel.modelPublicacionLlamar()   




