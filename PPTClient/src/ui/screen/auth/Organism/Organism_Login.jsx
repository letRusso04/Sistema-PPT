import React from "react";
import Icon from "@mdi/react";
import { mdiEmailOutline, mdiKeyOutline, mdiGithub } from "@mdi/js";
import { Link } from "react-router-dom";
import Molecules_LoginStyles from "../Molecules/Molecules_Login";
import { HooksStatesUse } from "../../../../application/Hooks/Hooks_Auth";
import { AuthController } from "../../../../application/Controller/AuthController";
import { ToastContainer } from "react-toastify";

function Organism_Login() {
  const cursorControlador = new AuthController();
  const { onInputController, onResponseData } = HooksStatesUse();
  return (
    <form
      className="content"
      onSubmit={(e) => {
        e.preventDefault();
        cursorControlador.controllerHandleSubmit(
          onResponseData.onLoginData()
        );
      }}
      method="POST"
    >
      <div className="content__top">
        <h1>Bienvenido Sistema de Registro</h1>
        <p>Ingresa sus datos para iniciar</p>
        <Link to="/">
          <a>Haz click aquí para regresar</a>
        </Link>
      </div>
      <div className="content__main">
        <div className="content__main-container">
          <Molecules_LoginStyles>
            <div className="form_input">
              <Icon style={{ margin: 5 }} path={mdiEmailOutline} size={1.2} />
              <input
                type="text"
                autocomplete="off"
                onChange={(e) =>
                  onInputController.onInputEmailChange(e.target.value)
                }
                placeholder="Correo electrónico"
              />
            </div>
          </Molecules_LoginStyles>
          <Molecules_LoginStyles>
            <div className="form_input">
              <Icon style={{ margin: 5 }} path={mdiKeyOutline} size={1.2} />
              <input
                type="password"
                autocomplete="off"
                onChange={(e) =>
                  onInputController.onInputPasswordChange(e.target.value)
                }
                placeholder="Contraseña"
              />
            </div>
          </Molecules_LoginStyles>
          <Molecules_LoginStyles>
            <div className="form_button">
              <input type="submit" value="Iniciar Sesión" />
              <div>
                <p>¿No te has creado cuenta? </p>
                <Link to="/registro">
                  <a> Registrate con nosotros.</a>
                </Link>
              </div>
            </div>
          </Molecules_LoginStyles>
        </div>
      </div>
      <div className="content__bottom">
      <p>Copyright © 2025 IUPTAI® PPT. Todos los derechos Reservados.</p>      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </form>
  );
}

export default Organism_Login;
