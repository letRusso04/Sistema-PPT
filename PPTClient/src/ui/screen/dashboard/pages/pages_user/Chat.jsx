import React from "react";

import Organism_Chat from "../../organisms/organism_chat/Organism_Chat";
import Organism_friends from "../../organisms/Organism_friends";
import Organism_interNavbar from "../../organisms/organism_navbar/Organism_interNavbar";
import { Templates_ContentGeneralStyles } from "../../templates/Templates_contentGeneral";

function Chat() {
  return (
    <Templates_ContentGeneralStyles>
      <Organism_friends></Organism_friends>
      <Organism_Chat></Organism_Chat>
    </Templates_ContentGeneralStyles>
  );
}

export default Chat;
