import React from "react";
import styled from "styled-components";
import image_icon from "../../../../../application/Assets/img/icon_main.png";

function Components_ListActivity(props) {
  return (
    <Components_listActivityStyles>
      <div className="listActivity__Top">
        <img src={image_icon}></img>
        <p>{props.ActivityName}</p>
      </div>
      <div className="listActivity__main">
        <div><div></div></div> <p>{props.activityStatusLabel}</p>
      </div>
    </Components_listActivityStyles>
  );
}
const Components_listActivityStyles = styled.div`
  width: 100%;
  border-top: 1px solid rgba(80, 80, 80, 0.2);
  padding: 10px 10px;
  cursor: pointer;
  transition: 300ms;
  &:hover{
    background: rgba(0,0,0,0.2);
  }
  .listActivity__Top {
    width: 100%;
    display: flex;
    color: #999;
    justify-content: start;
    align-items: center;
    margin: 0px;
    img {
      width: 30px;
      height: 30px;
      border-radius: 50px;

    }
    p {
      font-size: 15px;
      font-weight: bold;
      margin: 0px;
      margin-left: 5px;

    }
  }
  .listActivity__main {
    width: 100%;
    display: flex;
    margin-top: 0px;
    margin-left: 35px;
        align-items: center;
        justify-content: start;
        & > div {
          background: rgba(90, 90, 90, 0.8);
          width: 10px;
          height: 10px;
          border-radius: 100px;
          margin-right: 5px;
          display: flex;
          justify-content: center;
          align-items: center;
          div {
            width: 6px;
            height: 6px;
            background: rgba(20, 20, 20, 0.8);
            border-radius: 100px;
          }
        }
        p {
          font-size: 10px;
          color: rgba(200, 200, 200, 0.8);
          font-weight: bold;
        }
  }
`;
export default Components_ListActivity;
