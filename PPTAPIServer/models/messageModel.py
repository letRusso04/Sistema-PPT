from database.danQuery import database_load
from Interface.modelInterface import ModelInterface
class MessageModel:
    async def modelCreateMessage(userId, UserFriend, uid, message):
        try:
            (connect, query)= await database_load()
            query.execute(f"INSERT INTO dan_message(me_messageId, fg_send_user, fg_to_user, me_content) VALUES ('{uid}', '{userId}', '{UserFriend}','{message}')")
            connect.commit()
        except:
            DTOData = ModelInterface("BAD_QUERY_RESPONSE")
            return DTOData     
        DTOData = ModelInterface("SUCCESS_QUERY_RESPONSE")
        return DTOData      

    async def modelSearchMessage(UserId, UserFriend):
        try:
            (connect, query)= await database_load()
            query.execute(f"SELECT us.ac_name, me_messageId, me_content, me_image, me_file, me_date FROM dan_message as msg, dan_user as us WHERE (fg_send_user = '{UserId}' AND fg_to_user = '{UserFriend}' AND us.ac_id = '{UserId}') OR (fg_send_user = '{UserFriend}' AND fg_to_user = '{UserId}' AND us.ac_id = '{UserFriend}')")
            resultData = query.fetchall()
            connect.commit()
        except:
            DTOData = ModelInterface("BAD_QUERY_RESPONSE")
            return DTOData     
        DTOData = ModelInterface(resultData)
        return DTOData          

    async def modelSearchBotMessage(UserId):
        try:
            (connect, query)= await database_load()  
            query.execute(f"SELECT pk_chatbot, chatbot_isDante, chatbot_message, chatbot_date FROM dan_chatbot WHERE fg_userid = '{UserId}'")
            resultData = query.fetchall()
            connect.commit()
        except:
            DTOData = ModelInterface("BAD_QUERY_RESPONSE")
            return DTOData  
        DTOData = ModelInterface(resultData)
        return DTOData                       

    async def modelMessageAPIBot(userId, MessageSend, chabot):
          return await DanteAligheri.StartQueryAI(userId, MessageSend, chabot)      

     
        
     