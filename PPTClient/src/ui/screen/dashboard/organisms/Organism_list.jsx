import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Molecules_search from "../molecules/Molecules_search";
import Molecules_display from "../molecules/Molecules_display";

function Organism_list(props) {

  return (
    <Organism_listStyles>
      
      <Molecules_display  business={props.getBusiness} isClient={props.isClient}/>
    </Organism_listStyles>
  );
}
/*<Molecules_search /> */
const Organism_listStyles = styled.div`
  background: rgba(30, 30, 30, 1);
  width: 80%;
  display: flex;
  align-items: center;
  justify-content: start;
  flex-direction: column;
`;
export default Organism_list;
