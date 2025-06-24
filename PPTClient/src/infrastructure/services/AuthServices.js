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


    /*
    us_pk, us_verified, us_name, us_password, us_cedula, us_ubicacion, us_email, us_phone, us_estado, us_adm, imageUrl 
    */
    Session.start("user_information", {
      payload: {
        user_id: data[0][0],
        user_name: data[0][2],
        user_cedula: data[0][4],
        user_ubicacion: data[0][5],
        user_email: data[0][6],
        user_phone: data[0][7],
        user_estado: data[0][8],
        user_admin: data[0][9],
        user_image: data[0][10]
      },
    });
    if(data[0][1] == 0) return cursorNotification.notificationError(
        "Esta cuenta no tiene autorizacion al sistema.",
        window.location,
        0
      );
    window.location.href = "/dashboard/home";
  }

  // Servicio de registro
  /*
      return { email, name, password, passwordconfirm, tlfchange, name, number, controlUbicacion, category };

  */
  async servicesHandleRegister(DTOData) {
    this.DTOData = DTOData;
    this.email = this.DTOData.email;
    this.name = this.DTOData.name;
    this.password = this.DTOData.password;
    this.tlfchange = this.DTOData.tlfchange;
    this.cedula = this.DTOData.numberdata;
    this.ubicacion = this.DTOData.controlUbicacion;
    this.estado = this.DTOData.category;
    await fetch(`${router.routerAuth.registro}`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        email: this.email,
        name: this.name,
        password: this.password,
        telefono: this.tlfchange,
        name: this.name,
        cedula: this.cedula,
        ubicacion: this.ubicacion,
        estado: this.estado,
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
