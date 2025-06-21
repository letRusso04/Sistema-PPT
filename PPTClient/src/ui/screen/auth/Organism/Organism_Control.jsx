import React, { useEffect, useState } from "react";
import Icon from "@mdi/react";
import { mdiGithub } from "@mdi/js";
import Molecules_FormUser from "../Molecules/Molecules_FormUser";
import { HooksStatesUse } from "../../../../application/Hooks/Hooks_Auth";
import { ToastContainer } from "react-toastify";
import Molecules_MUser from "../Molecules/Modal/Molecules_MUser";
import { AuthController } from "../../../../application/Controller/AuthController";
import { GlobalActionsAccount } from "../../../../domain/Interface/Repository/AccountRepository";
import { Session } from "bc-react-session";
import { GenerateNotification } from "../../../../application/Utilities/ToastAlert";

function Organism_Control() {
  const session = Session.get("user_information");
  const sessionAccount = Session.get("account_information");
  let user_id = session.payload["user_id"];
  let cursorAccount = new GlobalActionsAccount();
  let cursorController = new AuthController();
  const { onInputController, onResponseData } = HooksStatesUse();
  const [listUser, setListUser] = useState([]);
  useEffect(() => {
    async function fetchData() {
      await cursorController.controllerCallAccount(user_id).then((content) => {
        let createInterfaceUser = cursorAccount.createInterfaceUser(content);
        setListUser(createInterfaceUser);
      });
    }
    fetchData();
    console.log(onResponseData.onControllers());
  }, 1000);
  if (!user_id) return (window.location.href = "/home");

  let cursorNotification = new GenerateNotification();
  function LogoutUser(){
    Session.destroy();
    localStorage.removeItem("account_information");
    localStorage.removeItem("user_information");
    localStorage.removeItem("user_business");
    cursorNotification.notificationSuccess("Desconectando usuario...");
    setTimeout(()=>{
      window.location.href="/";
    },5000);
  
  }
  return (
    <div className="content">
      <div className="content__top">
        <h1>Inicia sesión con su cuenta de usuario</h1>
        <a onClick={()=>LogoutUser()}>¿Quieres desconectar? Click aquí.</a>
      </div>
      <div className="content__main">
        {!onResponseData.onControllers().controllerMenu && (
          <Molecules_FormUser accountActive={listUser} />
        )}
        {!onResponseData.onControllers().controllerMenu &&
          listUser.length < 4 && // Limita a 4 cuentas por ahora
            (
              <div
                onClick={() => {
                  onInputController.onControllerMenu(true);
                }}
              >
                <Molecules_FormUser />
              </div>
            )}

        {onResponseData.onControllers().controllerMenu && <Molecules_MUser />}
      </div>
      <div className="content__bottom">
        <a href="https://github.com/letRusso04" target="_blank">
          <Icon path={mdiGithub} size={2} color={"#ccc"} />
        </a>

        <p>Copyright © 2025 IUPTAI® PPT. Todos los derechos Reservados.</p>
      </div>
      <ToastContainer></ToastContainer>
    </div>
  );
}
// return
export default Organism_Control;
