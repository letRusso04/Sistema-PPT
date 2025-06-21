import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Molecules_message from "./Molecules_message";
import { GlobalActionsMessage } from "../../../../../domain/Interface/Repository/MessageRepository";
import { InterfaceMessageChat } from "../../../../../domain/Interface/local/NavigationModal";
import { AppGetDataController } from "../../../../../application/Controller/AppController";
import { Session } from "bc-react-session";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";

function Molecules_contentchat() {
  const [content, setContent] = useState();
  const sessionInformation = Session.get("account_information");
  const API = process.env.REACT_APP_API;
  const socket = io(API);
  let userId = sessionInformation.payload["id"];
  let cursorNavigation = new GlobalActionsMessage();
  let cursorgetNavigation = new AppGetDataController();
  let cursorActions = new GlobalActionsMessage();
  let createInterfaceMessageChat = cursorNavigation.createInterfaceMessage(InterfaceMessageChat);
  let { isIDBot } = useParams();
  let { isUserMessage } = useParams();

  const onHandleController = async () => {
    if(isIDBot){
      let getDataMessageBot = cursorgetNavigation.getMessageBotController(userId);
      getDataMessageBot.then((content) => {
        if(!content) return;
        let newMessage = cursorActions.inserInterfaceMessageBot(
          createInterfaceMessageChat,
          content
        );
        setContent(newMessage);
      });
    }
    if(isUserMessage){
      let UserFriend = isUserMessage;
      let getDataMessage = cursorgetNavigation.getMessageController({userId, UserFriend});
      getDataMessage.then((content) => {
        if(!content) return;
        let newMessage = cursorActions.inserInterfaceMessage(
          createInterfaceMessageChat,
          content
        );
        setContent(newMessage);
      });
    }
  };

  useEffect(() => {
    onHandleController();
  }, 2000);
  socket.on("message_received", (MessageReceived) => {
    onHandleController();
    socket.off('message_received');

  });
  let i = 0;
  return (
    <Molecules_contentchatStyles className="Scrolling">
      {content &&
        content.map(
          ({
            imageUrl,
            nameLabel,
            botMessage,
            contentMessage,
            timestamp,
            configuration,
          }) => {
            let scrollingUpdate = document.querySelector(".Scrolling");
            setTimeout(() => {
              scrollingUpdate.scrollTop = scrollingUpdate.scrollHeight;
            }, 600);
              i++;
           return (
            <Molecules_message
              key={i}
              imageUrl={imageUrl}
              nameLabel={nameLabel}
              botMessage={botMessage}
              contentMessage={contentMessage}
              configuration={configuration}
              timestamp={timestamp}
            />
          )}
        )}
    </Molecules_contentchatStyles>
  );
}
const Molecules_contentchatStyles = styled.div`
  height: 70vh;
  width: 100%;
  overflow: scroll;
`;
export default Molecules_contentchat;
