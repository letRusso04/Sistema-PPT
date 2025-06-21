import os
from email.message import EmailMessage
import ssl
import smtplib
#Los datos traidos de esta carpeta será oculta, no estará disponible para el resto de usuarios.
from environment.env import EnviromentPython
tokenInformation = EnviromentPython()

class DanEmailServices:
    def SendEmailToken(email_to, generateToken):
        if(email_to == None):
            return 'ok'
        email_be = tokenInformation.emailData
        email_pass = tokenInformation.emailPass
        email_header = 'Verificación de Correo electrónico - DANTEAI2024'
        email_body = f""" <div style="margin: 0; padding: 0; word-spacing: normal; background-color: #000000;">
        <table style="width: 100%; border: none; border-spacing: 0;">
            <tr>
                <td style="padding: 0; align-items: center;">
                </td>
            </tr>
        </table>
        <table style="width: 94%; max-width: 900px; border: none; border-spacing: 0; text-align: left; font-size: 16px; line-height: 22px; color: #363636;">
            <tr>
                <td style="padding:40px 30px 30px 30px; text-align:center; font-size:24px; font-weight: bold;">
                    <img src="https://i.imgur.com/JBnzajP.png" width="165" alt="Logo" style="width: 165px; max-width:80%; height:auto;  ">
                    <h1 style="color: ghostwhite; margin-left: 1%; text-align: center; font-family: Arial,sans-serif;">DanteIA2024<hr style="color: aliceblue; margin-top: 5%;"></h1>
                </td>
            </tr>
            <tr>
                <td style="padding: 30px; ">
                    <h1 style="margin-top: 0; margin-bottom: 16px; font-size: 26px; line-height: 32px; font-weight: bold; letter-spacing: -0.02em; color: aliceblue; font-family: Arial,sans-serif;">Bienvenido a DANTEAI2024</h1>
                    <h3 style="margin:0; color: aliceblue; font-family: Arial,sans-serif;">¡Te damos la bienvenida! Para activar por favor ingresa el siguiente token desde tu aplicación.</h3>
                </td>
            </tr>
            <tr>
                <td style="justify-content: center; display: flex; margin-top: 3%; margin-bottom: 3%;">
                    <h1 type="submit" style="position: relative; display: inline-block; height: 50px; border-radius: 10px; width: 300px; border: none; font-size: 40px; color: rgb(255, 255, 255); text-align: center; font-family: Arial,sans-serif;" value="Verificar">{generateToken}</h1>
                </td>
            </tr>
            <tr>
                <td style="padding: 30px; text-align: center; font-size: 12px;">
                    <hr style="color: aliceblue;">
                </td>
            </tr>
        </table>
        </div>
        """
        message_ready = EmailMessage()
        message_ready['From'] = email_be
        message_ready['To'] = email_to
        message_ready['Subject'] = email_header
        message_ready.set_content(email_body, subtype="html")
        context  = ssl.create_default_context()
        with smtplib.SMTP_SSL('smtp.gmail.com', 465, context= context) as smtp:
            smtp.login(email_be, email_pass)
            smtp.sendmail(email_be, email_to, message_ready.as_string())
