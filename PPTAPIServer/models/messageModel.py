from database.danQuery import database_load
from Interface.modelInterface import ModelInterface
class MessageModel:
    async def modelCreateMessage(userId, UserFriend, timestamp, message):
        try:
            (connect, query)= await database_load()
            query.execute(f"INSERT INTO db_message(fg_user, fg_touser, me_content, me_date) VALUES ('{userId}','{UserFriend}','{message}','{timestamp}')")
            connect.commit()
        except:
            DTOData = ModelInterface("BAD_QUERY_RESPONSE")
            return DTOData     
        DTOData = ModelInterface("SUCCESS_QUERY_RESPONSE")
        return DTOData      

    async def modelSearchMessage(UserId, UserFriend):
        try:
            (connect, query)= await database_load()
            query.execute(f"SELECT pk_message, fg_user, fg_touser, me_content, me_date FROM db_message WHERE (fg_user = {UserId} AND fg_touser = {UserFriend}) OR (fg_user = {UserFriend} AND fg_touser = {UserId}) ORDER BY me_date")
            resultData = query.fetchall()
            mensajes = [{
                    'id': r[0],
                    'sender_id': r[1],
                    'receiver_id': r[2],
                    'message': r[3],
                    'timestamp': r[4].isoformat()
                } for r in resultData]

            connect.commit()
        except:
            DTOData = ModelInterface("BAD_QUERY_RESPONSE")
            return DTOData     
        return mensajes          

    async def modelPublicacionGuardar(iduser, title, content, image_path, timestamp):
        try:
            (connect, query)= await database_load()
            query.execute(f"INSERT INTO db_post(fg_user, post_title, post_date, post_content, post_urlimage, post_status) VALUES ('{iduser}','{title}','{timestamp}','{content}','{image_path}', 1)")
            connect.commit()
        except:
            DTOData = ModelInterface("BAD_QUERY_RESPONSE")
            return DTOData     
        DTOData = ModelInterface("SUCCESS_QUERY_RESPONSE")
        return DTOData        
 


    async def modelPublicacionLlamar():
        try:
            connect, query = await database_load()
            query.execute("SELECT pk_post, fg_user, post_title, post_date, post_content, post_urlimage, post_status FROM db_post ORDER BY post_date DESC")
            resultData = query.fetchall()
            connect.commit()
        except Exception as e:
            print(f"[Error] modelPublicacionLlamar: {e}")
            return ModelInterface("BAD_QUERY_RESPONSE")
        publicaciones = []
        for row in resultData:
            pk_post, fg_user, post_title, post_date, post_content, post_urlimage, post_status = row
            publicaciones.append({
                "post_user": fg_user,
                "post_title": post_title,
                "post_content": post_content,
                "post_date": post_date.isoformat(),
                "post_urlimage": post_urlimage
            })
        return ModelInterface(publicaciones)
        
     

