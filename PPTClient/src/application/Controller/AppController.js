import {
  AppServices,
  AppGetContent,
} from "../../infrastructure/services/AppServices";
import { Session } from "bc-react-session";
import { GenerateNotification } from "../../application/Utilities/ToastAlert";
import { FecthRepository, ClientRepositoryServices} from "../../infrastructure/Repository/fetchRepository";
const cursorServices = new AppServices();
const getcursorServices = new AppGetContent();
const cursorNotification = new GenerateNotification();
export class AppController {
  constructor() {}
  async controllerMessage(DTOData) {
    try {
      cursorNotification.notificationInfo(
        "Se ha enviado el mensaje a la inteligencia, espere un momento."
      );
      console.log(DTOData);
      if (!DTOData.friend) {
        await cursorServices.servicesHandleAI(DTOData);
      } else if (!DTOData.chatbot) {
        await cursorServices.servicesMessage(DTOData);
      }
    } catch (err) {
      cursorNotification.notificationError(
        "El proceso ha fallado, intenta más tarde.",
        window.location,
        1
      );
      console.error(`Ha sucedido un error: ${err}`);
    }
  }
}
/*{ message, chatbot, friend, userid}; */
export class AppGetDataController {
  constructor() {}
  async getMessageBotController(DTOData) {
    try {
      return await getcursorServices.servicesGetMessageBot(DTOData);
    } catch (err) {
      cursorNotification.notificationError(
        "El proceso ha fallado, intenta más tarde.",
        window.location,
        1
      );
      console.error(`Ha sucedido un error: ${err}`);
    }
  }
  async getMessageController(DTOData) {
    try {
      return await getcursorServices.servicesGetMessage(DTOData);
    } catch (err) {
      cursorNotification.notificationError(
        "El proceso ha fallado, intenta más tarde.",
        window.location,
        1
      );
      console.error(`Ha sucedido un error: ${err}`);
    }
  }

  async getAccountList(DTOData) {
    try {
      return await getcursorServices.servicesGetMessageBot(DTOData);
    } catch (err) {
      cursorNotification.notificationError(
        "El proceso ha fallado, intenta más tarde.",
        window.location,
        1
      );
      console.error(`Ha sucedido un error: ${err}`);
    }
  }
}
let cursorFecthRepository = new FecthRepository();
export class UserControllerRepository {
  constructor() {}
  async controllerCreateBusiness(DTOData) {
    try {
      await cursorFecthRepository.servicesCreateBusiness(DTOData);
    } catch (err) {
      console.error(`Ha sucedido un error: ${err}`);
    }
  }
  async controllerCallUser(userId) {
    try {
      return await cursorFecthRepository.servicesGetUser(userId);
    } catch (err) {
      cursorNotification.notificationError(
        "El proceso ha fallado, intenta más tarde.",
        window.location,
        1
      );
      console.error(`Ha sucedido un error: ${err}`);
    }
  }
}