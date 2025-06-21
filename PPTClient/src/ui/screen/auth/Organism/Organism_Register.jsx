import React from "react";
import Icon from "@mdi/react";
import {
  mdiEmailOutline,
  mdiKeyOutline,
  mdiGithub,
  mdiCellphoneText,
  mdiCalendarRange,
  mdiEmailSealOutline,
  mdiInformationVariantBoxOutline,
} from "@mdi/js";
import { Link } from "react-router-dom";
import { Molecules_RegisterStyles } from "../Molecules/Molecules_Register";
import { HooksStatesUse } from "../../../../application/Hooks/Hooks_Auth";
import { AuthController } from "../../../../application/Controller/AuthController";
import { ToastContainer } from "react-toastify";
import Select from "react-select";
import { useState } from "react";

function Organism_Register() {
  const cursorControlador = new AuthController();
  const { onInputController, onResponseData } = HooksStatesUse();
  const [category, setCategory] = useState(false);
  /*
  1 Dependencia Federal y 1 Distrito Capital. La lista de los estados es: Amazonas, Anzoátegui, Apure, Aragua, Barinas, Bolívar, Carabobo, Cojedes, Delta Amacuro, Falcón, Guárico, Lara, Mérida, Miranda, Monagas, Nueva Esparta, Portuguesa, Sucre, Táchira, Trujillo, Vargas, Yaracuy y Zulia
  */
  const options = [
    { value: "0", label: "Distrito Capital" },
    { value: "1", label: "Amazonas" },
    { value: "2", label: "Anzoátegui" },
    { value: "3", label: "Apure" },
    { value: "4", label: "Aragua" },
    { value: "5", label: "Barinas" },
    { value: "6", label: "Bolívar" },
    { value: "7", label: "Carabobo" },
    { value: "8", label: "Cojedes" },
    { value: "9", label: "Delta Amacuro" },
    { value: "10", label: "Falcón" },
    { value: "11", label: "Guárico" },
    { value: "12", label: "Lara" },
    { value: "13", label: "Mérida" },
    { value: "14", label: "Miranda" },
    { value: "15", label: "Monagas" },
    { value: "16", label: "Nueva Esparta" },
    { value: "17", label: "Portuguesa" },
    { value: "18", label: "Sucre" },
    { value: "19", label: "Táchira" },
    { value: "20", label: "Trujillo" },
    { value: "21", label: "Vargas" },
    { value: "22", label: "Yaracuy" },
    { value: "23", label: "Zulia" }
  ];
  return (
    <form
      className="content"
      onSubmit={(e) => {
        e.preventDefault();
        cursorControlador.controllerRegister(onResponseData.onRegisterData());
      }}
      method="POST"
    >
      <div className="content__top">
        <h1>Registro de Usuario</h1>
        <p>Rellena el siguiente formulario</p>
        <div>
          <p>¿Ya tienes cuenta?</p>{" "}
          <Link to="/inicio">
            <a>Inicia sesión aquí.</a>
          </Link>
        </div>
      </div>
      <div className="content__main">
        <div className="content__main-left">
          <Molecules_RegisterStyles>
            <div className="format_input">
              <Icon style={{ margin: 5 }} path={mdiEmailOutline} size={1.2} />
              <input
                type="text"
                autocomplete="off"
                onChange={(e) =>
                  onInputController.onInputEmailChange(e.target.value)
                }
                placeholder="Registra un correo electrónico"
              />
            </div>
          </Molecules_RegisterStyles>
          <Molecules_RegisterStyles>
            <div className="format_input">
              <Icon style={{ margin: 5 }} path={mdiKeyOutline} size={1.2} />
              <input
                type="password"
                autocomplete="off"
                onChange={(e) =>
                  onInputController.onInputPasswordChange(e.target.value)
                }
                placeholder="Registra una contraseña"
              />
            </div>
          </Molecules_RegisterStyles>
          <Molecules_RegisterStyles>
            <div className="format_input">
              <Icon style={{ margin: 5 }} path={mdiKeyOutline} size={1.2} />
              <input
                type="password"
                autocomplete="off"
                onChange={(e) =>
                  onInputController.onInputPasswordConfirmChange(e.target.value)
                }
                placeholder="Confirme su contraseña"
              />
            </div>
          </Molecules_RegisterStyles>

          {/*   <Molecules_RegisterStyles>
         <div className="format_input">
           <Icon style={{ margin: 5 }} path={mdiCellphoneText} size={1.2} />
           <input
             type="tel"
             name=""
             id=""
             pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
             required
             placeholder="Registre un número de telefónico"
           />
         </div>
       </Molecules_RegisterStyles>*/}
        </div>
        <div className="content__main-right">
          <Molecules_RegisterStyles>
            <div className="format_input">
              <Icon
                style={{ margin: 5 }}
                path={mdiInformationVariantBoxOutline}
                size={1.2}
              />
              <input
                type="text"
                autocomplete="off"
                onChange={(e) =>
                  onInputController.onInputBusinessName(e.target.value)
                }
                placeholder="Ingrese el nombre y apellido"
              />
            </div>
          </Molecules_RegisterStyles>
          <Molecules_RegisterStyles>
            <div className="format_input">
              <Icon
                style={{ margin: 5 }}
                path={mdiEmailSealOutline}
                size={1.2}
              />
              <input
                type="text"
                autocomplete="off"
                onChange={(e) =>
                  onInputController.onInputBusinessRif(e.target.value)
                }
                placeholder="Registra la Cedula de Identidad"
              />
            </div>
          </Molecules_RegisterStyles>

          <Molecules_RegisterStyles>
            <div className="format_input">
              <Icon
                style={{ margin: 5 }}
                path={mdiEmailSealOutline}
                size={1.2}
              />
              <input
                type="text"
                autocomplete="off"
                onChange={(e) =>
                  onInputController.onInputBusinessRif(e.target.value)
                }
                placeholder="Ubicación exacta del registrado."
              />
            </div>
          </Molecules_RegisterStyles>
          <Molecules_RegisterStyles>
            <div className="container_formchange">
              <p style={{ fontWeight: 'bold' }}>SELECCIONA SU ESTADO</p>
              <Select
                className="select_options"
                name="CATEGORIAS"
                onChange={(e) => setCategory(e.label)}
                options={options}
                styles={{
                  control: (baseStyles, state) => ({
                    ...baseStyles,
                    borderColor: state.isFocused ? "#444" : "#800",
                    borderRadius: "5px",
  
                  }),
                }}
                theme={(theme) => ({
                  ...theme,
                  borderRadius: 0,
                  colors: {
                    ...theme.colors,
                    primary25: "#9c9c9c",
                    primary: " #e0e0e0",
                  },
                })}
              />
            </div>

          </Molecules_RegisterStyles>
        </div>
      </div>
      <div className="content__bottom">
        <div className="content__bottom-top">
          <input type="submit" value="Registrarse" />
        </div>
        <div className="content__bottom-bottom">
      
          <p>Copyright © 2025 IUPTAI® PPT. Todos los derechos Reservados.</p>        </div>
      </div>
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

export default Organism_Register;
