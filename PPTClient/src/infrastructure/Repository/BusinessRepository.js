import { Session } from "bc-react-session";
import "react-toastify/dist/ReactToastify.css";
import { GlobalAPIRouter } from "../router/ServicesRouter";
import { v4 as uuid } from "uuid";
import { GenerateNotification } from "../../application/Utilities/ToastAlert";
const session = Session.get("user_information");
let user_id = session.payload["user_id"];
let cursorNotification = new GenerateNotification();
let router = new GlobalAPIRouter();

export class BusinessRepository {
  constructor() {}
  async servicesCreateBusiness(DTOData) {
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
  async servicesGetBussines(userId) {
    this.userId = userId;
    let response = await fetch(`${router.routerBusiness.callBusiness}`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        sendUserId: this.userId,
      }),
    });
    const data = await response.json();
    if (response == false || response == "false") return;
    return data;
  }
}

export class ProductRepository {
  constructor() {}
  async servicesCreateProduct(DTOData) {
    this.DTOData = DTOData;
    console.log(DTOData);
    await fetch(`${router.routerProduct.createProduct}`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        idBusiness: this.DTOData.idBusiness,
        name: this.DTOData.name,
        category: this.DTOData.category,
        price: this.DTOData.price,
        cost: this.DTOData.cost,
        idAccount: this.DTOData.idAccount
      }),
    });
    window.location.href = window.location.href;
  }
  async servicesGetProduct(businessId) {
    this.businessId = businessId;
    let response = await fetch(`${router.routerProduct.callProduct}`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        IdBusiness: this.businessId,
      }),
    });
    const data = await response.json();
    if (response == false || response == "false") return;
    return data;
  }
  async servicesGetProductID(DTOData) {
    this.DTOData = DTOData;
    console.log(this.DTOData);
    let response = await fetch(`${router.routerProduct.callProductID}`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        idBusiness: this.DTOData.idBusiness,
        idProduct: this.DTOData.idProduct,
      }),
    });
    const data = await response.json();
    if (response == false || response == "false") return;
    return data;
  }
  async servicesChangeProduct(DTOData) {
    this.DTOData = DTOData;
    await fetch(`${router.routerProduct.changeProduct}`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        idProduct: this.DTOData.idProduct,
        name: this.DTOData.name,
        amount: this.DTOData.stock,
        cost: this.DTOData.cost,
        sent: this.DTOData.price,
        category: this.DTOData.category,
      }),
    });
    return window.location.reload();
  }
  async servicesDeleteProduct(idProduct) {
    this.idProduct = idProduct;
    await fetch(`${router.routerProduct.deleteProduct}`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        idProduct: this.idProduct,
      }),
    });
    return (window.location.href = "/dashboard/inventario/");
  }
}
export class ClientRepositoryServices {
  async servicesCreateClient(DTOData) {
    this.DTOData = DTOData;
    console.log(DTOData);
    await fetch(`${router.routerClient.createClient}`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        idBusiness: this.DTOData.idBusiness,
        name: this.DTOData.name,
        address: this.DTOData.address,
        cid: this.DTOData.cid,
        date: this.DTOData.date,
        gener: this.DTOData.gener,
        payment: this.DTOData.payment,
        phone: this.DTOData.phone,
        idAccount: this.DTOData.idAccount
      }),
    });
    window.location.href = window.location.href;
  }
  async servicesGetClient(businessId) {
    this.businessId = businessId;
    let response = await fetch(`${router.routerClient.callClient}`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        idBusiness: this.businessId,
      }),
    });
    const data = await response.json();
    if (response == false || response == "false") return;
    return data;
  }
  async servicesGetClientID(DTOData) {
    this.DTOData = DTOData;
    console.log(this.DTOData);
    let response = await fetch(`${router.routerClient.callClientID}`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        idBusiness: this.DTOData.idBusiness,
        idClient: this.DTOData.idClient,
      }),
    });
    const data = await response.json();
    if (response == false || response == "false") return;
    return data;
  }
  async servicesChangeClient(DTOData) {
    this.DTOData = DTOData;
    await fetch(`${router.routerClient.changeClient}`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        idClient: this.DTOData.idClient,
        name: this.DTOData.name,
        address: this.DTOData.address,
        cid: this.DTOData.cid,
        phone: this.DTOData.phone,
      }),
    });
    return window.location.reload();
  }
  async servicesDeleteClient(idClient) {
    this.idClient = idClient;
    await fetch(`${router.routerClient.deleteClient}`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        idClient: this.idClient,
      }),
    });
    return (window.location.href = "/dashboard/clientes/");
  }
}
