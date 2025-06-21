import React from "react";
import styled from "styled-components";
import { GenerateNotification } from "../../../../../application/Utilities/ToastAlert";
import { ToastContainer } from "react-toastify";
import Icon from "@mdi/react";
import { mdiTextBoxMultipleOutline } from "@mdi/js";
import Select from "react-select";
import image_icon from "../../../../../application/Assets/img/icon_main1.png"
import { Hooks_Inventory } from "../../../../../application/Hooks/Hooks_App";
import { BusinessControllerRepository } from "../../../../../application/Controller/AppController";
function Organism_ModalShop() {
  let cursorNotification = new GenerateNotification();
  let cursorBusiness = new BusinessControllerRepository();
  const {hooksAvailable, hooksOnResponse} = Hooks_Inventory();

  return (
    <Organism_ModalShopStyles>
      <form
      onSubmit={(e)=>{
        e.preventDefault();
        cursorBusiness.controllerCreateBusiness(hooksOnResponse.onResponseCreateShop());
      }}
      >
        <div className="ModalShop-top">
          <h1>AGREGAR TIENDA NUEVA</h1>
          <hr></hr>
        </div>
        <div className="ModalShop-main">
          <div className="ModalShop_Form">
            <div className="ModalShop_form-top">
              <Icon path={mdiTextBoxMultipleOutline} size={1} color={"#ccc"} />
              <p>NOMBRE DE LA TIENDA</p>
            </div>
            <div className="ModalShop_form-bottom">
              <input
                type="text"
                onChange={(e)=>hooksAvailable.onHandleName(e.target.value)}
                placeholder="Introduce el nombre."
              />
            </div>
          </div>
          <div className="ModalShop_Form">
            <div className="ModalShop_form-top">
              <Icon path={mdiTextBoxMultipleOutline} size={1} color={"#ccc"} />
              <p>UBICACION DE LA TIENDA</p>
            </div>
            <div className="ModalShop_form-bottom">
              <input
                type="text"
                onChange={(e)=>hooksAvailable.onHandleLocation(e.target.value)}
                placeholder="Introduce la ubicacion."
              />
            </div>
          </div>
          <div className="ModalShop_Form">
            <div className="ModalShop_form-top">
              <Icon path={mdiTextBoxMultipleOutline} size={1} color={"#ccc"} />
              <p>RIF DE LA TIENDA</p>
            </div>
            <div className="ModalShop_form-bottom">
              <input
                type="text"
                onChange={(e)=>hooksAvailable.onHandleRif(e.target.value)}
                placeholder="Introduce el RIF."
              />
            </div>
          </div>
          <div className="ModalShop_Form">
            <div className="ModalShop_form-top">
              <Icon path={mdiTextBoxMultipleOutline} size={1} color={"#ccc"} />
              <p>NUMERO DE TELEFONO DE LA TIENDA</p>
            </div>
            <div className="ModalShop_form-bottom">
              <input
                type="number"
                onChange={(e)=>hooksAvailable.onHandleNumber(e.target.value)}
                placeholder="Introduzca un telefono"
              />
            </div>
          </div>
        </div>
        <div className="ModalShop-bottom">
          <input type="submit" value="CREAR TIENDA"/>
        </div>
        <div className="ModalShop-Information">
          <h1>CREACION DE TIENDA</h1>
          <p style={{color: "#99039e", fontSize: "18px"}}>INSTRUCCIONES:</p>
          <p>Considerar que el registro de la tienda es individual, dispondrá de un inventario y un listado de clientes independiente.</p>
          <p>ASEGURARSE QUE LOS DATOS INTRODUCIDOS SEAN CORRECTOS, ANTES DE GENERAR LA TIENDA.</p>
          <p><span  style={{color: "#99039e", fontSize: "18px"}}>CONSIDERANDO:</span> Los datos introducidos mediante este sistema serán estudiados, analizados y procesados por factores de inteligencia artificial para el desarrollo estadistico, consultorias e información crucial sobre el negocio. Estos datos no son utilizados para análisis o diagnóstico externo, ya que se pierden luego de su uso.</p>
              <img src={image_icon} alt='image_icon'></img>
        </div>
      </form>
      <ToastContainer />
    </Organism_ModalShopStyles>
  );
}
const Organism_ModalShopStyles = styled.div`
  height: 90vh;
  width: 100%;
  background: rgba(30, 30, 30, 1);

  form {
    .ModalShop-top {
      width: 100%;
      height: 60%;
      hr {
        opacity: 0.2;
      }
      h1 {
        color: #ccc;
        font-size: 20px;
        margin-left: 10px;
        font-weight: bold;
      }
    }
    .ModalShop-main {
      width: 100%;

      .ModalShop_Form {
        display: flex;
        align-items: start;
        justify-content: center;
        flex-direction: column;
        padding: 10px 20px;
        margin: 10px;
        border: 2px solid rgba(100, 100, 100, 0.7);
        width: 250px;
        border-radius: 10px;
        .ModalShop_form-top {
          display: flex;
          justify-content: center;
          align-items: center;
          p {
            color: #aaa;
            font-size: 12px;
            font-weight: bold;
            margin-left: 5px;
          }
        }
        .ModalShop_form-bottom {
          input {
            background: none;
            border: none;
            color: #aaa;
            font-weight: bold;
            font-size: 16px;
            &::placeholder {
              color: #aaa !important;
              font-weight: bold;
              font-size: 16px;
            }
          }
          input[type="number"]::-webkit-inner-spin-button,
          input[type="number"]::-webkit-outer-spin-button {
            -webkit-appearance: none;
            margin: 0;
          }
          .select_options {
            background: none;
            width: 200px;
            margin: 10px;
            color: #b6b4b4 !important;
            font-weight: bold;
            & > div {
              background: #222222;
              font-family: Robotothin;
              color: #b6b4b4 !important;
              &:hover {
                background: #000000 !important;
              }
            }
          }
        }
      }
    }
    .ModalShop-bottom{
      margin-left: 30px;
      input{
        cursor: pointer;
        background: rgba(0,60,0, 0.8);
        padding: 10px 20px;
        margin: 20px;
        border-radius: 10px;
        border: none;
        color: #eee;
        font-weight: bold;
        font-size: 16px;
        transition: 300ms;
        &:hover{
          background: rgba(0,120,0, 0.8);
          color: #fff;

        }
      }
    }
    .ModalShop-Information{
      position: absolute;
      left: 50%;
      top: 25%;
      color: #ccc;
      font-weight: bold;
      font-size: 14px;
      img{
        margin-left: 70%;
        width: 120px;
      }
    }
  }
`;
export default Organism_ModalShop;
