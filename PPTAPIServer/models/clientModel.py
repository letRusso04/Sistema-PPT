from database.danQuery import database_load
from Interface.modelInterface import ModelInterface
class ClientModel:
    async def modelCreateClient(idBusiness, name, address, cid, phone, idAccount):
        try:
            (connect, query)= await database_load()
            query.execute(f"INSERT INTO dan_client(fg_company, cli_name, cli_address, cli__cid, cli_phone, fg_account) VALUES ('{idBusiness}', '{name}', '{address}', '{cid}', '{phone}', '{idAccount}')")
            connect.commit()
        except: 
            DTOData = ModelInterface("BAD_QUERY_RESPONSE")
            return DTOData
        DTOData = ModelInterface("SUCCESS_QUERY_RESPONSE")
        return DTOData

    async def modelChangeClient(idClient,name, address, cid, phone):
        try:
            (connect, query)= await database_load()
            if name != 'false' and name is not False:
                query.execute(f"UPDATE dan_client SET cli_name = '{name}' WHERE pk_client = '{idClient}'")  
            if address != 'false' and address is not False:
                query.execute(f"UPDATE dan_client SET cli_address = '{address}' WHERE pk_client = '{idClient}'")
            if cid != 'false' and cid is not False:
                query.execute(f"UPDATE dan_client SET cli__cid = '{cid}' WHERE pk_client = '{idClient}'")
            if phone != 'false' and phone is not False:
                query.execute(f"UPDATE dan_client SET cli_phone = '{phone}' WHERE pk_client = '{idClient}'")
            connect.commit()
        except:
            DTOData = ModelInterface("BAD_QUERY_RESPONSE")
            return DTOData
        DTOData = ModelInterface("SUCCESS_QUERY_RESPONSE")
        return DTOData            

    async def modelDeleteClient(idClient):
        try:
            (connect, query)= await database_load()
            query.execute(f"DELETE FROM dan_client WHERE pk_client = '{idClient}'")
            connect.commit()
        except: 
            DTOData = ModelInterface("BAD_QUERY_RESPONSE")
            return DTOData
        DTOData = ModelInterface("DELETE_QUERY_RESPONSE")
        return DTOData           
               

    async def modelCallClient(idBusiness):
        try:
            (connect, query)= await database_load()
            query.execute(f"SELECT pk_client, cli_name, cli__cid, cli_phone FROM dan_client WHERE fg_company = '{idBusiness}'")
            resultData = query.fetchall()
            connect.commit()
        except:
            DTOData = ModelInterface("BAD_QUERY_RESPONSE")
            return DTOData
        DTOData = ModelInterface(resultData)
        return DTOData                      

    async def modelCallIDClient(idClient, idBusiness):
        try:
            (connect, query)= await database_load()
            query.execute(f"SELECT cli_name, cli__cid, cli_phone, cli_address FROM dan_client WHERE fg_company = '{idBusiness}' && pk_client = '{idClient}'")
            resultData = query.fetchall()
            connect.commit()
        except:
            DTOData = ModelInterface("BAD_QUERY_RESPONSE")
            return DTOData            
        DTOData = ModelInterface(resultData)
        return DTOData

    async def modelSearchClient(IdBusiness, nameSearch):
        try:
            (connect, query)= await database_load()
            query.execute(f"SELECT pk_client, cli_name, cli__cid, cli_phone FROM dan_client WHERE (cli_name LIKE '{nameSearch}%' OR cli__cid LIKE '{nameSearch}%' OR cli_phone LIKE '{nameSearch}%') && fg_company = '{IdBusiness}'")
            resultData = query.fetchall()
            connect.commit()
        except:
            DTOData = ModelInterface("BAD_QUERY_RESPONSE")
            return DTOData    
        DTOData = ModelInterface(resultData)
        return DTOData                   