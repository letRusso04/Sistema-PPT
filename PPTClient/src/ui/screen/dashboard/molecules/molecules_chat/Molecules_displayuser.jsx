import React from "react";
import styled from "styled-components";
import image_icon from "../../../../../application/Assets/img/icon_main.png";
import Icon from "@mdi/react";
import { mdiCheckCircleOutline, mdiAlertBox  } from "@mdi/js";
function Molecules_displayuser() {
  return (
    <Molecules_displayuserStyles>
      <div className="displayuser_top">
        <img src={image_icon} alt="image_icon" srcset="" />
      </div>
      <div className="displayuser_main">
        <div className="displayuser_formName">
          <h1>Dante Aligheri</h1>
          <p>Inteligencia Artificial</p>
        </div>
        <div className="displayuser_formDatabase">
          <Icon className="displayuser_icon" path={mdiCheckCircleOutline } size={1.5}></Icon>
          <p>Obtener información de internet</p>
        </div>
        <div className="displayuser_formDatabase">
          <Icon className="displayuser_icon" path={mdiCheckCircleOutline } size={1.5}></Icon>
          <p>Acceder información de la empresa</p>
        </div>
        <div className="displayuser_formDatabase">
          <Icon className="displayuser_icon" path={mdiCheckCircleOutline } size={1.5}></Icon>
          <p>Obtener el listado de clientes actual</p>
        </div>
        <div className="displayuser_formDatabase">
          <Icon className="displayuser_icon" path={mdiCheckCircleOutline } size={1.5}></Icon>
          <p>Obtener el listado de productos actual</p>
        </div>
        <div className="displayuser_formDatabase">
          <Icon className="displayuser_icon" path={mdiCheckCircleOutline } size={1.5}></Icon>
          <p>Analizar el flujo de ventas</p>
        </div>
        <div className="displayuser_formDatabase">
          <Icon className="displayuser_icon" path={mdiAlertBox} style={{color: "#9c9204"}} size={1.5}></Icon>
          <p>No suele ser preciso en sus respuestas</p>
        </div>
      </div>
      <div className="displayuser_bottom"></div>
    </Molecules_displayuserStyles>
  );
}
const Molecules_displayuserStyles = styled.div`
  width: 100%;
  height: 90vh;
  .displayuser_top {
    background: #1d0000;
    height: 15%;
    width: 100%;
    position: relative;
    img {
      width: 80px;
      border-radius: 50px;
      position: absolute;
      bottom: -50%;
      left: 5%;
      border: 4px solid #0a0a0a;
    }
  }
  .displayuser_main {
    height: 65%;
    width: 80%;
    background: #161616;
    margin: 40px 20px 20px 20px;
    border-radius: 5px;
    padding: 10px;
    .displayuser_formName {
      h1 {
        margin: 0px;
        font-size: 15px;
        color: #ccc;
        font-weight: bold;
      }
      p {
        margin: 0px;
        font-size: 12px;
        color: #aaa;
        font-weight: bold;
      }
    }
    .displayuser_formDatabase {
      display: flex;
      margin-top: 5px;
      justify-content: start;
      align-items: center;
      .displayuser_icon {
        color: #00ac00;
        margin-top: 5px;
      }
      p {
        margin: 0px;
        margin-left: 5px;
        font-size: 12px;
        color: #aaa;
        font-weight: bold;
      }
    }
  }
  .displayuser_bottom {
    height: 20%;
    width: 100%;
  }
`;
export default Molecules_displayuser;
