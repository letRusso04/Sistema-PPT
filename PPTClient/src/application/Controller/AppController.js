import {
  AppServices,
  AppGetContent,
} from "../../infrastructure/services/AppServices";
import { Session } from "bc-react-session";
import { GenerateNotification } from "../../application/Utilities/ToastAlert";
import { BusinessRepository, ProductRepository, ClientRepositoryServices} from "../../infrastructure/Repository/BusinessRepository";
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
let cursorBusinessRepository = new BusinessRepository();
export class BusinessControllerRepository {
  constructor() {}
  async controllerCreateBusiness(DTOData) {
    try {
      await cursorBusinessRepository.servicesCreateBusiness(DTOData);
    } catch (err) {
      console.error(`Ha sucedido un error: ${err}`);
    }
  }
  async controllerCallBusines(userId) {
    try {
      return await cursorBusinessRepository.servicesGetBussines(userId);
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
let cursorProduct = new ProductRepository();
export class ProductControllerRepository{
  constructor() {}
  async controllerCreateProduct(DTOData) {
    try {
      await cursorProduct.servicesCreateProduct(DTOData);
    } catch (err) {
      console.error(`Ha sucedido un error: ${err}`);
    }
  }
  async controllerCallProduct(DTOData) {
    try {
      return await cursorProduct.servicesGetProduct(DTOData);
    } catch (err) {
      console.error(`Ha sucedido un error: ${err}`);
    }
  }
  async controllerCallProductID(DTOData) {
    try {
      return await cursorProduct.servicesGetProductID(DTOData);
    } catch (err) {
      console.error(`Ha sucedido un error: ${err}`);
    }
  }
  async controllerChangeProduct(DTOData) {
    try {
      return await cursorProduct.servicesChangeProduct(DTOData);
    } catch (err) {
      console.error(`Ha sucedido un error: ${err}`);
    }
  }
  async controllerDeleteProduct(DTOData) {
    try {
      return await cursorProduct.servicesDeleteProduct(DTOData);
    } catch (err) {
      console.error(`Ha sucedido un error: ${err}`);
    }
  }
}
let cursorClient = new ClientRepositoryServices();
export class ClientControllerRepository{
  async controllerCreateClient(DTOData) {
    try {
      await cursorClient.servicesCreateClient(DTOData);
    } catch (err) {
      console.error(`Ha sucedido un error: ${err}`);
    }
  }
  async controllerCallClient(DTOData) {
    try {
      return await cursorClient.servicesGetClient(DTOData);
    } catch (err) {
      console.error(`Ha sucedido un error: ${err}`);
    }
  }
  async controllerCallClientID(DTOData) {
    try {
      return await cursorClient.servicesGetClientID(DTOData);
    } catch (err) {
      console.error(`Ha sucedido un error: ${err}`);
    }
  }
  async controllerChangeClient(DTOData) {
    try {
      return await cursorClient.servicesChangeClient(DTOData);
    } catch (err) {
      console.error(`Ha sucedido un error: ${err}`);
    }
  }
  async controllerDeleteClient(DTOData) {
    try {
      return await cursorClient.servicesDeleteClient(DTOData);
    } catch (err) {
      console.error(`Ha sucedido un error: ${err}`);
    }
  }
}