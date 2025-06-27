import React from "react";
import styled from "styled-components";
import Icon from "@mdi/react";
import {
  mdiWindowClose,
  mdiMessageOutline,
  mdiAccountBoxOutline,
  mdiProgressClose
} from "@mdi/js";
import { Session } from "bc-react-session";
import { Hooks_Dashboard } from "../../../../../application/Hooks/Hooks_Dashboard";
import icon_image from "../../../../../application/Assets/img/icon_hombre.png";
import { NavLink } from "react-router-dom";
import profile from "../../../../../application/Assets/img/icon_hombre.png";
 import { GlobalAPIRouter } from "../../../../../infrastructure/router/ServicesRouter";

function Molecules_rightNavbar(props) {
  const sessionData = Session.get("user_information");
  let imageUrl = sessionData.payload["user_image"];
  let router = new GlobalAPIRouter();
   const avatarURL = imageUrl
      ? `${router.routerUser.callImage}${imageUrl}`
      : icon_image;
  const { hooksAvailable, hooksOnResponse } = Hooks_Dashboard();
  return (
    <Organism_SelectStyles>
      <div
        className="container__SelectOption"
        style={{ zIndex: hooksOnResponse.onResponseRightNavbar() ? "10" : "0" }}
      >
        <img
          src={avatarURL}
          onClick={() => hooksAvailable.onHandleSetRightNavbar(true)}
          style={{ margin: 5, cursor: "pointer" }}
        ></img>
        {hooksOnResponse.onResponseRightNavbar() && (
          <div
            onClick={() => hooksAvailable.onHandleSetRightNavbar(true)}
            className="block__screen"
          ></div>
        )}
        <div
          style={{
            right: hooksOnResponse.onResponseRightNavbar() ? "-20px" : "-100vw",
            display: "hidden",
          }}
          className="container__SelectOption-navbar"
        >
          <div className="SelectOption__navbar-top">
            <div className="SelectOption__navbar-topProfile">
              <img src={avatarURL} style={{ opacity: 0.8 }}></img>
              <div className="navbar__topProfile-userData">
                <h1>Patria Para Todos</h1>
                <div className="topProfile__userData-states">
                  <div className="topProfile__userData-states-visible"></div>
                  <p>Conectado</p>
                </div>
              </div>
            </div>
   
   
          </div>
          <div className="SelectOption__navbar-main">

            <div className="LinkContainer" key={"0"}>
              <NavLink to="/dashboard/micuenta" className="List-selection">
                <div className="Linkicon">  <Icon
                  path={mdiAccountBoxOutline}
                  size={1.2}
                  className="icon_style"
                ></Icon></div>
                <span>Mi cuenta</span>
              </NavLink>
            </div>
            <div className="LinkContainer" key={"0"}>
              <NavLink to="/dashboard/mensajes" className="List-selection">
                <div className="Linkicon">  <Icon
                  path={mdiMessageOutline}
                  size={1.2}
                  className="icon_style"
                ></Icon></div>
                <span>Mensajeria</span>
              </NavLink>
            </div>
                 <hr></hr>
            <div className="LinkContainer" key={"0"}>
              <NavLink to="/dashboard/salir" className="List-selection">
                <div className="Linkicon">  <Icon
                  path={mdiProgressClose}
                  size={1.2}
                  className="icon_style"
                ></Icon></div>
                <span>Desconectar</span>
              </NavLink>
            </div>
       

          </div>
          <div className="SelectOption__navbar-bottom">
            <p style={{ fontSize: 10, cursor: "pointer" }}>
              Condiciones y Politicas de uso · Privacidad · PPT2025
            </p>
          </div>
        </div>
      </div>
    </Organism_SelectStyles>
  );
}
/*
export const navigationRightRouter = [
 

},
{
labelName: "Desconectar",
icon: <Icon path={mdiProgressClose} size={1}></Icon>,
router: "",
separator: 0,
category: {
labelVisible: false,
labelName: "Desconecion",
permissions: false,
},
},
];
 */
const Organism_SelectStyles = styled.div`

  .block__screen {
    width: 110vw;
    height: 110vh;
    background: rgba(0, 0, 0, 0.7);
    position: absolute;
    right: -15px;
    top: -10px;
  }
  .container__SelectOption {

    color: #aaa;
    margin: 8px 10px 0px 0px;
    transition: color 300ms;
    position: relative;

    &:hover {
      color: #fff;
    }

    .container__SelectOption-navbar {
      position: absolute;
      top: 0px;
      width: 24.2vw;
      height: 100vh;
      background: #0a0a0a;
      transition: 200ms;

      .SelectOption__navbar-top {
        width: 100%;
        height: 10vh;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .SelectOption__navbar-topProfile {
          width: 100%;
          display: flex;
          justify-content: start;
          align-items: center;
          margin-left: 15px;
          .navbar__topProfile-userData {
            h1 {
              font-size: 14px;
              margin: 0px;
              color: #bbb;
            }
          }
          .topProfile__userData-states {
            display: flex;
            align-items: center;
            justify-content: start;
            p {
              font-size: 14px;
              margin: 0px;
              font-weight: bold;
              color: #888;
            }
            .topProfile__userData-states-visible {
              margin: 5px 5px 0px 0px;
              width: 10px;
              height: 10px;
              background: #016d21;
              border-radius: 50px;
            }
          }
        }
      }
      .SelectOption__navbar-main {
        width: 100%;
        height: 80vh;
        & > p {
          color: #888;
          font-size: 15px;
          font-weight: bold;
          margin: 2px 2px 2px 20px;
        }
        & > hr {
          opacity: 0.7;

          border: 0.2px solid rgba(100, 100, 100, 0.5);
        }
        .List-selection {
          display: flex;
          justify-content: start;
          text-align: center;
          align-items: center;
          padding-left: 15px;
          color: #aaa;
          text-decoration: none;
          cursor: pointer;

          transition: 300ms;
          border-radius: 8px;
          &:hover {
            background: rgba(50, 50, 50, 0.8);
          }
          .Linkicon {
            margin-top: 8px;
            color: #777;
          }
          span {
            font-size: 15px;
            margin-left: 5px;
            text-decoration: none;
          }
        }
      }
      .SelectOption__navbar-bottom {
        width: 100%;
        height: 10vh;
        p {
          color: #666;
          padding-left: 15px;
          margin: 0px;
          font-weight: bold;
        }
      }
    }
  }
`;
export default Molecules_rightNavbar;
