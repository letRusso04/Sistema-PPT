
from models.authModel import AuthModels
"""
Controllers
"""
class AuthControllers:
    async def controllerAuth(email, password):
      # try:
            return await AuthModels.modelAuth(email,password)
       #except:
        #   return 

    async def controllerRegister(email, name, cedula, password, ubicacion, estado, telefono):
       return await AuthModels.modelRegister(email, name, cedula, password, ubicacion, estado, telefono)
    
    async def controllerChangePassword(iduser, contranueva, contravieja):
      # try:
            return await AuthModels.modelChangePasword(iduser, contranueva, contravieja)
       #except:
        #   return 

    async def controllerChangeImage(fileimage, user_id):
      # try:
            return await AuthModels.modelChangeImage(fileimage, user_id)
       #except:
        #   return 


    async def controllerCallListUser(clientID):
      # try:
            return await AuthModels.modelCallListUser(clientID)
       #except:
        #   return 

    async def controllerAccount(globalUser, name, number, password, selectedOption, timeDesing, iduser, userIdSQL):
      return await AuthModels.modelRegisterAccount(globalUser, name, number, password, selectedOption, timeDesing, iduser, userIdSQL)
                



        