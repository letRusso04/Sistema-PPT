from database.danQuery import database_load
from Interface.modelInterface import ModelInterface
class ProductsModel:
    async def modelCreateProduct(idBusiness, name, cost, price, category, idAccount):
        try:
            (connect, query)= await database_load()
            query.execute(f"INSERT INTO dan_product(fg_company, pr_name, pr_cost, pr_price, pr_category, fg_account) VALUES ('{idBusiness}', '{name}', '{cost}', '{price}', '{category}', '{idAccount}')")
            connect.commit()
        except:
            DTOData = ModelInterface("BAD_QUERY_RESPONSE")
            return DTOData     
        DTOData = ModelInterface("SUCCESS_QUERY_RESPONSE")
        return DTOData                     

    async def modelCallProduct(idBusiness):
        try:
            (connect, query)= await database_load()
            query.execute(f"SELECT pk_product, fg_company, pr_name, pr_amount, pr_currency, pr_cost, pr_price, pr_date FROM dan_product WHERE fg_company = '{idBusiness}'")
            resultData = query.fetchall()
            connect.commit()
        except:
            DTOData = ModelInterface("BAD_QUERY_RESPONSE")
            return DTOData     
        DTOData = ModelInterface(resultData)
        return DTOData    

    async def modelSearchProduct(nameSearch, IdBusiness):
        try:
            (connect, query)= await database_load()
            query.execute(f"SELECT pk_product, fg_company, pr_name, pr_amount, pr_currency, pr_cost, pr_price, pr_date, pr_category FROM dan_product WHERE (pr_name LIKE '{nameSearch}%') && fg_company = '{IdBusiness}'")
            resultData = query.fetchall()
            connect.commit()
        except:
            DTOData = ModelInterface("BAD_QUERY_RESPONSE")
            return DTOData     
        DTOData = ModelInterface(resultData)
        return DTOData    

    async def modelSearchIDProduct(idBusiness, idProduct):
        try:
            (connect, query)= await database_load()
            query.execute(f"SELECT pk_product, fg_company, pr_name, pr_amount, pr_currency, pr_cost, pr_price, pr_date, pr_category FROM dan_product WHERE fg_company = '{idBusiness}' && pk_product = '{idProduct}' ")
            resultData = query.fetchall()
            connect.commit()
        except:
            DTOData = ModelInterface("BAD_QUERY_RESPONSE")
            return DTOData     
        DTOData = ModelInterface(resultData)
        return DTOData    

    async def modelChangeProduct(idProduct, name, amount, cost, sent, category):
        try:
            (connect, query)= await database_load()
            if name != 'false' and name is not False:
                query.execute(f"UPDATE dan_product SET pr_name = '{name}' WHERE pk_product = '{idProduct}'")  
            if amount != 'false' and amount is not False:
                query.execute(f"UPDATE dan_product SET pr_amount = '{amount}' WHERE pk_product = '{idProduct}'")
            if cost != 'false' and cost is not False:
                query.execute(f"UPDATE dan_product SET pr_cost = '{cost}' WHERE pk_product = '{idProduct}'")
            if sent != 'false' and sent is not False:
                query.execute(f"UPDATE dan_product SET pr_price = '{sent}' WHERE pk_product = '{idProduct}'")
            if category != 'false' and category is not False:
                query.execute(f"UPDATE dan_product SET pr_category = '{category}' WHERE pk_product = '{idProduct}'")
            connect.commit()     
        except:
            DTOData = ModelInterface("BAD_QUERY_RESPONSE")
            return DTOData 
        DTOData = ModelInterface("SUCCESS_QUERY_RESPONSE")
        return DTOData      
    async def modelDeleteProduct(idProduct):
        try:
            (connect, query)= await database_load()
            query.execute(f"DELETE FROM dan_product WHERE pk_product = '{idProduct}'")
            connect.commit()
        except:
            DTOData = ModelInterface("BAD_QUERY_RESPONSE")
            return DTOData 
        DTOData = ModelInterface("DELETE_QUERY_RESPONSE")
        return DTOData  
            

    async def modelFirstProduct(nameSearch):
        try:
            (connect, query)= await database_load()
            query.execute(f"SELECT pk_product, fg_company, pr_name, pr_amount, pr_currency, pr_cost, pr_price, pr_date FROM dan_product WHERE fg_company = '{nameSearch}'")
            resultData = query.fetchall()
            connect.commit()
        except:
            DTOData = ModelInterface("BAD_QUERY_RESPONSE")
            return DTOData 
        DTOData = ModelInterface(resultData)
        return DTOData  