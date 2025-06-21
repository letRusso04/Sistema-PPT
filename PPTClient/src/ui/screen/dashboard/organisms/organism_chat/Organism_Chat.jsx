import React from "react";
import styled from "styled-components";
import Molecules_topInfo from "../../molecules/molecules_chat/Molecules_topInfo";
import Molecules_contentchat from "../../molecules/molecules_chat/Molecules_contentchat";
import Molecules_write from "../../molecules/molecules_chat/Molecules_write";
import Molecules_displayuser from "../../molecules/molecules_chat/Molecules_displayuser";
import { useParams } from "react-router-dom";
import image_icon from "../../../../../application/Assets/img/PPTLogo.png";
import { GenerateNotification } from "../../../../../application/Utilities/ToastAlert";
function Organism_Chat() {
  let { isUserMessage } = useParams();
  let cursorNotification = new GenerateNotification();
  return (
    <Organism_ChatStyle>
      {isUserMessage && (
        <div className="chat_left">
          <Molecules_topInfo />
          <Molecules_contentchat />
          <Molecules_write />
        </div>
      )}

      {!isUserMessage && (
        <div className="Empty">
          <h1>
            Bienvenido, presiona sobre una persona para conversar con ella.
            <img src={image_icon}></img>
          </h1>
        </div>
      )}
    </Organism_ChatStyle>
  );
}

const Organism_ChatStyle = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  .chat_left {
    width: 100%;
    height: 100vh;
    background: linear-gradient(#303030 10%, #1d1d1d 90%);
    border-right: 2px solid rgba(80, 80, 80, 0.6);
  }
  .Empty {
    width: 100%;
    height: 90vh;
    background: linear-gradient(#0a0a0a 10%, #0a0a0a 80%);
    display: flex;

    h1 {
      margin: auto;
      color: #aaa;
      font-size: 20px;
      font-weight: bold;
      position: relative;
    }
    img {
      width: 100px;
      height: 100px;
      position: absolute;

      left: 40%;
      top: -110px;
    }
  }
`;
export default Organism_Chat;
