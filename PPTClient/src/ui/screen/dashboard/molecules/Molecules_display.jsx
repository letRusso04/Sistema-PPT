import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Molecules_formselect from "./molecules_display/Molecules_formselect";
import { useParams } from "react-router-dom";
import { GlobalActionsProduct } from "../../../../domain/Interface/Repository/ProductRepository";
import {
  ProductControllerRepository,
  ClientControllerRepository,
} from "../../../../application/Controller/AppController";
function Molecules_display(props) {
  let { isInventory, newProduct, isList } = useParams();
  const [product, setProduct] = useState([]);
  let ControllerIndex;
  if (newProduct) {
    ControllerIndex = newProduct;
  } else if (isInventory) {
    ControllerIndex = isInventory;
  } else if (isList) {
    ControllerIndex = isList;
  } else {
    ControllerIndex = 0;
  }
  let CategoryName;
  function getDataBusiness(business) {
    business.forEach((element) => {
      if (element.id == ControllerIndex) {
        CategoryName = element.labelName;
      }
    });
  }
  let cursorProductRepo = new ProductControllerRepository();
  let cursorClientRepo = new ClientControllerRepository();
  async function callProduct() {
    let response = await cursorProductRepo.controllerCallProduct(
      ControllerIndex
    );
    if (!response) return setProduct([""]);
    response.forEach(async (element) => {
      let modelInsert = [
        {
          labelID: element[0],
          labelName: element[2],
          router: `/dashboard/inventario/producto/${ControllerIndex}/${element[0]}`,
          stock: element[3],
          currency: element[4],
          cost: element[5],
          price: element[6],
        },
      ];
      setProduct((product) => [...product, ...modelInsert]);
    });
  }
  async function callClient() {
    let response = await cursorClientRepo.controllerCallClient(ControllerIndex);
    if (!response) return setProduct([""]);
    response.forEach(async (element) => {
      console.log(element);
      let modelInsert = [
        {
          labelID: element[0],
          labelName: element[1],
          router: `/dashboard/clientes/cliente/${ControllerIndex}/${element[0]}`,
          cid: element[2],
          phone: element[3]
        },
      ];
      console.log(modelInsert);
      setProduct((product) => [...product, ...modelInsert]);
    });
  }

  useEffect(() => {
    if (!props.isClient) {
      callProduct();
    } else {
      callClient();
    }
    return () => {
      setProduct([]);
    };
  }, [ControllerIndex]);
  getDataBusiness(props.business);
  return (
    <Molecules_displayStyles>
      <Molecules_formselect
        router={
          isInventory
            ? `/dashboard/inventario/producto/nuevo/${ControllerIndex}`
            : `/dashboard/clientes/cliente/nuevo/${isList}`
        }
        labelName={isList ? `Agregar nuevo cliente` : `Agregar nuevo producto`}
        category={CategoryName}
      />
      {product &&
        product.map(({ router, labelID, labelName, subLabel, type }) => (
          <Molecules_formselect
            router={router}
            labelID={labelID}
            labelName={labelName}
            category={CategoryName}
            subLabel={subLabel}
            type={type}
          />
        ))}
    </Molecules_displayStyles>
  );
}
const Molecules_displayStyles = styled.div`
  height: 90%;
  width: 100%;
  overflow: scroll;
`;
export default Molecules_display;
