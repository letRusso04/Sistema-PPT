import React from 'react'
import styled from 'styled-components';
import image_icon from '../../../../../application/Assets/img/icon_hombre.png'
import { Session } from "bc-react-session";
function Molecules_Friend(props) {
    function onClickFriend(friendID){window.location.href =  `/dashboard/mensajes/${friendID}`;}
    const sessionInformation = Session.get("account_information");
    let userId = sessionInformation.payload["id"];
   // if(props.friendId == userId) return;
  return (
    <Molecules_FriendStyles onClick={()=>onClickFriend(props.friendId)} >
      <img src={image_icon} alt='image_icon'></img>
        <p>{props.friendName}</p>
    </Molecules_FriendStyles>
  )
}


const Molecules_FriendStyles = styled.div`
    
width: 100%;
height: 45px;
cursor: pointer;
padding: 10px 0px;
display: flex;
justify-content: start;
align-items: center;
transition: 300ms;
&:hover{
    background: rgba(0,0,0,0.5);
    color: #aaa;
}
p{
    color: #888;
    font-weight: bold;
    font-size: 14px;
    margin-left: 10px;
}
img{
    width: 40px;
    height: 80%;
    border-radius: 50px;
}
`
export default Molecules_Friend

/*
category
: 
{permissionsLabel: 'Administrativo', permissionsLevel: 4}
country
: 
"123456"
date
: 
"7 de Junio de 2024"
description
: 
"Desarrollador de la aplicación"
images
: 
{imageUrl: 'image.url', imageFondUrl: 'imageFond.url'}
lastConnection
: 
"Thu, 04 Jul 2002 00:00:00 GMT"
name
: 
"Yeicker Colmenares"
password
: 
"San Juan de Colon"
userId
: 
"c6ba3558"

*/