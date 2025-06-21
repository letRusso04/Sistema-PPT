import React from "react";
import styled from "styled-components";
import Molecules_formchange from "../../molecules/molecules_display/Molecules_formchange";
import { ProductControllerRepository, ClientControllerRepository } from "../../../../../application/Controller/AppController";
import { useParams } from "react-router-dom";
function Organism_change(props) {
  let {showProduct, showClient} = useParams();
  
  let cursorProduct = new ProductControllerRepository();
  let cursorClient= new ClientControllerRepository();
  if(showProduct) return (
    <Organism_changeStyles>
      <div className="change_top">
        <h1>MODIFICAR ATRIBUTOS</h1>
      </div>
      <div className="change_main">
        <Molecules_formchange />
      </div>
      <form
        action="
      POST"
      onSubmit={(e)=>{
        e.preventDefault();
        let idProduct = showProduct;
        console.log(idProduct);
        cursorProduct.controllerDeleteProduct(idProduct)
      }}
      >
        <input
          type="submit"
          value="
      ELIMINAR PRODUCTO"
        />
        <p>(Esta acción es irreversible)</p>
      </form>
    </Organism_changeStyles>
  );
  if(showClient) return (
    <Organism_changeStyles>
      <div className="change_top">
        <h1>MODIFICAR CLIENTE</h1>
      </div>
      <div className="change_main">
        <Molecules_formchange />
      </div>
      <form
        action="
      POST"
      onSubmit={(e)=>{
        e.preventDefault();
        let idClient = showClient;
        cursorClient.controllerDeleteClient(idClient)
      }}
      >
        <input
          type="submit"
          value="
      ELIMINAR CLIENTE"
        />
        <p>(Esta acción es irreversible)</p>
      </form>
    </Organism_changeStyles>
  );
}
const Organism_changeStyles = styled.div`
  width: 25%;
  height: 90vh;
  background: rgba(30, 30, 30, 1);

  .change_top {
    height: 10vh;
    h1 {
      color: rgba(180, 180, 180, 0.8);
      font-weight: bold;
      font-size: 12px;
      margin: 10px;
      padding: 5px;
      border-bottom: 2px solid rgba(120, 120, 120, 0.8);
    }
  }
  .change_bottom {
    height: 10vh;
  }
  &>form {
    width: 100%;
    display: flex;
    justify-content: start;
    align-items: center;
    flex-direction: column;
    p{
      margin: 0px;
      padding: 0px;
      font-weight: bold;
      color: #888;
      font-size: 12px;
    }
    input{
    background: rgba(100,0,0,0.8);
    color: #888;
    padding: 5px 10px;
    font-size: 12px;
    font-weight: bold;
    border-radius: 10px;
    border: none;
    transition: 300ms;
    cursor: pointer;
    &:hover{
      background: rgba(150,0,0,0.8);
      color: #eee;
    }
  }
  }

`;

export default Organism_change;
