import React from "react";
import styled from "styled-components";
import Molecules_NavHome from "../molecules/molecules_home/Molecules_NavHome";
import { GlobalActionsPublish } from "../../../../domain/Interface/Repository/PublishRepository";
import { GlobalActionsActivity } from "../../../../domain/Interface/Repository/ActivityRepository";
import { InterfacePublishList, InterfaceActivityList } from "../../../../domain/Interface/local/NavigationModal";
function Organism_GeneralHome() {
  let cursorNavigation = new GlobalActionsPublish();

  let createPublishInterface = cursorNavigation.createPublishNavigation(InterfacePublishList);
  let cursorActivity = new GlobalActionsActivity();
  let createActivityInterface = cursorActivity.createActivityUser(InterfaceActivityList);

  return (
    <Organism_GeneralHomeStyles>
      <div className="GeneralHome_left">
        <Molecules_NavHome InterfacePublishList={createPublishInterface} />
      </div>

    </Organism_GeneralHomeStyles>
  );
}
const Organism_GeneralHomeStyles = styled.div`
  width: 100%;
  height: 90vh;
  display: flex;

  .GeneralHome_left {
    width: 100%;
    height: 100%;
    background: #8f8c8c;
  }
  .GeneralHome_right {
    width: 20%;
    height: 100%;
    background: #181818;
  }
`;
export default Organism_GeneralHome;
