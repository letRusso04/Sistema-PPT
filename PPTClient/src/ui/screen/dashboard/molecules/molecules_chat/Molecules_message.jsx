import React from 'react'
import styled from 'styled-components';
import image_icon from "../../../../../application/Assets/img/icon_main.png"
function Molecules_message(props) {

  return (
    <Molecules_messageStyles>
        <div className="message_left">
            <img src={image_icon} alt="" />
        </div>
        <div className="message_right">
            <div className="message_right-top">
                <p className="userName">{props.nameLabel}</p> <p className="timestamp">{props.timestamp}</p>
            </div>
            <div className="message_right-bottom">
                <p className="content_Message">{props.contentMessage}</p>
            </div>
        </div>
    </Molecules_messageStyles>
  )
}
const Molecules_messageStyles = styled.div`
    width: 100%;
    display: flex;
    .message_left{
        width: 10%;
        display: flex;
        align-items: center;
        justify-content: center;
        img{
            height: 50px;
            width: 50px;
            border-radius: 50px;
        }
    }
    .message_right{
        width: 70%;
     
        .message_right-top{
            display: flex;
            justify-content: start;
            height: 30px;
            .userName{
                color: #aaa;
                font-weight: bold;
                padding: 0px;
            }
            .timestamp{
                color: #888;
                margin-left: 5px;
                font-size: 12px;
                padding-top: 5px;
            }
        }
        .message_right-bottom{
            display: flex;
            padding: 0px;
            justify-content: start;
            align-items: start;
            .content_Message{
                margin: 10px 0px;
                color: #ccc;
                font-size: 16px;
            }
        }
    }




`
export default Molecules_message