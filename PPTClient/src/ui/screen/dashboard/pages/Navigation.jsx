import React from "react";
import Templates_Dashboard from "../templates/Templates_dashboard";
import { Outlet } from "react-router-dom";
import Organism_topNavbar from "../organisms/organism_navbar/Organism_topNavbar";

function Navigation() {
  return (
    <Templates_Dashboard>
      <div className="content">
      <Organism_topNavbar/>
        <div className="content__main">

          <Outlet />
        </div>
        <div className="content__bottom"></div>
      </div>
    </Templates_Dashboard>
  );
}

export default Navigation;
