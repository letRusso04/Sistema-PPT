from database.danQuery import database_load
import time
from services.danEmailServices import DanEmailServices
from Interface.modelInterface import ModelInterface
class AuthModels:
    async def modelAuth(email,password):
        print(f"{email} - {password}")
        try:
            (connect, query)= await database_load()
            query.execute(f"SELECT us_pk, us_verified, us_name, us_password, us_cedula, us_ubicacion, us_email, us_phone, us_estado, us_adm, imageUrl FROM db_main WHERE us_email = '{email}' && us_password = '{password}'")
            resultData = query.fetchall()
            connect.commit()
        except Exception:
            DTOData = ModelInterface("BAD_QUERY_RESPONSE")
            return DTOData
        DTOData = ModelInterface(resultData)
        print(DTOData)
        return DTOData
    




    
    async def modelChangePasword(iduser, contranueva, contravieja):
        try:
            (connect, query)= await database_load()
            query.execute(f"UPDATE db_main SET us_password='{contranueva}' WHERE us_password = '{contravieja}' && us_pk = '{iduser}'")
            print(f"{contravieja} - {contranueva} - {iduser}")
            connect.commit()
            affected_rows = query.rowcount
            if affected_rows <= 0:
             DTOData = ModelInterface("BAD_QUERY_RESPONSE")
             return DTOData   
        except:
            DTOData = ModelInterface("BAD_QUERY_RESPONSE")
            return DTOData   
        DTOData = ModelInterface("SUCCESS_QUERY_RESPONSE")
        return DTOData     

    async def modelChangeImage(fileimage, user_id):
        avatarUrl = ''
        try:
            (connect, query)= await database_load()
            query.execute(f"UPDATE db_main SET imageUrl='{fileimage}' WHERE us_pk = '{user_id}'")
            connect.commit()
        except:
            DTOData = {'avatarUrl': "BAD_QUERY_RESPONSE"}, 200
            return DTOData   
        DTOData = {'avatarUrl': fileimage}, 200
        return DTOData  



    async def modelRegister(email, name, cedula, password, ubicacion, estado, telefono):
        try:
            (connect, query)= await database_load()
            query.execute(f"INSERT INTO db_main(us_verified, us_name, us_password, us_ubicacion, us_email, us_estado, us_phone, us_adm, us_cedula) VALUES (0,'{name}','{password}','{ubicacion}','{email}','{estado}','{telefono}',0, '{cedula}')")
            connect.commit()
            DTOData = ModelInterface("SUCCESS_QUERY_RESPONSE")
            return DTOData
        except: 
            DTOData = ModelInterface("BAD_QUERY_RESPONSE")
            return DTOData       
            

