import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

function Molecules_selectionLarge(props) {
  return (
    <Molecules_selectionLargeStyles styles={props.active}>
      <Link className="container_select" to={props.Router}>
        {props.Icon}
        <p>{props.labelName}</p>
      </Link>
    </Molecules_selectionLargeStyles>
  );
}
const Molecules_selectionLargeStyles = styled.div`
  .container_select {
    display: flex;
    justify-content: center;
    align-items: center;
  
    padding: 1px 70px 1px 1px;
    border-radius: 5px;
    transition: 300ms;
    cursor: pointer;
    &:hover {
      background: rgba(0, 0, 0, 0.2);
      p {
        color: rgba(240, 240, 240, 0.8);
      }
    }
    p {
      color: rgba(200, 200, 200, 0.8);
      font-size: 12px;
      margin: 0px;
      text-transform: uppercase;
      font-weight: bold;
    }
    transition: 300ms;
  }
`;

export default Molecules_selectionLarge;
