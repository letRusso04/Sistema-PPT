import React from "react";
import { Templates_ContentClassicStyles } from "../../templates/Templates_contentClassic";
import Organism_interNavbar from "../../organisms/organism_navbar/Organism_interNavbar";
import Organism_GeneralHome from "../../organisms/Organism_GeneralHome";
import { GlobalActionsNavigation } from "../../../../../domain/Interface/Repository/NavigationRepository";
import { GlobalActionsDownload } from "../../../../../domain/Interface/Repository/DownloadRepository";
import { NavigationHome } from "../../../../../domain/Interface/local/NavigationModal";

function Home() {
  let cursorNavigation = new GlobalActionsNavigation();
  let cursorDownload = new GlobalActionsDownload();
  let createInterface = cursorNavigation.createNavigation(NavigationHome);
  return (
    <Templates_ContentClassicStyles>
     <div className="content-left"> 
      <Organism_interNavbar InterfaceList={createInterface}  />
      </div>
       

      <div className="content-right">
        <Organism_GeneralHome />
      </div>
    </Templates_ContentClassicStyles>
  );
}

export default Home;
