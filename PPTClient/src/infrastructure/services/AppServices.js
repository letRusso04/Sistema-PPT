import { Session } from "bc-react-session";
import "react-toastify/dist/ReactToastify.css";
import { GlobalAPIRouter } from "../router/ServicesRouter";
import { v4 as uuid } from "uuid";
import { GenerateNotification } from "../../application/Utilities/ToastAlert";
import { useDispatch } from "react-redux";
import { addMessage } from "../../domain/redux/Slices/MessageBot";
const session = Session.get("user_information");
let user_id = session.payload["user_id"];
let cursorNotification = new GenerateNotification();
let router = new GlobalAPIRouter();

export class AppServices {
  constructor() {}
  async servicesHandleAI(DTOData) {
    this.DTOData = DTOData;
    let response = await fetch(`${router.routerMessage.callBot}`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        message: this.DTOData.message,
        userid: this.DTOData.userid,
        chatbot: this.DTOData.chatbot,
      }),
    });
    return window.location.reload();
  }
  async servicesMessage(DTOData) {
    this.DTOData = DTOData;
    await fetch(`${router.routerMessage.sendMessage}`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        id: uuid(),
        messageSend: this.DTOData.message,
        userId: this.DTOData.userid,
        UserFriend: this.DTOData.friend,
      }),
    });
    return window.location.reload();
  }
  

}

export class AppGetContent {
  constructor() {}
  async servicesGetMessageBot(DTOData) {
    this.DTOData = DTOData;
    let response = await fetch(`${router.routerMessage.getMessageBot}`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        userid: this.DTOData,
      }),
    });
    const data = await response.json();
    if (response == false || response == "false") return;
    return data;
  }
  async servicesGetMessage(DTOData) {
    this.DTOData = DTOData;
    let response = await fetch(`${router.routerMessage.getMessage}`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        userId: this.DTOData.userId,
        UserFriend: this.DTOData.UserFriend
      }),
    });
    const data = await response.json();
    if (response == false || response == "false") return;
    return data;
  }
}
