import React, {useEffect} from "react";
import styled from "styled-components";
import { GenerateNotification } from "../../../../../application/Utilities/ToastAlert";
import { ToastContainer } from "react-toastify";
import Icon from "@mdi/react";
import { mdiTextBoxMultipleOutline } from "@mdi/js";
import Select from "react-select";
import image_icon from "../../../../../application/Assets/img/icon_main1.png"
import { Hooks_Inventory } from "../../../../../application/Hooks/Hooks_App";
import { ProductControllerRepository } from "../../../../../application/Controller/AppController";
import { useParams } from "react-router-dom";
import { Session } from "bc-react-session";

function Organism_ModalNew() {
  let { isInventory, newProduct } = useParams();
  const session = Session.get("user_information");
  let user_id = session.payload["user_id"];
  let ControllerIndex;
  if (!isInventory) {
    ControllerIndex = newProduct;
  }
  if (!newProduct) {
    ControllerIndex = isInventory;
  }
  let cursorProduct = new ProductControllerRepository();
  const {hooksAvailable, hooksOnResponse} = Hooks_Inventory();
  const options = [
    { value: "0", label: "RESPUESTOS" },
    { value: "1", label: "ACEITES" },
    { value: "2", label: "ELECTRONICO" },
    { value: "3", label: "GENERAL" },
    { value: "4", label: "PROMOCION" },
  ];
  useEffect(()=>{
    hooksAvailable.onHandleIdBusiness(ControllerIndex);
    hooksAvailable.onHandleIdAccount(user_id);
  }, 1000);
 
  return (
    <Organism_ModalNewStyles>
      <form
      onSubmit={async (e)=>{
        e.preventDefault();
     
        await cursorProduct.controllerCreateProduct(hooksOnResponse.onResponseCreateProduct());
      }}
      >
        <div className="modalNew-top">
          <h1>AGREGAR PRODUCTO NUEVO</h1>
          <hr></hr>
        </div>
        <div className="modalNew-main">
          <div className="modalNew_Form">
            <div className="modalNew_form-top">
              <Icon path={mdiTextBoxMultipleOutline} size={1} color={"#ccc"} />
              <p>NOMBRE DEL PRODUCTO</p>
            </div>
            <div className="modalNew_form-bottom">
              <input
                type="text"
                onChange={(e)=>hooksAvailable.onHandleName(e.target.value)}
                placeholder="Introduce el nombre."
              />
            </div>
          </div>
          <div className="modalNew_Form">
            <div className="modalNew_form-top">
              <Icon path={mdiTextBoxMultipleOutline} size={1} color={"#ccc"} />
              <p>CATEGORIA DEL PRODUCTO</p>
            </div>
            <div className="modalNew_form-bottom">
              <Select
                className="select_options"
                name="CATEGORIAS"
                id=""
                options={options}
                onChange={(e)=>hooksAvailable.onHandleCategory(e.label)}
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
                    primary25: "#777777",
                    primary: "black",
                  },
                })}
              />
            </div>
          </div>
          <div className="modalNew_Form">
            <div className="modalNew_form-top">
              <Icon path={mdiTextBoxMultipleOutline} size={1} color={"#ccc"} />
              <p>COSTO DEL PRODUCTO</p>
            </div>
            <div className="modalNew_form-bottom">
              <input
                type="number"
                onChange={(e)=>hooksAvailable.onHandleCost(e.target.value)}
                placeholder="Introduce en divisa."
              />
            </div>
          </div>
          <div className="modalNew_Form">
            <div className="modalNew_form-top">
              <Icon path={mdiTextBoxMultipleOutline} size={1} color={"#ccc"} />
              <p>PRECIO DEL PRODUCTO</p>
            </div>
            <div className="modalNew_form-bottom">
              <input
                type="number"
                onChange={(e)=>hooksAvailable.onHandlePrice(e.target.value)}
                placeholder="Introduce en divisa."
              />
            </div>
          </div>
        </div>
        <div className="modalNew-bottom">
          <input type="submit" value="AGREGAR PRODUCTO"/>
        </div>
        <div className="modalNew-Information">
          <h1>AGREGA UN NUEVO PRODUCTO A LA TIENDA</h1>
          <p style={{color: "#99039e", fontSize: "18px"}}>INSTRUCCIONES:</p>
          <p>Considerar que los productos tendrán una visibilidad local. Solo aparecerán en la tienda que se registra.</p>
          <p>Para rellenar el stock del producto, deberá registrar un proveedor y procesar el ingreso de la mercancia.</p>
          <p><span  style={{color: "#99039e", fontSize: "18px"}}>CONSIDERANDO:</span> Los datos introducidos mediante este sistema serán estudiados, analizados y procesados por factores de inteligencia artificial para el desarrollo estadistico, consultorias e información crucial sobre el negocio. Estos datos no son utilizados para análisis o diagnóstico externo, ya que se pierden luego de su uso.</p>
              <img src={image_icon} alt='image_icon'></img>
        </div>
      </form>
      <ToastContainer />
    </Organism_ModalNewStyles>
  );
}
const Organism_ModalNewStyles = styled.div`
  height: 90vh;
  width: 100%;
  background: rgba(30, 30, 30, 1);

  form {
    .modalNew-top {
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
    .modalNew-main {
      width: 100%;

      .modalNew_Form {
        display: flex;
        align-items: start;
        justify-content: center;
        flex-direction: column;
        padding: 10px 20px;
        margin: 10px;
        border: 2px solid rgba(100, 100, 100, 0.7);
        width: 250px;
        border-radius: 10px;
        .modalNew_form-top {
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
        .modalNew_form-bottom {
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
    .modalNew-bottom{
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
    .modalNew-Information{
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
export default Organism_ModalNew;
