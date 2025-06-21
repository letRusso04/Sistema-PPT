from database.danQuery import database_load
import time
from services.danEmailServices import DanEmailServices
from Interface.modelInterface import ModelInterface
class AuthModels:
    async def modelAuth(email,password):
        try:
            (connect, query)= await database_load()
            query.execute(f"SELECT us_email, us_userid, us_verified, us_name, us_businessname, us_subname FROM db_main WHERE us_email = '{email}' && us_password = '{password}'")
            resultData = query.fetchall()
            connect.commit()
        except Exception:
            DTOData = ModelInterface("BAD_QUERY_RESPONSE")
            return DTOData
        DTOData = ModelInterface(resultData)
        return DTOData
    
    async def modelCallListUser(clientID):
        try:
            (connect, query)= await database_load()
            query.execute(f"SELECT fg_main, ac_id, ac_name, ac_password, ac_number, ac_gener, ac_ubicacion, ac_date FROM db_user WHERE fg_main='{clientID}'")
            resultData = query.fetchall()
            connect.commit()
            DTOData = ModelInterface(resultData)
            return DTOData
        except: 
            DTOData = ModelInterface("BAD_QUERY_RESPONSE")
            return DTOData     

    async def modelRegister(email, name, businessName, password, iduser):
        try:
            (connect, query)= await database_load()
            query.execute(f"INSERT INTO db_main(us_verified, us_email, us_password, us_name, us_businessname, us_userid) VALUES ('1','{email}','{password}', '{name}', '{businessName}', '{iduser}')")
            connect.commit()
            DTOData = ModelInterface("SUCCESS_QUERY_RESPONSE")
            return DTOData
        except: 
            DTOData = ModelInterface("BAD_QUERY_RESPONSE")
            return DTOData       
            
    async def modelRegisterAccount(globalUser, name, number, password, selectedOption, timeDesing, iduser, userIdSQL):
        try:
            (connect, query)= await database_load()
            query.execute(f"INSERT INTO db_user(fg_main, ac_id, ac_name, ac_password, ac_number, ac_gener, ac_ubicacion, ac_date) VALUES ('{userIdSQL}', '{iduser}','{name}','{password}','{number}','{selectedOption}','{globalUser}', '{timeDesing}')")
            connect.commit()
            DTOData = ModelInterface("SUCCESS_QUERY_RESPONSE")
            return DTOData
        except: 
            DTOData = ModelInterface("BAD_QUERY_RESPONSE")
            return DTOData    
         

