import React from "react";
import Molecules_leftNavbar from "../../molecules/molecules_navbar/Molecules_leftNavbar";
import Molecules_rightNavbar from "../../molecules/molecules_navbar/Molecules_rightNavbar";
import icon_main from "../../../../../application/Assets/img/icon_main.png";
import { Link } from "react-router-dom";
import Icon from "@mdi/react";
import { mdiBellCircle, mdiChat, mdiGithub } from "@mdi/js";
import styled from "styled-components";
import { GlobalActionsNavigation } from "../../../../../domain/Interface/Repository/NavigationRepository";
import { navigationRightRouter, NavigationLeftRouter } from "../../../../../domain/Interface/local/NavigationModal";

function Organism_topNavbar() {
  let cursorNavigation = new GlobalActionsNavigation();
  let createInterfaceRight = cursorNavigation.createNavigation(navigationRightRouter);
  let createInterfaceLeft = cursorNavigation.createNavigation(NavigationLeftRouter);
  return (
    <Organism_topNavbarStyles>
      <div className="content_left">
        <Molecules_leftNavbar traceRouter={createInterfaceLeft} />

        <Link to="/dashboard/home">
          <a className="content_left-textLabel">Dashboard</a>
        </Link>
      </div>
      <div className="content_right">
        <a>Patria Para Todos</a>
        <Icon
          style={{ margin: 5, color: "#aaa" }}
          path={mdiChat}
          size={1.2}
        ></Icon>
        <Icon
          style={{ margin: 5, color: "#aaa" }}
          path={mdiBellCircle}
          size={1.2}
        ></Icon>
        <Molecules_rightNavbar traceRouter={createInterfaceRight} />
      </div>
    </Organism_topNavbarStyles>
  );
}

const Organism_topNavbarStyles = styled.div`
  height: 10vh;
  width: 100%;
  display: flex;
  background: linear-gradient(#030202 10%, #080606 90%);
  border-bottom: 1px solid rgba(100, 100, 100, 0.5);
  .content_left {
    display: flex;
    justify-content: start;
    align-items: center;
    color: #aaa;
    width: 50%;
    img {
      width: 50px;
      margin: 10px;
      cursor: pointer;
      transition: opacity 300ms;
      &:hover {
        opacity: 0.8;
      }
    }

    a.content_left-textLabel {
      color: #aaa;
      font-size: 15px;
      font-weight: bold;
      cursor: pointer;
      padding: 5px;
      border-radius: 5px;
      transition: color 300ms;
      &:hover {
        background: rgba(50, 50, 50, 0.8);
      }
    }
  }
  .content_right {
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: end;

    & > a {
      font-size: 14px;
      font-weight: bold;
      color: #ccc;
      margin-right: 5px;
      cursor: pointer;
      transition: 300ms;
    }
    img {
      width: 35px;
      height: 35px;
      border-radius: 100px;
      margin-right: 5px;
      cursor: pointer;

      border: 1px solid rgba(100, 100, 100, 0.7);
    }
  }
`;

export default Organism_topNavbar;
