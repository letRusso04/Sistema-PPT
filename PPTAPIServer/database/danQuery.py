import mysql.connector


#Realizando conexión con base de Datos, recogiendo singularidades de errores.
async def database_load():
    try:
        connect = mysql.connector.connect(host="localhost", user="root", password="", database="db_sql")
        query = connect.cursor(buffered=True)
        if connect.is_connected():
            print('Se ha realizado una consulta con el servidor.')
        return (connect, query)
    except: 
        return 'Ha ocurrido un grave error.'