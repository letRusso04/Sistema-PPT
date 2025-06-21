from models.businessModel import BusinessModel

class BusinessControllers:
    async def controllerCreateBusiness(userId, nombre, ubicacion, rif, numero):
       return await BusinessModel.modelCreateBusiness(userId, nombre, ubicacion, rif, numero)

    async def controllerCallBusiness(getUserId):
       return await BusinessModel.modelCallBusiness(getUserId)

    async def controllerQueryBusiness(idNegocio):
       return await BusinessModel.modelQueryBusiness(idNegocio)

    async def controllerDeleteBusiness(idBusiness):
       return await BusinessModel.modelDeleteBusiness(idBusiness)

    async def controllerGenerateReport(callsentProduct, nameUser, IdBusiness, nameClient, reportUid):
      return  await BusinessModel.modelGenerateReport(callsentProduct, nameUser, IdBusiness, nameClient, reportUid)

    async def controllerSearchReport(idBusiness):
       return await BusinessModel.modelSearchReport(idBusiness)

    async def controllerSearchReportID(idReportData):
       return await BusinessModel.modelSearchReportID(idReportData)

    async def controllerGetGlobal(idBusiness):
      return  await BusinessModel.modelGetGlobal(idBusiness)