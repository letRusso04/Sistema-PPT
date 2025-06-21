import React from "react";
import styled from "styled-components";
import { Hooks_Message } from "../../../../../application/Hooks/Hooks_App";
import { AppController } from "../../../../../application/Controller/AppController";
import { useParams } from "react-router-dom";
import { Session } from "bc-react-session";
import { io } from "socket.io-client";
const API = process.env.REACT_APP_API;
const socket = io(API);
function Molecules_write() {
  const cursorControlador = new AppController();
  const { hooksAvailable, hooksOnResponse } = Hooks_Message();
  let { isIDBot } = useParams();
  let { isUserMessage } = useParams();
  const sessionInformation = Session.get("account_information");
  let userId = sessionInformation.payload["id"];
  let controllerMessage = false;
  return (
    <Molecules_writeStyles>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          let input = document.getElementById("write-chat");
          input.value = "";
          if (!controllerMessage) {
            cursorControlador.controllerMessage(
              hooksOnResponse.onResponseMessage()
            );
            controllerMessage = true;
            socket.emit("message_send", hooksOnResponse.onResponseMessage());
            setTimeout(() => {
              controllerMessage = false;
            }, 10000);
          }
        }}
        method="POST"
      >
        <input
          type="text"
          id="write-chat"
          placeholder="Escribe aqui para enviar un mensaje"
          autoComplete="off"
          onChange={(e) => {
            hooksAvailable.onHandleChatbot(isIDBot);
            hooksAvailable.onHandleFriend(isUserMessage);
            hooksAvailable.onHandleUserId(userId);
            hooksAvailable.onHandleMessageSubmit(e.target.value);
          }}
        />
      </form>
    </Molecules_writeStyles>
  );
}
const Molecules_writeStyles = styled.div`
  form {
    width: 100%;
    height: 10vh;
    background: #0f0f0f;
    padding: 15px;
    display: flex;

    input {
      background: rgba(50, 50, 50, 0.8);
      width: 80%;
      height: 50%;

      border: 2px solid rgba(50, 50, 50, 0.8);
      border-radius: 5px;
      color: #999;
      font-size: 15px;
      font-weight: bold;
      &::placeholder {
        color: #666;
        font-size: 15px;
        font-weight: bold;
        padding: 5px;
      }
    }
  }
`;
export default Molecules_write;
