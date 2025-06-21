import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Session } from "bc-react-session";
import { GenerateNotification } from "../../../../../application/Utilities/ToastAlert";
import { ToastContainer } from "react-toastify";
function Organism_modalQuestion() {
  let cursorNotification = new GenerateNotification();
  function LogoutUser(){
    Session.destroy();
    localStorage.removeItem("account_information");
    localStorage.removeItem("user_information");
    localStorage.removeItem("user_business");
    cursorNotification.notificationSuccess("Desconectando usuario...");
    setTimeout(()=>{
      window.location.href="/";
    },5000);
  
  }
  return (
    <Organism_modalQuestionStyles>
      <div className="modalQuestion-top">
        <h1>¿Seguro que quieres desconectar?</h1>
      </div>
      <div className="modalQuestion-main">
        <Link className="isButton" to="/dashboard"style={{background:"#800"}}>CANCELAR</Link>
        <div className="isButton" onClick={()=> LogoutUser()} style={{background:"#660366"}}>
        ACEPTAR
        </div>
      </div>
      <ToastContainer/>
    </Organism_modalQuestionStyles>
  );
}
const Organism_modalQuestionStyles = styled.div`
  position: absolute;
  width: 450px;
  height: 250px;
  background: rgba(30, 30, 30, 1);
  left: 30%;
  top: 30%;
  border-radius: 5px;
  .modalQuestion-top {

    width: 100%;
    height: 60%;
    display: flex;
    align-items: center;
    justify-content: center;
    h1 {
      color: #ccc;
      font-size: 24px;
      font-weight: bold;
    }
  }
  .modalQuestion-main{
    height: 40%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    background: #181818;
    .isButton{
        border: none;
        border-radius: 5px;
        cursor: pointer;
        color: #aaa;
        font-size: 20px;
        padding: 5px 10px;
        transition: 300ms;
        font-weight: bold;
        &:hover{
            background: rgba(0,0,0,0.2);
            color: #ffff;
        }
    }
  }
`;
export default Organism_modalQuestion;
