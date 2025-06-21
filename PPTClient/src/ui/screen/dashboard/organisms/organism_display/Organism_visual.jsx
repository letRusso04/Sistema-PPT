import React, { useState, useEffect } from "react";
import styled from "styled-components";
import image_icon from "../../../../../application/Assets/img/icon_main.png";
import { useParams } from "react-router-dom";
import { ProductControllerRepository, ClientControllerRepository } from "../../../../../application/Controller/AppController";
function Organism_visual(props) {
  let { isInventory, ShowProduct, isList, showClient } = useParams();

  const [productName, setProductName] = useState("");
  const [productStock, setProductStock] = useState("");
  const [productCurrency, setProductCurrency] = useState("");
  const [productCost, setProductCost] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [address, setAddress] = useState("");
  const [cid, setCid] = useState("");
  const [phone, setPhone] = useState("");
  const [idBusiness, setIdBusiness] = useState();

  let cursorProduct = new ProductControllerRepository();
  const getProductID = async () => {
    let idBusiness = isInventory;
    let idProduct = props.showProduct;
    let response = await cursorProduct.controllerCallProductID({
      idBusiness,
      idProduct,
    });
    if (!response) return;
    console.log(response)
    response.forEach((element) => {
      console.log(element[0]);
      setProductName(element[2]);
      setProductStock(element[3]);
      setProductCurrency(element[4]);
      setProductCost(element[5]);
      setProductPrice(element[6]);
      setProductCategory(element[8]);
    });
  };
  let cursorClient = new ClientControllerRepository();
  const getClientID = async () => {
    let idBusiness = isList;
    let idClient = props.showClient;
    let response = await cursorClient.controllerCallClientID({
      idBusiness,
      idClient,
    });
    console.log(response)
    if (!response) return;
  
    response.forEach((element) => {
      setProductName(element[0]);
      setCid(element[1]);
      setPhone(element[2]);
      setAddress(element[3]);
   
   
    });
  };
  useEffect(() => {
    props.showProduct ? getProductID() : getClientID();
  }, ShowProduct);
  if(props.showProduct) return (
    <Organism_visualStyles>
      <div className="visual_top">
        <img src={image_icon} alt="image_icon" />
        <h1>ID: {props.showProduct}</h1>
      </div>
      <div className="visual_main">
        <h1>NOMBRE Y CARACTERÍSTICAS</h1>
        <p>{productName.toUpperCase()}</p>
        <p>CANTIDAD EN STOCK: {productStock} UNIDADES</p>
        <h1>CATEGORIA DEL PRODUCTO</h1>
        <p>{productCategory.toUpperCase()}</p>
        <h1>COSTO DEL PRODUCTO</h1>
        <p> {productCost} {productCurrency.toUpperCase()}</p>
        <h1>PRECIO ACTUAL</h1>
        <p> {productPrice} {productCurrency.toUpperCase()}</p>
      </div>
      <div className="visual_bottom"></div>
    </Organism_visualStyles>
  );
  if(props.showClient) return (
    <Organism_visualStyles>
      <div className="visual_top">
        <img src={image_icon} alt="image_icon" />
        <h1>ID: {props.showClient}</h1>
      </div>
      <div className="visual_main">
        <h1>DATOS GENERALES DEL CLIENTE</h1>
        <p>NOMBRE: {productName.toUpperCase()}</p>
        <p>DIRECCION DEL CLIENTE: {address.toUpperCase()} </p>
        <h1>TELEFONO DEL CLIENTES</h1>
        <p>{phone}</p>
        <h1>CEDULA DE CLIENTE</h1>
        <p>{cid}</p>
      </div>
      <div className="visual_bottom"></div>
    </Organism_visualStyles>
  );
}
const Organism_visualStyles = styled.div`
  width: 75%;
  height: 90vh;
  background: rgba(30, 30, 30, 1);
  border: 2px solid rgba(80, 80, 80, 0.2);
  .visual_top {
    height: 20%;
    width: 100%;
    background: linear-gradient(#2e0202, #080202);
    position: relative;
    img {
      position: absolute;
      left: 3%;
      bottom: -50%;
      width: 120px;
      border-radius: 100px;
      border: 2px solid rgba(150, 150, 150, 0.8);
      cursor: pointer;
      transition: 600ms;
      &:hover {
        border: 3px solid rgba(240, 240, 240, 0.8);
      }
    }
    h1 {
      position: relative;
      left: 20%;
      bottom: -75%;
      font-size: 14px;
      color: rgba(200, 200, 200, 0.8);
    }
  }
  .visual_main {
    height: 70%;
    width: 95%;
    margin: 10% 2.5% 0% 2.5%;
    border-radius: 10px;
    overflow: scroll;

    background: #141414;
    h1 {
      color: rgba(180, 180, 180, 0.8);
      font-weight: bold;
      font-size: 12px;
      margin: 10px;
      padding: 5px;
      border-bottom: 2px solid rgba(120, 120, 120, 0.8);
    }
    p {
      color: rgba(180, 180, 180, 0.8);
      font-weight: bold;
      font-size: 12px;
      margin: 0px 0px 0px 20px;
      padding: 5px;
    }
  }
`;

export default Organism_visual;
