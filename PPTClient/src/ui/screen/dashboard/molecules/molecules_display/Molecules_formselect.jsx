import React from "react";
import styled from "styled-components";
import image_icon from "../../../../../application/Assets/img/icon_main.png";
import { Link } from "react-router-dom";
function Molecules_formselect(props) {
  return (
    <Molecules_formselectStyles labelID={props.labelID}>
      <Link className="container_formselect" to={props.router}>
        <img src={image_icon} alt="image_icon" />
        <div className="container_formselect-information">
          <h1>{props.labelName}</h1>
          <p>Tienda {props.category}</p>
        </div>
      </Link>
    </Molecules_formselectStyles>
  );
}
const Molecules_formselectStyles = styled.div`
  .container_formselect {
    width: 250px;
    height: 45px;
    border: 1px solid rgba(80, 80, 80, 0.2);
    display: flex;
    justify-content: start;
    align-items: center;
    transition: 300ms;
    &:hover {
      background: rgba(0, 0, 0, 0.2);
      .container_formselect-information {
        color: rgba(240, 240, 240, 0.8);
      }
    }
    img {
      width: 20%;
      border-radius: 50px;
    }
    .container_formselect-information {
      color: rgba(200, 200, 200, 0.8);
      margin-left: 5px;
      h1 {
        margin: 0px;
        font-size: 14px;
      }
      p {
        margin: 0px;
        font-size: 12px;
      }
    }
  }
`;
export default Molecules_formselect;
