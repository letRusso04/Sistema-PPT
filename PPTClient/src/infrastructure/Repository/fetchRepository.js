import { Session } from "bc-react-session";
import "react-toastify/dist/ReactToastify.css";
import { GlobalAPIRouter } from "../router/ServicesRouter";
import { v4 as uuid } from "uuid";
import { GenerateNotification } from "../../application/Utilities/ToastAlert";
const session = Session.get("user_information");
let user_id = session.payload["user_id"];
let cursorNotification = new GenerateNotification();
let router = new GlobalAPIRouter();

export class FecthRepository {
  constructor() {}
  async servicesCreateUser(DTOData) {
    this.DTOData = DTOData;
    await fetch(`${router.routerBusiness.createBusiness}`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        userId: user_id,
        nombre: this.DTOData.name,
        ubicacion: this.DTOData.location,
        rif: this.DTOData.rif,
        numero: this.DTOData.number,
      }),
    });
    window.location.href = "/dashboard/inventario/";
  }
  async servicesGetUser(userId) {
    this.userId = userId;
    let response = await fetch(`${router.routerUser.callMember}`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
    });
    const data = await response.json();
    if (response == false || response == "false") return;
    return data;
  }
}
