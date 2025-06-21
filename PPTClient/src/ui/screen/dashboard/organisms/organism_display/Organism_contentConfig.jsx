import React from "react";
import styled from "styled-components";
import image_icon from "../../../../../application/Assets/img/icon_hombre.png";
import { Link } from "react-router-dom";
function Organism_contentConfig() {
  return (
    <Organism_contentConfigStyles>
      <h1>Mi cuenta</h1>

      <div className="container_contentConfig">
        <div className="contentConfig-top">
          <img src={image_icon} alt="image_icon" srcset="" />
          <p>ID: 45123424</p>
        </div>
        <div className="contentConfig-main">
          <h1 className="isUserName">Patria Para Todos</h1>
          <div className="contentConfig_formGeneral">
            <div className="contetConfig_main-form">
              <h1>CORREO ELECTRÓNICO</h1>
              <p>prueba@gmail.com</p>
            </div>
            <Link className="contentConfig_main-button">Editar</Link>
          </div>
          <div className="contentConfig_formGeneral">
            <div className="contetConfig_main-form">
              <h1>NÚMERO DE TELEFONO</h1>
              <p>+58 414123654</p>
            </div>
            <Link className="contentConfig_main-button">Editar</Link>
          </div>
          <div className="contentConfig_formGeneral">
            <div className="contetConfig_main-form">
              <h1>PERMISOS ADMINISTRATIVOS</h1>
              <p>Administrador</p>
            </div>
            <Link className="contentConfig_main-button">Editar</Link>
          </div>
            <div className="contentConfig_formGeneral">
            <div className="contetConfig_main-form">
              <h1>ESTADO NACIONAL</h1>
              <p>TÁCHIRA</p>
            </div>
            <Link className="contentConfig_main-button">Editar</Link>
          </div>
          <div className="contentConfig_formGeneral">
            <div className="contetConfig_main-form">
              <h1>UBICACIÓN GEOGRÁFICA</h1>
              <p>San Juan de Colón, estado táchira, Venezuela.</p>
            </div>
            <Link className="contentConfig_main-button">Editar</Link>
          </div>
        </div>
      </div>
    </Organism_contentConfigStyles>
  );
}
const Organism_contentConfigStyles = styled.div`
  width: 100%;
  height: 90vh;
  background: rgba(30, 30, 30, 1);
  overflow: scroll;

  h1 {
    margin: 20px 20px 0px 20px;
    color: #bbb;
    font-size: 20px;
  }
  .container_contentConfig {
    margin: 10px 20px 0px 20px;
    width: 70%;
    height: 450px;
    background: #141414;
    margin-bottom: 60px;
    border-radius: 10px;
    overflow: hidden;
    .contentConfig-top {
      height: 20%;
      width: 100%;
      background: #0c0c0c;
      position: relative;
      img {
        position: absolute;
        width: 80px;
        border-radius: 50px;
        border: 5px solid #141414;
        bottom: -60%;
        left: 4%;
      }
      p {
        position: absolute;
        color: rgba(200, 200, 200, 0.8);
        bottom: -15%;
        left: 18%;
        font-size: 14px;
        font-weight: bold;
      }
    }
    .contentConfig-main {
      height: 80%;
      width: 100%;
      margin-top: 60px;
      position: relative;

      .isUserName {
        position: absolute;
        color: rgba(240, 240, 240, 0.8);
        left: 15%;
        top: -70px;
        font-size: 16px;
      }
      .contentConfig_formGeneral {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .contetConfig_main-form {
          margin-top: 10px;
          margin-left: 25px;
          h1 {
            color: rgba(240, 240, 240, 0.8);
            font-size: 12px;
            margin-top: 5px;
          }
          p {
            color: rgba(220, 220, 220, 0.8);
            font-size: 15px;
            margin: 0px;
            margin-left: 20px;
          }
        }
        .contentConfig_main-button {
          background: rgba(50, 50, 50, 0.8);
          padding: 8px 15px;
          cursor: pointer;
          color: #888;
          font-size: 15px;

          height: 20px;
          transition: 300ms;
          border-radius: 5px;
          font-weight: bold;
          margin-right: 20px;
          &:hover {
            background: rgba(0, 0, 0, 0.2);
            color: #aaa;
          }
        }
      }
    }
  }
`;
export default Organism_contentConfig;
