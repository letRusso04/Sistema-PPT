from models.clientModel import ClientModel

class ClientControllers:
    async def controllerChangeClient(idClient,name, address, cid, phone):
       return await ClientModel.modelChangeClient(idClient,name, address, cid, phone)

    async def controllerDeleteClient(idClient):
       return await ClientModel.modelDeleteClient(idClient)

    async def controllerCreateClient(idBusiness, name, address, cid, phone, idAccount):
       return await ClientModel.modelCreateClient(idBusiness, name, address, cid, phone, idAccount)

    async def controllerCallClient(idBusiness):
      return await ClientModel.modelCallClient(idBusiness)

    async def controllerCallIDClient(idClient, idBusiness):
      return await ClientModel.modelCallIDClient(idClient, idBusiness)

    async def controllerSearchClient(IdBusiness, nameSearch):
      return await ClientModel.modelSearchClient(IdBusiness, nameSearch)