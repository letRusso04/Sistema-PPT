import React from "react";
import styled from "styled-components";
import Molecules_topInfo from "../../molecules/molecules_chat/Molecules_topInfo";
import Molecules_contentchat from "../../molecules/molecules_chat/Molecules_contentchat";
import Molecules_write from "../../molecules/molecules_chat/Molecules_write";
import Molecules_displayuser from "../../molecules/molecules_chat/Molecules_displayuser";
import { useParams } from "react-router-dom";
import image_icon from "../../../../../application/Assets/img/icon_svg.svg"
import { GenerateNotification } from "../../../../../application/Utilities/ToastAlert";
function Organism_ChatBot() {
  let { isIDBot } = useParams();
  let cursorNotification = new GenerateNotification();
  if(isIDBot > 1) {
    cursorNotification.notificationInfo("El servicio de las otras inteligencia está en mantenimiento, intenta más tarde.");
  }
  return (
    <Organism_ChatStyle>
      {isIDBot && isIDBot == 1 && (
        <>
          <div className="chat_left">
            <Molecules_topInfo />
            <Molecules_contentchat />
            <Molecules_write />
          </div>

          <div className="chat_right">
            <Molecules_displayuser />
          </div>
        </>
      )}
      {
        !isIDBot && (
          <div className="EmptyBot">
           <h1> Bienvenido, presiona sobre una inteligencia para conversar con ella.  <img src={image_icon}></img></h1>
           
          </div>
        )
      }
      {
        isIDBot > 1 && (
          <div className="EmptyBot">
           <h1> Bienvenido, presiona sobre una inteligencia para conversar con ella.  <img src={image_icon}></img></h1>
          </div>
        )
      }
    </Organism_ChatStyle>
  );
}
const Organism_ChatStyle = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  .chat_left {
    width: 80%;
    height: 100vh;
    background: linear-gradient(#303030 10%, #1d1d1d 90%);
    border-right: 2px solid rgba(80, 80, 80, 0.6);
  }
  .chat_right {
    width: 30%;
    height: 100vh;
    background: linear-gradient(#111111 10%, #0a0a0a 90%);
  }
  .EmptyBot{
    width: 100%;
    height: 90vh;
    background: linear-gradient(#0a0a0a 10%, #0a0a0a 80%);
    display: flex;

    h1{
      margin: auto;
      color: #aaa;
      font-size: 20px;
      font-weight: bold;
      position: relative;
    }
    img{
      width: 100px;
      height: 100px;
      position: absolute;
     
     left: 40%;
     top: -110px;
    }
  }
`;
export default Organism_ChatBot;
