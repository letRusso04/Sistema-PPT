import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import Molecules_Friend from '../molecules/molecules_chat/Molecules_Friend';
import { AuthController } from '../../../../application/Controller/AuthController';
import { Session } from "bc-react-session";
import { GlobalActionsAccount } from '../../../../domain/Interface/Repository/AccountRepository';
function Organism_Friends() {
  const session = Session.get("user_information");
  let user_id = session.payload["user_id"];
  
  let cursorAccount = new GlobalActionsAccount();
  let cursorController = new AuthController();
  const [listUser, setListUser] = useState([]);
  useEffect(() => {
    async function fetchData() {
      await cursorController.controllerCallAccount(user_id).then((content) => {
        let createInterfaceUser = cursorAccount.createInterfaceUser(content);
        setListUser(createInterfaceUser);
      });
    }
    fetchData();

  }, 1000);
  return (
    <Organism_FriendStyle>
        <Molecules_Friend friendId="10" friendName="Usuario de PPT 1"/>
      <Molecules_Friend friendId="15" friendName="Usuario de PPT 2"/>
      <Molecules_Friend friendId="20" friendName="Usuario de PPT 3"/>
      <Molecules_Friend friendId="26" friendName="Usuario de PPT 4 "/>
      <Molecules_Friend friendId="27" friendName="Usuario de PPT 5"/>
    </Organism_FriendStyle>
  )
}
const Organism_FriendStyle = styled.div`
  width: 24vw;
  height: 100vh;
 background: linear-gradient(#111111 10%, #0a0a0a 90%);
 border-right: 2px solid rgba(80,80,80,0.6);

`;
export default Organism_Friends

/*
    {listUser && listUser.map(({userId, name})=>(
        
      ))}
*/