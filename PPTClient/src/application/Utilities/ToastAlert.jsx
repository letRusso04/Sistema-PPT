import { toast } from "react-toastify";

export class GenerateNotification {
  constructor() {}
  notificationError(dataInformation, url, category) {
    this.information = dataInformation;
    this.url = url;
    this.category = category;
    toast.error(this.information, {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  }
  notificationInfo(dataInformation, url, category) {
    this.information = dataInformation;
    this.url = url;
    this.category = category;
    toast.info(this.information, {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  }
  notificationSuccess(dataInformation, url, category) {
    this.information = dataInformation;
    this.url = url;
    this.category = category;
    toast.success(this.information, {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  }
}
