import React from "react";
import styled from "styled-components";
import Icon from "@mdi/react";
import { mdiMagnify } from "@mdi/js";
function Molecules_search() {
  return (
    <Molecules_searchStyles>
      <Icon className="icon_Search" path={mdiMagnify} size={1}></Icon>
      <input type="text" placeholder="Buscar producto"></input>
    </Molecules_searchStyles>
  );
}
const Molecules_searchStyles = styled.div`
  height: 10%;
  width: 100%;
  border-bottom: 2px solid rgba(100, 100, 100, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  .icon_Search {
    width: 20%;
    color: #888;
  }
  input {
    background: none;

    border-radius: 5px;
    padding: 5px;
    width: 80%;
    border: none;
    color: #ccc;
    font-size: 15px;
    font-weight: bold;
    &::hover {
      color: #ccc;
      font-size: 15px;
      font-weight: bold;
    }
  }
`;
export default Molecules_search;
