import React, { useState } from "react";
import styled from "styled-components";
import men_ico from "../../../../application/Assets/img/icon_hombre.png";
import women_ico from "../../../../application/Assets/img/icon_mujer.png";
import { Link } from "react-router-dom";
import { AuthController } from "../../../../application/Controller/AuthController";
function Molecules_FormUser(props) {
  let cursorController = new AuthController();
  if (props.accountActive) {
    return (
      <>
        {props.accountActive &&
          props.accountActive.map(({ userId, name, password }) => (
            
            <MoleculesStyles  onClick={() => cursorController.getAccountSession(userId, name, password)}>
              <div
                style={{ backgroundImage: `url("${men_ico}")` }}
              >
                <a>{name.toUpperCase()}</a>
              </div>
            </MoleculesStyles>
          ))}
      </>
    );
  }
  return (
    <MoleculesStyles>
      <Link>
        <div style={{ backgroundImage: `url("${men_ico}")` }}>
          <a>CREAR USUARIO ADMINISTRATIVO</a>
        </div>
      </Link>
    </MoleculesStyles>
  );
}

export default Molecules_FormUser;

const MoleculesStyles = styled.div`
  margin: 15px;
  width: 150px;
  height: 150px;
  background: url("${men_ico}");
  cursor: pointer;
  border-radius: 5px;
  position: relative;
  background-repeat: no-repeat;
  background-position: cover;
  background-size: cover;
  position: relative;
  transition: 500ms;
  &:hover {
    transform: translateY(14px);
    color: #fff;
    opacity: 0.95;
  }
  a {
    width: 100%;
    color: #aaa;
    font-size: 15px;
    font-weight: bold;
    position: absolute;
    bottom: -30%;
    left: 0px;
    text-align: center;
  }
`;
