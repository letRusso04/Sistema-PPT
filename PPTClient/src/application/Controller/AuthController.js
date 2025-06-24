import { AuthServices } from "../../infrastructure/services/AuthServices";

import { Session } from "bc-react-session";

import { GenerateNotification } from "../Utilities/ToastAlert";

const cursorServices = new AuthServices();
const cursorNotification = new GenerateNotification();
export class AuthController {
  constructor() {}
  async controllerHandleSubmit(DTOData) {
    try {
      cursorNotification.notificationInfo(
        "Verificando sesión, espere un momento."
      );
      await cursorServices.servicesHandleSubmit(DTOData);
    } catch (err) {
      cursorNotification.notificationError(
        "El proceso ha fallado, intenta más tarde.",
        window.location,
        1
      );
      console.error(`Ha sucedido un error: ${err}`);
    }
  }
  async controllerCallAccount(clientID) {
    try {
      return await cursorServices.callbackServicesCallListUser(clientID);
    } catch (err) {
      cursorNotification.notificationError(
        "El proceso ha fallado, intenta más tarde.",
        window.location,
        1
      );
      console.error(`Ha sucedido un error: ${err}`);
    }
  }



  
  /*
    return { email, name, password, passwordconfirm, tlfchange, name, number, controlUbicacion, category };
  
  */
  async controllerRegister(DTOController) {
    this.DTOController = DTOController;
    try {
      var validateThis = require("validator");
      if (
        validateThis.isEmpty(this.DTOController.name) ||
        validateThis.isEmpty(this.DTOController.email) ||
        validateThis.isEmpty(this.DTOController.tlfchange) ||
        validateThis.isEmpty(this.DTOController.password) ||
        validateThis.isEmpty(this.DTOController.passwordconfirm) ||
        validateThis.isEmpty(this.DTOController.numberdata) ||
        validateThis.isEmpty(this.DTOController.controlUbicacion)||
        validateThis.isEmpty(this.DTOController.category)
      ) {
        cursorNotification.notificationError(
          "Dejaste campos vacíos en el registro.",
          window.location,
          0
        );
        return;
      }

      if (!validateThis.isEmail(this.DTOController.email)) {
        cursorNotification.notificationError(
          "El email introducido es inválido."
        );
        return;
      }

      const pattern = new RegExp("^[A-ZÑa-zñáéíóúÁÉÍÓÚ'° ]+$");
      if (!pattern.test(this.DTOController.name)) {
        cursorNotification.notificationError(
          "No se permiten números en el nombre del propietario.",
          window.location,
          0
        );
        return;
      }
      if (
        !validateThis.isStrongPassword(this.DTOController.password, {
          minLength: 8,
          minLowercase: 1,
          minUppercase: 0,
          minNumbers: 0,
          minSymbols: 0,
        })
      ) {
        cursorNotification.notificationError(
          "La contraseña introducida es inválida, revisa que tenga minimo 8 caracteres, una minuscula.",
          window.location,
          0
        );
        return;
      }
      if (
        !validateThis.equals(
          this.DTOController.password,
          this.DTOController.passwordconfirm
        )
      ) {
        cursorNotification.notificationError(
          "Las contraseñas no coinciden, verifica escribiendola de nuevo.",
          window.location,
          0
        );
        return;
      }

      await cursorServices.servicesHandleRegister(this.DTOController);
    } catch (err) {
      cursorNotification.notificationError(
        "El proceso ha fallado, intenta más tarde.",
        window.location,
        1
      );

      console.error(`Ha sucedido un error: ${err}`);
    }
  }
  async controllerUserRegister(DTOController) {
    this.DTOController = DTOController;
    var validateThis = require("validator");
    if (
      validateThis.isEmpty(this.DTOController.globalUser) ||
      validateThis.isEmpty(this.DTOController.name) ||
      validateThis.isEmpty(this.DTOController.number) ||
      validateThis.isEmpty(this.DTOController.selectedOption) ||
      validateThis.isEmpty(this.DTOController.timeDesing)
    ) {
      cursorNotification.notificationError(
        "Debes llenar todos los campos que son obligatorios.",
        window.location,
        0
      );
      return;
    }
    const pattern = new RegExp("^[A-ZÑa-zñáéíóúÁÉÍÓÚ'° ]+$");
    if (!pattern.test(this.DTOController.name)) {
      cursorNotification.notificationError(
        "No se permiten números en el nombre del usuario.",
        window.location,
        0
      );
      return;
    }
    if(!validateThis.isEmpty(this.DTOController.password)){
      if (
        !validateThis.isStrongPassword(this.DTOController.password, {
          minLength: 3,
          minLowercase: 0,
          minUppercase: 0,
          minNumbers: 0,
          minSymbols: 0,
        })
      ) {
        cursorNotification.notificationError(
          "La contraseña introducida es inválida, revisa que tenga minimo 3 caracteres.",
          window.location,
          0
        );
        return;
      }




      await cursorServices.servicesHandleRegisterUser(this.DTOController);
    }
  }
  async getAccountSession(userId, name, password){
    Session.destroy();
    Session.start("account_information", {
      payload: {
        globalUser: this.globalUser,
        name: name,
        password: password,
        number: "",
        selectedOption: "",
        timeDesing: "",
        id: userId,
      },
    });
    window.location.href = "/dashboard/home";
  }
}


