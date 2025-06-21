import React from "react";
import styled from "styled-components";
import image_icon from "../../../../../application/Assets/img/icon_main.png";
function Molecules_Publish(props) {
  return (
    <Molecules_PublishStyles>
      <div className="NavForm_top">
        <img src={props.userPublishUrl}></img>
        <h1>{props.userPublishName}</h1>
        <label>{props.userPublishType}</label>
      </div>
      <div className="NavForm_main">
        <p>
            {props.userPublishContent}
        </p>
        <img src={props.userPublishImage}></img>
      </div>
    </Molecules_PublishStyles>
  );
}
const Molecules_PublishStyles = styled.div`
  cursor: pointer;
  transition: 300ms;
  width: 98%;
  padding-left: 15px;
  border-radius: 5px;
  &:hover {
    background: rgba(0, 0, 0, 0.2);
  }
  margin: 0px 15px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  padding: 20px;
  .NavForm_top {
    display: flex;
        color: #020202;
    img {
      width: 50px;
      border-radius: 50px;

    }
    h1 {
      font-size: 18px;
      font-weight: bold;
      margin-left: 4px;
    }
    label {
      background: #150a74;
      margin-top: 10px;
      font-weight: bold;
      height: 20px;
      color: #999;
      padding: 1px;
      border-radius: 5px;
      margin-left: 2px;
      font-size: 12px;
      margin-left: 10px;
    }
  }
  .NavForm_main {
    p {
    color: #020202;
      font-size: 20px;
      text-align: justify;
      font-weight:bold;
    }
    img {
      width: 50%;
      height: 50%;
    }
  }
`;
export default Molecules_Publish;
