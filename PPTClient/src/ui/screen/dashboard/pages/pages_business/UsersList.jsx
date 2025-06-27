import { Templates_ContentGeneralStyles } from "../../templates/Templates_contentGeneral";
import Organism_interNavbar from "../../organisms/organism_navbar/Organism_interNavbar";

import { Outlet } from "react-router-dom";

function UserList() {
 
  return (
    <Templates_ContentGeneralStyles>

      <div className='content-left'>
        <Organism_interNavbar/>
      </div>
      <div className='content-right'>
        <Outlet/>
      </div>



    </Templates_ContentGeneralStyles>
  );
}

export default UserList;


