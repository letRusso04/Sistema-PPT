
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
    async def controllerCallListUser(clientID):
      # try:
            return await AuthModels.modelCallListUser(clientID)
       #except:
        #   return 

    async def controllerRegister(email, name, businessName, password, iduser):
       return await AuthModels.modelRegister(email, name, businessName, password, iduser)
    
    async def controllerAccount(globalUser, name, number, password, selectedOption, timeDesing, iduser, userIdSQL):
      return await AuthModels.modelRegisterAccount(globalUser, name, number, password, selectedOption, timeDesing, iduser, userIdSQL)
                



        