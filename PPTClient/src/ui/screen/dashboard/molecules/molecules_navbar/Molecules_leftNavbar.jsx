import React from "react";
import styled from "styled-components";
import Icon from "@mdi/react";
import {
  mdiReorderHorizontal,
  mdiWindowClose,
  mdiHomeOutline,
  mdiNewspaperVariantMultiple,
  mdiFaceAgent,
  mdiTruckCargoContainer,
  mdiClipboardListOutline,
  mdiShopping,
  mdiChartBarStacked,
  mdiStorefront,
  mdiCardAccountDetailsOutline,
} from "@mdi/js";
import { Hooks_Dashboard } from "../../../../../application/Hooks/Hooks_Dashboard";
import icon_image from "../../../../../application/Assets/img/icon_main.png";
import { NavLink } from "react-router-dom";
function Molecules_leftNavbar(props) {
  const { hooksAvailable, hooksOnResponse } = Hooks_Dashboard();
 
  return (
    <Organism_SelectOptionStyles>
      <div className="container__SelectOption">
        <Icon
          onClick={() => hooksAvailable.onHandleSetNavbar(true)}
          style={{ margin: 5, cursor: "pointer" }}
          path={mdiReorderHorizontal}
          size={1.2}
        ></Icon>
        {hooksOnResponse.onResponseNavbar() && (
          <div
            onClick={() => hooksAvailable.onHandleSetNavbar(true)}
            className="block__screen"
          ></div>
        )}
        <div
          style={{
            left: hooksOnResponse.onResponseNavbar() ? "-5px" : "-100vw",
            zIndex: hooksOnResponse.onResponseNavbar() ? "10" : "0",
          }}
          className="container__SelectOption-navbar"
        >
          <div className="SelectOption__navbar-top">
            <img src={icon_image} style={{ opacity: 0.8, height: "30px" }}></img>
            <Icon
              onClick={() => hooksAvailable.onHandleSetNavbar(true)}
              style={{ margin: 10, cursor: "pointer" }}
              path={mdiWindowClose}
              size={1}
            ></Icon>
          </div>
          <div className="SelectOption__navbar-main">
            {props.traceRouter.map(({ icon, labelName, router, category, separator }) => (
              <>
                {category.labelVisible != false && <p>{category.labelName}</p>}
                <div className="LinkContainer" key={labelName}>
                  <NavLink to={router} className="List-selection">
                    <div className="Linkicon">{icon}</div>
                    <span>{labelName}</span>
                  </NavLink>
                </div>
                {separator && <hr></hr>}
              </>
            ))}
          </div>
          <div className="SelectOption__navbar-bottom">
            <p style={{ fontSize: 10 }}>
              © 2025 PPT2025, Sofware de uso libre.
            </p>
            <p style={{ fontSize: 8 }}>
              SISTEMA INFORMÁTICO PARA EL REGISTRO DE COMERCIALIZACIÓN DE
              PRODUCTOS
            </p>
          </div>
        </div>
      </div>
    </Organism_SelectOptionStyles>
  );
}

const Organism_SelectOptionStyles = styled.div`
  .block__screen {
    width: 110vw;
    height: 110vh;
    background: rgba(0, 0, 0, 0.7);
    position: absolute;
    left: -10px;
    top: 0px;
    z-index: 1;
  }
  .container__SelectOption {
    margin-left: 5px;
    color: #aaa;
    padding: 10px;
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
export default Molecules_leftNavbar;
