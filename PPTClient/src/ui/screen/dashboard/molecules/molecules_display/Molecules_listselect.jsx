import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
function Molecules_listselect(props) {
  return (
    <Molecules_listselectStyles>
      <Link to={props.router} className="container_listselect">
        <div className="listselect-left">
          <img src={props.imageUrl.image_icon} alt="" srcset="" />
        </div>
        <div className="listselect-right">
          <div className="listselect-label">
            <h1>{props.nameContent}</h1> <label>BOT</label>
          </div>
          <div className="listselect-status">
            <label></label> <h1>{props.status}</h1>
          </div>
        </div>
      </Link>
    </Molecules_listselectStyles>
  );
}
/*
        contentID={botID}
            nameContent={nameBot} 
            imageUrl={imageUrl}
            router={router}
            status={status}
*/
const Molecules_listselectStyles = styled.div`
  .container_listselect {
    width: 100%;
    height: 70px;
    border-top: 2px solid rgba(100, 100, 100, 0.2);
    margin: 5px 10px;
    padding-top: 5px;
    display: flex;
    cursor: pointer;
    transition: 300ms;
    border-radius: 5px;

    &:hover {
      background: rgba(0, 0, 0, 0.2);
    }
    .listselect-left {
      width: 20%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;

      img {
        width: 100%;
        border-radius: 50px;
      }
    }
    .listselect-right {
      width: 70%;
      height: 100%;
      display: flex;
      flex-direction: column;
      .listselect-label {
        display: flex;
        h1 {
          margin-left: 5px;
          font-size: 14px;
          color: #aaa;
        }
        label {
          display: flex;
          align-items: center;
          justify-content: center;
          background: #131313;
          font-size: 10px;
          width: 30px;
          height: 18px;
          border-radius: 5px;
          color: #aaa;
        }
      }
      .listselect-status {
        display: flex;
        text-align: center;
        h1 {
          padding: 0px;
          margin: 0px;
          margin-left: 5px;
          font-size: 14px;
          color: #999;
        }
        label {
          background: #4d5300;
          margin-top: 8px;
          width: 10px;
          height: 10px;
          border-radius: 5px;
        }
      }
    }
  }
`;
export default Molecules_listselect;
