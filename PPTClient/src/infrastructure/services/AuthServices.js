import { Session } from "bc-react-session";
import "react-toastify/dist/ReactToastify.css";
import { GlobalAPIRouter } from "../router/ServicesRouter";
import { v4 as uuid } from "uuid";
import { GenerateNotification } from "../../application/Utilities/ToastAlert";

const session = Session.get("user_information");
let user_id = session.payload["user_id"];

let cursorNotification = new GenerateNotification();
let router = new GlobalAPIRouter();
export class AuthServices {
  constructor() {}
  // Servicio cuando se registra
  async servicesHandleSubmit(DTOData) {
    this.DTOData = DTOData;
    this.email = this.DTOData.email;
    this.password = this.DTOData.password;
    const response = await fetch(`${router.routerAuth.inicio}`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        email: this.email,
        password: this.password,
      }),
    });
    Session.destroy("user_business");
    Session.destroy("user_information");
    const data = await response.json();
    if (data == "false" || data == false) {
      cursorNotification.notificationError(
        "La información introducida es inválida, por favor verifica los datos.",
        window.location,
        0
      );
      return;
    }
    Session.start("user_information", {
      payload: {
        user_email: data[0][0],
        user_id: data[0][1],
        user_verified: data[0][2],
        user_name: data[0][3],
        user_bussinesName: data[0][4],
        user_subname: data[0][5],
      },
    });
    window.location.href = "/usuarios";
  }

  // Servicio de registro
  async servicesHandleRegister(DTOData) {
    this.DTOData = DTOData;
    this.email = this.DTOData.email;
    console.log(this.DTOData.email);
    this.name = this.DTOData.name;
    this.password = this.DTOData.password;
    this.businessName = this.DTOData.businessName;
    this.id = uuid();
    await fetch(`${router.routerAuth.registro}`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        email: this.email,
        name: this.name,
        password: this.password,
        businessName: this.businessName,
        id: this.id,
      }),
    });
    window.location.href = "/inicio";
  }
  // Servicio cuando se crea el usuario.
  async servicesHandleRegisterUser(DTOData) {
    this.DTOData = DTOData;
    this.globalUser = this.DTOData.globalUser;
    this.name = this.DTOData.name;
    this.password = this.DTOData.password;
    this.number = this.DTOData.number;
    this.selectedOption = this.DTOData.selectedOption;
    this.timeDesing = this.DTOData.timeDesing;
    this.id = uuid();
    await fetch(`${router.routerAuth.registroCuenta}`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        globalUser: this.globalUser,
        name: this.name,
        password: this.password,
        number: this.number,
        selectedOption: this.selectedOption,
        timeDesing: this.timeDesing,
        id: this.id,
        userId: user_id,
      }),
    });
    window.location.href = "/usuarios";
  }
  async callbackServicesCallListUser(clientID) {
    this.clientID = clientID;
    const response = await fetch(`${router.routerAuth.llamarCuenta}`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        clientID: this.clientID,
      }),
    });
    const data = await response.json();
    let NavigationModal = Array(0);
    data.forEach((element) => {
      NavigationModal.push({
        name: element[2],
        date: "10 DE MAYO de 2025",
        password: element[3],
        number: element[4],
        gener: element[5],
        lastConnection: element[7],
        country: element[6],
        description: "Desarrollador de la aplicación",
        userId: element[1],
        category: {
          permissionsLabel: "Administrativo",
          permissionsLevel: 4,
        },
        images: {
          imageUrl: "image.url",
          imageFondUrl: "imageFond.url",
        },
      });
    });
    return NavigationModal;
  }
}
/*
fg_main, ac_id, ac_name, ac_password, ac_number, ac_gener, ac_ubicacion, ac_date
*/
/*
export const servicesHandleResform = async (DTOResform) => {
  let select = DTOResform.selectedOption.value;
  let seudonimo = DTOResform.seudonimo;
  let date = DTOResform.date;
  let numero = DTOResform.number;
  let emailIsValid = DTOResform.emailIsValid;
  await fetch(`${router.routerAuth.segundoRegistro}`, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({
      seudonimo,
      date,
      select,
      numero,
      emailIsValid,
    }),
  }).then(() => {
    Session.setPayload({
      user_verified: "2",
    });
  });
};

export const servicesHandleGenerateToken = async (DTOGenerate) => {
  let generateToken = Math.random().toString(36).substring(2);
  let emailIsValid = DTOGenerate.emailIsValid;
  await fetch(`${router.routerAuth.generarToken}`,{
      method: 'POST',
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify({
         generateToken,
         emailIsValid
      })
    }) 
}
export const servicesHandleControlToken = async(DTOControl)=>{
  let token = DTOControl.token;
  if(token.length >= 10){
      const response = await fetch(`${router.routerAuth.confirmarToken}`,{
          method: 'POST',
          headers: {'Content-type': 'application/json'},
          body: JSON.stringify({
              emailIsValid,
              token
          })
        })
        let data = await response.json();    
        return data;
  }
}*/
