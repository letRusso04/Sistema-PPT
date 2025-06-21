import React, {useState, useEffect} from "react";
import { Templates_ContentGeneralStyles } from "../../templates/Templates_contentGeneral";
import Organism_interNavbar from "../../organisms/organism_navbar/Organism_interNavbar";
import Organism_visual from "../../organisms/organism_display/Organism_visual";
import Organism_change from "../../organisms/organism_display/Organism_change";
import Organism_list from "../../organisms/Organism_list";
import { GlobalActionsProduct } from "../../../../../domain/Interface/Repository/ProductRepository";
import {
  InterfaceInventoryList,
  SettingsInventoryList,
} from "../../../../../domain/Interface/local/NavigationModal";
import { GlobalActionsNavigation } from "../../../../../domain/Interface/Repository/NavigationRepository";
import { useParams } from "react-router-dom";
import Organism_ModalNew from "../../organisms/organism_modal/Orgamism_ModalNew";
import Organism_ModalShop from "../../organisms/organism_modal/Organism_ModalShop";
import { BusinessControllerRepository } from "../../../../../application/Controller/AppController";
import { Session } from "bc-react-session";
import Icon from "@mdi/react";
import { mdiStore } from "@mdi/js";
function Inventory() {
  const [business, setBusiness] = useState([]);

  let cursorNavigation = new GlobalActionsNavigation();

  let cursorBusiness = new BusinessControllerRepository();
  let createInventoryList = cursorNavigation.createNavigation(
    InterfaceInventoryList
  );
  let createSettingsList = cursorNavigation.createNavigation(
    SettingsInventoryList
  );
  const { isInventory, newProduct, showProduct } = useParams();

  const session = Session.get("user_information");
  let user_id = session.payload["user_id"];
  useEffect(() => {
    async function fetchData() {
      await cursorBusiness.controllerCallBusines(user_id).then((content) => {
        console.log(content);
        content.forEach((element)=>{
          let modelInsert = [{
            id: element[0],
            icon: (<Icon path={mdiStore} size={1.2} className="icon_style"></Icon>),
            labelName: element[1],
            router: `/dashboard/inventario/almacen/${element[0]}`,
            active: true
          }]
           createInventoryList =  cursorNavigation.insertNavigation(createInventoryList, modelInsert);
        });
        setBusiness(createInventoryList);

   
      });
    }
    fetchData();
  }, 1000);
  return (
    <Templates_ContentGeneralStyles>
      <div className="content-left ">
        <Organism_interNavbar
          InterfaceList={business}
          InterfaceSettings={createSettingsList}
          Router="inventory"
          LabelRouter="registro"
        />
        {isInventory != "add" && isInventory && (
          <Organism_list getBusiness={business} />
        )}
      </div>
      {isInventory == "add" && <Organism_ModalShop/>}
      {isInventory && isInventory != "add" && (
        <div className="content-right">
       {
        showProduct && (
          <><Organism_visual showProduct={showProduct} />
          <Organism_change showProduct={showProduct} /></>
        )
       }
        </div>
      )}
      {newProduct && <Organism_ModalNew />}
    </Templates_ContentGeneralStyles>
  );
}

export default Inventory;
