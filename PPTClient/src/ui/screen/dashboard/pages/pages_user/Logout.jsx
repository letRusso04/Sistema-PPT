import React from 'react'
import Organism_modalQuestion from "../../organisms/organism_modal/Organism_modalQuestion";
import styled from 'styled-components';
function Logout() {
  return (
    <LogoutStyles><Organism_modalQuestion/></LogoutStyles>
  )
}
const LogoutStyles = styled.div`
  background: rgba(0,0,0,0.8);
  width: 100vw;
  height: 90vh;
`
export default Logout