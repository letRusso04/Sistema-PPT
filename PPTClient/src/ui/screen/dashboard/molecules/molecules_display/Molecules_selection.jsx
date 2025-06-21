import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

function Molecules_selection(props) {
  return (
    <Molecules_selectionStyles styles={props.active}>
      <Link className="container_select" to={props.Router}>
        {props.Icon}
        <p>{props.labelName}</p>
      </Link>
    </Molecules_selectionStyles>
  );
}
const Molecules_selectionStyles = styled.div`
  .container_select {
    display: flex;
    justify-content: center;
    align-items: center;
    p {
      color: rgba(15, 15, 15, 0.8);
      display: none;
      font-size: 12px;
      text-transform: uppercase;
      font-weight: bold;
       transition: 300ms;
    }
  }
`;

export default Molecules_selection;
