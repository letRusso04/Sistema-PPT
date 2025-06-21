import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
function Molecules_Navbar() {
  return (
    <Molecules_NavbarStyles>
      <div className="option__navbar-content">
        <div className="option__navbar-select">
          <a>Sistema de Registro Patria Para Todos</a>
        </div>
      </div>

      <div className="option__navbar">
        <Link to="/inicio">
          <a>Iniciar sesión</a>
        </Link>
      </div>
    </Molecules_NavbarStyles>
  );
}
const Molecules_NavbarStyles = styled.div`
  width: 100%;
  height: 10vh;
  font-size: 20px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: #ccc;
  margin: 5px;
  .option__navbar-content {
    display: flex;
    justify-content: space-end;
    align-items: center;
    width: 80%;

    a {
      font-size: bold;
      cursor: pointer;
    }
  }
  .option__navbar {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 13%;
    border: 1px solid rgba(100, 100, 100, 0.5);
    border-radius: 5px;
    a {
      padding: 7px;
      cursor: pointer;
      transition: color 300ms;
      text-decoration: none;
      color: #ccc;
      &:hover {
        color: #fff;
      }
    }
  }
  .option__navbar-select {
    margin: 20px;
    a {
      cursor: pointer;
    }
  }

  @media screen and (max-width: 750px) {
    .option__navbar {
      width: 100%;
      justify-content: end;
      margin: 20px;
      a {
        font-size: 25px;
      }
    }
    .option__navbar-select {
      display: none;
    }
    .option__navbar-content {
      display: none;
    }
  }
  @media screen and (max-width: 45px) {
    .option__navbar {
      width: 100%;
      justify-content: end;
      margin: 20px;
      a {
        font-size: 25px;
      }
    }
  }
`;
export default Molecules_Navbar;
