import React from "react";
import styled from "styled-components";
import Icon from "@mdi/react";
import {
  mdiRenameBoxOutline,
  mdiCellphoneText,
  mdiCalendarBlankMultiple,
  mdiEarth,
  mdiInformationSlabCircleOutline,
  mdiLockOutline,
  mdiThemeLightDark,
} from "@mdi/js";
import Atoms_MUserStyles from "../../Atoms/Modal/Atoms_MUser";
import { HooksStatesUse } from "../../../../../application/Hooks/Hooks_Auth";
import { AuthController } from "../../../../../application/Controller/AuthController";
import { ToastContainer } from "react-toastify";
function Molecules_MUser() {
  const cursorControlador = new AuthController();
  const { onInputController, onResponseData } = HooksStatesUse();

  return (
    <Molecules_MUserStyles>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          cursorControlador.controllerUserRegister(
            onResponseData.onRegisterUser()
          );
        }}
        method="POST"
        className="form_MUser"
      >
        <div className="MUser_left">
          <Atoms_MUserStyles>
            <Icon path={mdiRenameBoxOutline} size={1.2} color={"#aaa"} />
            <input
              type="text"
              autocomplete="off"
              onChange={(e) =>
                onInputController.onInputNameChange(e.target.value)
              }
              placeholder="Nombre y Apellido del usuario"
            />
          </Atoms_MUserStyles>
          <Atoms_MUserStyles>
            <Icon path={mdiCellphoneText} size={1.2} color={"#aaa"} />
            <input
              type="number"
              autocomplete="off"
              onChange={(e) =>
                onInputController.onInputNumberChange(e.target.value)
              }
              placeholder="Número de telefono del usuario"
            />
          </Atoms_MUserStyles>
          <Atoms_MUserStyles>
            <Icon path={mdiCalendarBlankMultiple} size={1.2} color={"#aaa"} />
            <input
              type="date"
              autocomplete="off"
              onChange={(e) =>
                onInputController.onInputTimeDesing(e.target.value)
              }
            />
          </Atoms_MUserStyles>
          <Atoms_MUserStyles>
            <Icon path={mdiEarth} size={1.2} color={"#aaa"} />
            <input
              type="text"
              autocomplete="off"
              onChange={(e) =>
                onInputController.onInputGlobalUser(e.target.value)
              }
              placeholder="Ubicación geográfica del usuario"
            />
          </Atoms_MUserStyles>
        </div>
        <div className="MUser_Right">
          <Atoms_MUserStyles>
            <Icon
              path={mdiInformationSlabCircleOutline}
              size={1.2}
              color={"#aaa"}
            />
            <div className="MUser_selecction">
              <input
                autocomplete="off"
                onClick={(e) => onInputController.onInputSelectedChange("1")}
                type="radio"
                name="selectGener"
              />
              Hombre
            </div>
            <div className="MUser_selecction">
              <input
                onClick={(e) => onInputController.onInputSelectedChange("2")}
                type="radio"
                name="selectGener"
              />
              Mujer
            </div>
          </Atoms_MUserStyles>
          <Atoms_MUserStyles>
            <Icon path={mdiLockOutline} size={1.2} color={"#aaa"} />
            <input
              type="text"
              autocomplete="off"
              onChange={(e) =>
                onInputController.onInputPasswordChange(e.target.value)
              }
              placeholder="Contraseña del usuario ( opcional )"
            />
          </Atoms_MUserStyles>
          <Atoms_MUserStyles>
            <Icon path={mdiThemeLightDark} size={1.2} color={"#aaa"} />
            <input
              type="text"
              name=""
              id=""
              placeholder="Escoger tema ( Opción bloqueada )"
              disabled
            />
          </Atoms_MUserStyles>
          <div className="MUser_submit">
            <button onClick={()=> window.location.href=window.location.href}>Cancelar</button>
            <input type="submit" value="Registrar Usuario" />
          </div>
        </div>
      </form>
    </Molecules_MUserStyles>
  );
}
const Molecules_MUserStyles = styled.div`
  width: 100%;
  height: 70vh;

  .form_MUser {
    width: 100%;
    height: 50vh;
    padding: 30px;
    display: flex;
    overflow: hidden !important;
    justify-content: space-around;
    .MUser_left {
      width: 40%;
      height: 100%;
      border-radius: 10px;
      background: rgba(0, 0, 0, 0.9);
    }
    .MUser_Right {
      width: 40%;
      height: 100%;
      border-radius: 10px;
      background: rgba(0, 0, 0, 0.9);
      .MUser_submit {
        width: 100%;
        display: flex;
        align-items: end;
        justify-content: end;
        input {
          background: rgba(0, 58, 0, 0.8);
          padding: 10px;
          color: #ccc;
          font-weight: bold;
          font-size: 15px;
          cursor: pointer;
          transition: 300ms;
          border-radius: 10px;
          width: 200px;
          height: 30;
          border: none;

          margin-right: 10%;
        }
        input:hover {
          color: #fff;
          background: rgba(0, 150, 0, 0.8);
        }
      }
      button {
          background: rgba(58, 0, 10, 0.8);
          padding: 10px;
          color: #ccc;
          font-weight: bold;
          font-size: 15px;
          cursor: pointer;
          transition: 300ms;
          border-radius: 10px;
          width: 200px;
          height: 30;
          border: none;

          margin-right: 10%;
        }
        button:hover {
          color: #fff;
          background: rgba(150, 0, 25, 0.8);
        }
      
    }
  }
`;
export default Molecules_MUser;
