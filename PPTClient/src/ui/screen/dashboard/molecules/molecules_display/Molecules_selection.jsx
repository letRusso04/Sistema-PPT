import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Icon from "@mdi/react";
function Molecules_selection(props) {
  return (
    <Molecules_selectionStyles styles={props.active}>
      <Link className="container_select" to={props.Router}>
      <Icon  className="icon" path={props.Icon} size={1}></Icon>
        <p>{props.labelName}</p>
      </Link>
    </Molecules_selectionStyles>
  );
}
const Molecules_selectionStyles = styled.div`
.icon{
  color: #221e35;
  
}
  .container_select {
    display: flex;
    justify-content: center;
    align-items: center;
    p {
      color: rgba(15, 15, 15, 0.8);
      font-size: 12px;
      text-transform: uppercase;
      font-weight: bold;
      transition: 300ms;
    }
    &::placeholder{
      cursor: pointer;
     
    }
  }
`;

export default Molecules_selection;
