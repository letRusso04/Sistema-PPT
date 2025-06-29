import React from "react";
import styled from "styled-components";
import user_panel from "../../../../../application/Assets/img/icon_hombre.png";
import Molecules_selection from "../../molecules/molecules_display/Molecules_selection";
import { mdiAccount, mdiAccountArrowUp } from "@mdi/js";
function Organism_interNavbar(props) {
  return (
    <Organism_interNavbarStyle>
      <div className="content__interNavbar-hover">
        <div className="container_selection">
              <Molecules_selection
                Icon={mdiAccount}
                labelName="Usuario"
                Router="/dashboard/registro/miembros"
                active={true}
              />
              <Molecules_selection
                Icon={mdiAccountArrowUp}
                labelName="Registro"
                Router="/dashboard/registro/verificacion"
                active={true}
              />
        </div>
      </div>
    </Organism_interNavbarStyle>
  );
}

const Organism_interNavbarStyle = styled.div`
  width: 100%;
  height: 100vh;
  background:#969697;
    border-right: 2px solid rgba(80, 80, 80, 0.6);
  display: flex;
  align-items: center;
  padding-left: 2px;
  justify-content: space-between;
  flex-direction: column;
 overflow: scroll;

  .content__interNavbar-hover {
         p {
        display: initial;
      }
    .container_selection {
      height: 75%;

      display: flex;
      flex-direction: column;
      justify-content: start;
      align-items: start;
    }
    .container_settings {
      height: 25%;
      display: flex;
      flex-direction: column;
      justify-content: end;
      align-items: start;
    }
  }

  .icon_style {
    color: #070707;
    padding-left: 4px;
    margin: 8px 3px;
    cursor: pointer;
    transition: 300ms;
    &:hover {
      color: #000000;
    }
  }

`;

export default Organism_interNavbar;

