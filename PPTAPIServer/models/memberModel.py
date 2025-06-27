
from database.danQuery import database_load
from Interface.modelInterface import ModelInterface
class MemberModel:
    async def modelCallMember():
        try:
            (connect, query)= await database_load()
            query.execute(f"SELECT us_pk, us_verified, us_name,  us_cedula, us_ubicacion, us_email, us_phone, us_estado, us_adm, imageUrl FROM db_main")
            resultData = query.fetchall()
            connect.commit()
        except:
            DTOData = ModelInterface("BAD_QUERY_RESPONSE")
            return DTOData
        DTOData = ModelInterface(resultData)
        return DTOData

    async def modelAcceptMember(iduser):
        try:
            (connect, query)= await database_load()
            query.execute(f"UPDATE db_main SET us_verified='1' WHERE us_pk = '{iduser}'")
            connect.commit()
        except:
            DTOData = ModelInterface("BAD_QUERY_RESPONSE")
            return DTOData   
        DTOData = ModelInterface("SUCCESS_QUERY_RESPONSE")
        return DTOData                   

    async def modelKickMember(iduser):
        try:
            connect, query = await database_load()
            # Elimina mensajes donde el usuario aparece como emisor o receptor
            query.execute("DELETE FROM db_message WHERE fg_user = %s OR fg_touser = %s", (iduser, iduser))
            # Elimina el usuario de db_main
            query.execute("DELETE FROM db_main WHERE us_pk = %s", (iduser,))
            connect.commit()
        except Exception as e:
            print("ERROR:", e)
            return ModelInterface("BAD_QUERY_RESPONSE")
        
        return ModelInterface("DELETE_QUERY_RESPONSE")
                   
    async def modelChangeMember(iduser, rol, correo, cedula, estado, ubicacion, telefono):
        try:
            (connect, query)= await database_load()
            query.execute(f"UPDATE db_main SET us_cedula='{cedula}',us_ubicacion='{ubicacion}',us_email='{correo}',us_phone='{telefono}',us_estado='{estado}',us_adm='{rol}' WHERE us_pk = '{iduser}'")
            connect.commit()
        except:
            DTOData = ModelInterface("BAD_QUERY_RESPONSE")
            return DTOData   
        DTOData = ModelInterface("SUCCESS_QUERY_RESPONSE")
        return DTOData           





    # async def modelSearchMember(searchUser, userId):
    #     try:
    #         (connect, query)= await database_load()
    #         query.execute(f"SELECT us_userid, us_name, us_lastname, us_subname FROM dan_user WHERE (us_name LIKE '{searchUser}%' OR us_userid LIKE '{searchUser}%') && us_userid != '{userId}'")
    #         resultData = query.fetchall()
    #         connect.commit()
    #     except:
    #         DTOData = ModelInterface("BAD_QUERY_RESPONSE")
    #         return DTOData    
    #     DTOData = ModelInterface(resultData)
    #     return DTOData                         

    # async def modelInviteMember(userId, userIdInvite, inviteType, inviteStatus):
    #     try:
    #         (connect, query)= await database_load()
    #         query.execute(f"INSERT INTO dan_invite(fg_byuser, fg_inviteuser, invite_type, invite_status) VALUES ('{userId}', '{userIdInvite}', '{inviteType}', '{inviteStatus}')")
    #         connect.commit()
    #     except:
    #         DTOData = ModelInterface("BAD_QUERY_RESPONSE")
    #         return DTOData  
    #     DTOData = ModelInterface("SUCCESS_QUERY_RESPONSE")
    #     return DTOData                          

    # async def modelInviteBusinessMember(idBusiness, userId, userIdInvite, inviteType, inviteStatus):
    #     try: 
    #         (connect, query)= await database_load()
    #         query.execute(f"INSERT INTO dan_invite(fg_byuser, fg_inviteuser, invite_type, invite_status, invite_business) VALUES ('{userId}', '{userIdInvite}', '{inviteType}', '{inviteStatus}', '{idBusiness}')")
    #         connect.commit()
    #     except:
    #         DTOData = ModelInterface("BAD_QUERY_RESPONSE")
    #         return DTOData  
    #     DTOData = ModelInterface("SUCCESS_QUERY_RESPONSE")
    #     return DTOData                      

    # async def modelSearchInvitesMember(getUserInvite):
    #     try:
    #         (connect, query)= await database_load()
    #         query.execute(f"SELECT us.us_name, us.us_lastname, us.us_userid, inv.invite_type, inv.invite_business  FROM dan_user as us, dan_invite as inv WHERE inv.fg_inviteuser = '{getUserInvite}' AND inv.fg_byuser = us.us_userid AND inv.invite_status = 1")
    #         resultData = query.fetchall()
    #         connect.commit()
    #     except:
    #         DTOData = ModelInterface("BAD_QUERY_RESPONSE")
    #         return DTOData  
    #     DTOData = ModelInterface(resultData)
    #     return DTOData                     

    # async def modelDeleteInvitesMember(getUserByInvite, getUserToInvite):
    #     try:
    #         (connect, query)= await database_load()
    #         query.execute(f"DELETE FROM dan_invite WHERE fg_byuser = '{getUserToInvite}' && fg_inviteuser = '{getUserByInvite}'")
    #         connect.commit()
    #     except:
    #         DTOData = ModelInterface("BAD_QUERY_RESPONSE")
    #         return DTOData       
    #     DTOData = ModelInterface("DELETE_QUERY_RESPONSE")
    #     return DTOData    

    # async def modelDeleteInvitesBusiness(getUserByInvite, idNegocio):
    #     try:
    #         (connect, query)= await database_load()
    #         query.execute(f"DELETE FROM dan_invite WHERE invite_business = '{idNegocio}' && fg_inviteuser = '{getUserByInvite}'")
    #         connect.commit()
    #     except:
    #         DTOData = ModelInterface("BAD_QUERY_RESPONSE")
    #         return DTOData  
    #     DTOData = ModelInterface("DELETE_QUERY_RESPONSE")
    #     return DTOData                      

    # async def modelAcceptInvitesMember(getUserByInvite, getUserToInvite):
    #     try:
    #         (connect, query)= await database_load()
    #         query.execute(f"DELETE FROM dan_invite WHERE fg_byuser = '{getUserToInvite}' && fg_inviteuser = '{getUserByInvite}'")
    #         connect.commit()
    #         query.execute(f"INSERT INTO dan_friendlist(friend_byuser, friend_touser, friend_status) VALUES ('{getUserByInvite}', '{getUserToInvite}', 1)")
    #         connect.commit()
    #     except:
    #         DTOData = ModelInterface("BAD_QUERY_RESPONSE")
    #         return DTOData  
    #     DTOData = ModelInterface("DELETE_QUERY_RESPONSE")
    #     return DTOData                      

    # async def modelAcceptInvitesBusiness(getUserByInvite, idNegocio):
    #     try:
    #         (connect, query)= await database_load()
    #         query.execute(f"DELETE FROM dan_invite WHERE invite_business = '{idNegocio}' && fg_inviteuser = '{getUserByInvite}'")
    #         connect.commit()
    #         query.execute(f"INSERT INTO dan_com_user(fg_company, fg_user, cous_range) VALUES ('{idNegocio}','{getUserByInvite}', 0)")
    #         connect.commit()
    #     except:
    #         DTOData = ModelInterface("BAD_QUERY_RESPONSE")
    #         return DTOData
    #     DTOData = ModelInterface("DELETE_QUERY_RESPONSE")
    #     return DTOData            

    # async def modelSearchListFriend(getUserInvite):
    #     try:
    #         (connect, query)= await database_load()
    #         query.execute(f"SELECT us.us_userid, friend.friend_status, us.us_name, us.us_lastname FROM dan_friendlist as friend, dan_user as us WHERE (friend.friend_byuser = '{getUserInvite}' OR friend.friend_touser = '{getUserInvite}') AND (us.us_userid = friend.friend_byuser OR us.us_userid = friend.friend_touser) AND us.us_userid != '{getUserInvite}'")
    #         resultData = query.fetchall()
    #         connect.commit()
    #     except:
    #         DTOData = ModelInterface("BAD_QUERY_RESPONSE")
    #         return DTOData
    #     DTOData = ModelInterface(resultData)
    #     return DTOData                       

    # async def modelLoadName(userFriend):
    #     try:
    #         (connect, query)= await database_load()
    #         query.execute(f"SELECT us_name, us_lastname FROM dan_user WHERE us_userid = '{userFriend}'")
    #         resultData = query.fetchall()
    #         connect.commit()
    #     except:
    #         DTOData = ModelInterface("BAD_QUERY_RESPONSE")
    #         return DTOData     
    #     DTOData = ModelInterface(resultData)
    #     return DTOData             

    # async def modelViewData(idUser):
    #     try:
    #         (connect, query)= await database_load()   
    #         query.execute(f"SELECT us_password FROM dan_user WHERE us_userid = '{idUser}'")
    #         resultData = query.fetchall()
    #         connect.commit()
    #     except:
    #         DTOData = ModelInterface("BAD_QUERY_RESPONSE")
    #         return DTOData 
    #     DTOData = ModelInterface(resultData)
    #     return DTOData                    

    # async def modelChangeData(idUser, newPassword):
    #     try:
    #         (connect, query)= await database_load()
    #         query.execute(f"UPDATE dan_user SET us_password='{newPassword}' WHERE us_userid = '{idUser}'")
    #         connect.commit()
    #     except:
    #         DTOData = ModelInterface("BAD_QUERY_RESPONSE")
    #         return DTOData        
    #     DTOData = ModelInterface("SUCCESS_QUERY_RESPONSE")
    #     return DTOData        