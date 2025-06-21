import React from "react";
import Organism_listNavbar from "../../organisms/organism_navbar/Organism_listNavbar";
import { Templates_ContentGeneralStyles } from "../../templates/Templates_contentGeneral";
import Organism_contentConfig from "../../organisms/organism_display/Organism_contentConfig";
import Icon from "@mdi/react";
import { mdiAccountBoxOutline, mdiLogout   } from "@mdi/js";
import { GlobalActionsNavigation } from "../../../../../domain/Interface/Repository/NavigationRepository";
import { InterfaceAccountList } from "../../../../../domain/Interface/local/NavigationModal";
function Account() {
  let cursorNavigation = new GlobalActionsNavigation();
  let createAccountInterface = cursorNavigation.createNavigation(InterfaceAccountList);
  return (
    <Templates_ContentGeneralStyles>
      <div className="content-left">
   

      </div>
      <div className="content-right">
        <Organism_contentConfig/>

      </div>
    </Templates_ContentGeneralStyles>
  );
}

export default Account;
