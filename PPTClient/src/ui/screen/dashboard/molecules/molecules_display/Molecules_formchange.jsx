import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Select from "react-select";
import { ProductControllerRepository, ClientControllerRepository } from "../../../../../application/Controller/AppController";
import { useParams } from "react-router-dom";
function Molecules_formchange() {
  let {showProduct, showClient} = useParams();
  const [name, setName] = useState(false);
  const [stock, setStock] = useState(false);
  const [category, setCategory] = useState(false);
  const [cost, setCost] = useState(false);
  const [price, setPrice] = useState(false);
  const [address, setAddress] = useState(false);
  const [cid, setCid] = useState(false);
  const [phone, setPhone] = useState(false);
  let cursorProduct = new ProductControllerRepository();
  let cursorClient = new ClientControllerRepository();
  const options = [
    { value: "0", label: "RESPUESTOS" },
    { value: "1", label: "ACEITES" },
    { value: "2", label: "ELECTRONICO" },
    { value: "3", label: "GENERAL" },
    { value: "4", label: "PROMOCION" },
  ];
  if(showProduct)return (
    <Molecules_formchangeStyles>
      <form action="POST"
        onSubmit={(e)=>{
          e.preventDefault();
          let idProduct = showProduct;
          cursorProduct.controllerChangeProduct({idProduct, name, stock, category, cost, price});
        }}
      >
      <div className="container_formchange">
        <p>MODIFICAR NOMBRE</p>
        <input
          type="text"
          onChange={(e) => setName(e.target.value)}
          placeholder="Introduce nombre"
        />
      </div>
      <div className="container_formchange">
        <p>MODIFICAR STOCK</p>
        <input type="number"
        onChange={(e) => setStock(e.target.value)}
        placeholder="Introduce Stock" />
      </div>
      <div className="container_formchange">
        <p>MODIFICAR CATEGORIA</p>
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
              primary25: "#444",
              primary: "black",
            },
          })}
        />
      </div>
      <div className="container_formchange">
        <p>MODIFICAR COSTO ( FIGURADO EN DOLARES )</p>
        <input
          type="number"
          onChange={(e) => setCost(e.target.value)}
          placeholder="Introduce el costo"
        />
      </div>
      <div className="container_formchange">
        <p>MODIFICAR PRECIO ( FIGURADO EN DOLARES )</p>
        <input
          type="number"
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Introduce el precio"
        />
      </div>
      <div className="container_formchange-submit">
        <input
          type="submit"
          value="MODIFICAR PRODUCTO"
        />
      </div>
      </form>
    </Molecules_formchangeStyles>
  );
  if(showClient)return (
    <Molecules_formchangeStyles>
      <form action="POST"
        onSubmit={(e)=>{
          e.preventDefault();
          let idClient = showClient;
          cursorClient.controllerChangeClient({idClient, name, address, cid, phone});
        }}
      >
      <div className="container_formchange">
        <p>MODIFICAR NOMBRE</p>
        <input
          type="text"
          onChange={(e) => setName(e.target.value)}
          placeholder="Introduce nombre"
        />
      </div>
      <div className="container_formchange">
        <p>MODIFICAR DIRECCION</p>
        <input type="text"
        onChange={(e) => setAddress(e.target.value)}
        placeholder="Introduce nueva direccion" />
      </div>
      <div className="container_formchange">
        <p>MODIFICAR CEDULA</p>
        <input
          type="text"
          onChange={(e) => setCid(e.target.value)}
          placeholder="Introduce nueva cedula"
        />
      </div>
      <div className="container_formchange">
        <p>MODIFICAR TELEFONO</p>
        <input
          type="number"
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Introduce nuevo telefono"
        />
      </div>
      <div className="container_formchange-submit">
        <input
          type="submit"
          value="MODIFICAR CLIENTE"
        />
      </div>
      </form>
    </Molecules_formchangeStyles>
  );
}
const Molecules_formchangeStyles = styled.div`
  height: 70vh;
  width: 100%;
  .container_formchange-submit input{
    background: rgba(0,100,0,0.8);
    color: #999;
    font-size: 15px;
    padding: 10px 15px;
    border-radius: 20px;
    margin: 20px;
    cursor: pointer;
    border: none;
    transition: 300ms;
    font-weight: bold;
    &:hover{
      background: rgba(0,150,0,0.8);
      color: #aaa;
    }
  }
  .container_formchange {
    p {
      color: rgba(180, 180, 180, 0.8);
      font-weight: bold;
      font-size: 12px;
      margin: 0px 0px 0px 10px;
      padding: 5px;
    }
    input {
      background: #101214;
      border-radius: 5px;
      border: none;
      padding: 5px;
      margin: 0px 0px 0px 15px;
      width: 80%;
      color: rgba(180, 180, 180, 0.8);
      font-weight: bold;
      font-size: 12px;

      &::placeholder {
        color: rgba(180, 180, 180, 0.8);
        font-weight: bold;
        font-size: 12px;
      }
    }
    input[type="number"]::-webkit-inner-spin-button,
    input[type="number"]::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
    .select_options {
      background: none;
      width: 150px;
      margin: 10px;
      color: #838282 !important;
      font-weight: bold;
      & > div {
        background: #222222;
        font-family: Robotothin;
        &:hover {
          background: #222222 !important;
        }
      }
    }
  }
`;
export default Molecules_formchange;
