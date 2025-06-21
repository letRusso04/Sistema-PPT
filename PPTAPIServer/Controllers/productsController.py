from models.productsModel import ProductsModel
class ProductsControllers:
    async def controllerCreateProduct(idBusiness, name, cost, price, category, idAccount):
       return await ProductsModel.modelCreateProduct(idBusiness, name, cost, price, category, idAccount)

    async def controllerCallProduct(idBusiness):
       return await ProductsModel.modelCallProduct(idBusiness)

    async def controllerSearchProduct(nameSearch, IdBusiness):
      return  await ProductsModel.modelSearchProduct(nameSearch, IdBusiness)

    async def controllerSearchIDProduct(idBusiness, idProduct):
      return  await ProductsModel.modelSearchIDProduct(idBusiness, idProduct)

    async def controllerChangeProduct(idProduct, name, amount, cost, sent, category):
      return  await ProductsModel.modelChangeProduct(idProduct, name, amount, cost, sent, category)

    async def controllerDeleteProduct(idProduct):
      return  await ProductsModel.modelDeleteProduct(idProduct)

    async def controllerFirstProduct(nameSearch):
      return  await ProductsModel.modelFirstProduct(nameSearch)