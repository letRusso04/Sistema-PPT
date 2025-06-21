from database.danQuery import database_load
import time
from Interface.modelInterface import ModelInterface
class BusinessModel:
    async def modelCreateBusiness(userId, nombre, ubicacion, rif, numero):
       try:
            (connect, query)= await database_load()
            query.execute(f"INSERT INTO dan_shop(fg_main, shop_name, shop_location, shop_rif, shop_number) VALUES ('{userId}','{nombre}','{ubicacion}','{rif}','{numero}')")
            connect.commit()
            DTOData = ModelInterface("SUCCESS_QUERY_RESPONSE")
            return DTOData
       except: 
            DTOData = ModelInterface("BAD_QUERY_RESPONSE")
            return DTOData 

    async def modelCallBusiness(getUserId):
        try:
            (connect, query)= await database_load()
            query.execute(f"SELECT pk_shop, shop_name, shop_location, shop_rif, shop_number FROM dan_shop WHERE fg_main = '{getUserId}'")
            resultData = query.fetchall()
            connect.commit()
        except:
            DTOData = ModelInterface("BAD_QUERY_RESPONSE")
            return DTOData 
        DTOData = ModelInterface(resultData)
        return DTOData 

    async def modelQueryBusiness(idNegocio):
        try:
            (connect, query)= await database_load()
            query.execute(f"SELECT com_name, com_dueno, com_tel, com_rif, com_date, com_info, com_ubi FROM dan_company WHERE pk_company = '{idNegocio}'")
            resultData = query.fetchall()
            connect.commit()
        except:
            DTOData = ModelInterface("BAD_QUERY_RESPONSE")
            return DTOData 
        DTOData = ModelInterface(resultData)
        return DTOData  

    async def modelDeleteBusiness(idBusiness):
        try:
            (connect, query)= await database_load()
            query.execute(f"DELETE FROM dan_company WHERE pk_company = '{idBusiness}'")
            query.execute(f"DELETE FROM dan_com_user WHERE fg_company = '{idBusiness}'")
            connect.commit()
        except:
            DTOData = ModelInterface("BAD_QUERY_RESPONSE")
            return DTOData  
        DTOData = ModelInterface("DELETE_QUERY_RESPONSE")
        return DTOData            

    async def modelGenerateReport(callsentProduct, nameUser, IdBusiness, nameClient, reportUid):
        try:
            (connect, query)= await database_load()
            query.execute(f"INSERT INTO dan_report(report_uid,report_client, report_user, report_company) VALUES ('{reportUid}','{nameClient}', '{nameUser}', '{IdBusiness}')")
            connect.commit()
            time.sleep(1)
            query.execute(f"SELECT report_id FROM dan_report WHERE report_client = '{nameClient}' && report_uid = '{reportUid}'")
            resultData = query.fetchall()
            if resultData == [] or resultData == False or len(resultData) <= 0:
                DTOData = ModelInterface("EMPTY_QUERY_RESPONSE")
                return DTOData
            for data in callsentProduct: 
                query.execute(f"INSERT INTO dan_invoice(re_invoice, re_idproduct, re_nameProduct, re_currencyProduct, re_varTotal, re_amount) VALUES ('{resultData[0][0]}', '{data['idProduct']}', '{data['nameProduct']}', '{data['currencyProduct']}', '{data['varTotal']}', '{data['varStock']}')")
                query.execute(f"UPDATE dan_product SET pr_amount= (pr_amount - '{data['varStock']}') WHERE pr_name = '{data['nameProduct']}' && pk_product = '{data['idProduct']}'")
                time.sleep(1)
            connect.commit()
        except: 
            DTOData = ModelInterface("BAD_QUERY_RESPONSE")
            return DTOData 
        DTOData = ModelInterface("SUCCESS_QUERY_RESPONSE")
        return DTOData
    
    async def modelSearchReport(idBusiness):
        try:
            (connect, query)= await database_load() 
            query.execute(f"SELECT rep.report_id, rep.report_client, rep.report_company, us.us_name, us.us_lastname, rep.report_date, client.cli_phone, client.cli__cid FROM dan_report as rep, dan_user as us, dan_client as client WHERE rep.report_user = us.us_userid && rep.report_client = client.cli_name && rep.report_company = '{idBusiness}' ORDER BY rep.report_id DESC")
            resultData = query.fetchall()
            connect.commit()
        except:
            DTOData = ModelInterface("BAD_QUERY_RESPONSE")
            return DTOData 
        DTOData = ModelInterface(resultData)
        return DTOData 

    async def modelSearchReportID(idReportData):
        try:
            (connect, query)= await database_load()     
            query.execute(f"SELECT re_idproduct, re_nameProduct, re_currencyProduct, re_varTotal, re_amount, client.cli_name, client.cli__cid, client.cli_phone, client.cli_payment, client.cli_address, re.report_company, re.report_date FROM dan_invoice as invo, dan_report as re, dan_client as client WHERE re_invoice = '{idReportData}' && re.report_client = client.cli_name && invo.re_invoice = re.report_id")
            resultData = query.fetchall()
            connect.commit()
        except:
            DTOData = ModelInterface("BAD_QUERY_RESPONSE")
            return DTOData 
        DTOData = ModelInterface(resultData)
        return DTOData                  

    async def modelGetGlobal(idBusiness):
        try:
            (connect, query)= await database_load() 
            query.execute(f"SELECT COUNT(cli_name) FROM dan_client WHERE fg_company = '{idBusiness}'");
            clienteData = query.fetchall()
            query.execute(f"SELECT SUM(invo.re_varTotal) FROM dan_invoice as invo, dan_report as re WHERE invo.re_invoice = re.report_id && re_currencyProduct = 'dolares' && report_company = '{idBusiness}'");
            dolaresTotalData = query.fetchall()
            query.execute(f"SELECT SUM(invo.re_varTotal) FROM dan_invoice as invo, dan_report as re WHERE invo.re_invoice = re.report_id && re_currencyProduct = 'pesos' && report_company = '{idBusiness}'");
            pesosTotalData = query.fetchall()
            query.execute(f"SELECT SUM(invo.re_varTotal) FROM dan_invoice as invo, dan_report as re WHERE invo.re_invoice = re.report_id && re_currencyProduct = 'bolivares' && report_company = '{idBusiness}'");
            bolivaresTotalData = query.fetchall()
            query.execute(f"SELECT SUM(invo.re_varTotal) FROM dan_invoice as invo, dan_report as re WHERE re.report_date = curdate() && invo.re_invoice = re.report_id && re.report_company = '{idBusiness}' && invo.re_currencyProduct = 'dolares'");
            dolaresDiarios = query.fetchall()
            query.execute(f"SELECT SUM(invo.re_varTotal) FROM dan_invoice as invo, dan_report as re WHERE re.report_date = curdate() && invo.re_invoice = re.report_id && re.report_company = '{idBusiness}' && invo.re_currencyProduct = 'bolivares'");
            bolivaresDiarios = query.fetchall()
            query.execute(f"SELECT SUM(invo.re_varTotal) FROM dan_invoice as invo, dan_report as re WHERE re.report_date = curdate() && invo.re_invoice = re.report_id && re.report_company = '{idBusiness}' && invo.re_currencyProduct = 'pesos'");
            pesosDiarios = query.fetchall()
            query.execute(f"SELECT SUM(invo.re_amount) FROM dan_invoice as invo, dan_report as re WHERE re.report_date = curdate() && invo.re_invoice = re.report_id && re.report_company = '{idBusiness}'");
            productosDiarios = query.fetchall()
            connect.commit()
            sendJSONData = [clienteData, dolaresTotalData, pesosTotalData,bolivaresTotalData,  dolaresDiarios, pesosDiarios, bolivaresDiarios, productosDiarios];
        except: 
            DTOData = ModelInterface("BAD_QUERY_RESPONSE")
            return DTOData 
        DTOData = ModelInterface(sendJSONData)
        return DTOData   
            