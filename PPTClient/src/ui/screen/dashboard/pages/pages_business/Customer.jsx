import React, { useState, useEffect } from "react";
import { Templates_ContentGeneralStyles } from "../../templates/Templates_contentGeneral";
import Organism_interNavbar from "../../organisms/organism_navbar/Organism_interNavbar";
import Organism_visual from "../../organisms/organism_display/Organism_visual";
import Organism_change from "../../organisms/organism_display/Organism_change";
import Organism_list from "../../organisms/Organism_list";
import { GlobalActionsCustomer } from "../../../../../domain/Interface/Repository/CustomerRepository";
import { GlobalActionsNavigation } from "../../../../../domain/Interface/Repository/NavigationRepository";
import { InterfaceClientList, InterfaceCustomerList, SettingsCustomerList } from "../../../../../domain/Interface/local/NavigationModal";
import { Session } from "bc-react-session";
import { BusinessControllerRepository } from "../../../../../application/Controller/AppController";
import Icon from "@mdi/react";
import { mdiStore } from "@mdi/js";
import { InterfaceInventoryList } from "../../../../../domain/Interface/local/NavigationModal";
import { Outlet, useParams } from "react-router-dom";
import Organism_ModalShop from "../../organisms/organism_modal/Organism_ModalShop";

import styled from "styled-components";
function Customer() {
  const [business, setBusiness] = useState([]);

  let cursorNavigation = new GlobalActionsNavigation();

  let cursorBusiness = new BusinessControllerRepository();
  let createInventoryList = cursorNavigation.createNavigation(
    InterfaceInventoryList
  );
  let createSettingsList = cursorNavigation.createNavigation(
    SettingsCustomerList
  );
  const { isList, newClient, showClient } = useParams();

  const session = Session.get("user_information");
  let user_id = session.payload["user_id"];
  /* useEffect(() => {
     async function fetchData() {
       await cursorBusiness.controllerCallBusines(user_id).then((content) => {
         console.log(content);
         content.forEach((element)=>{
           let modelInsert = [{
             id: element[0],
             icon: (<Icon path={mdiStore} size={1.2} className="icon_style"></Icon>),
             labelName: element[1],
             router: `/dashboard/clientes/listado/${element[0]}`,
             active: true
           }]
            createInventoryList =  cursorNavigation.insertNavigation(createInventoryList, modelInsert);
         });
         setBusiness(createInventoryList);
       });
     }
     fetchData();
   }, 1000);*/
  return (
    <Templates_ContentGeneralStyles>

      <div className='content-left'>
        <Organism_interNavbar
          InterfaceList={business}
          InterfaceSettings={createSettingsList}
          Router="Clientes"
          LabelRouter="Cliente"
        />
      </div>
      <div className='content-right'>
        <Outlet/>
      </div>



    </Templates_ContentGeneralStyles>
  );
}

export default Customer;


