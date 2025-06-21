import React from "react";
import styled from "styled-components";
import image_icon from "../../../../../application/Assets/img/icon_hombre.png";
import { useParams } from "react-router-dom";
function Molecules_topInfo(props) {
  let { isIDBot } = useParams();
  let { isUserMessage } = useParams();

  return (
    <Molecules_topInfoStyles>
      <img src={image_icon} alt="image_icon" />

      <div className="topInfo_content">
        {isUserMessage && (
          <>
            <div className="topInfo_top">
              <p>¡Nueva funcionalidad para iniciar conversaciones!</p>
              </div>
   
        
          </>
        )}
        {isIDBot && (
          <>
            <div className="topInfo_top">
              <p>Dante Aligheri</p> <label>BOT</label>
            </div>
          </>
        )}
      </div>
    </Molecules_topInfoStyles>
  );
}

/*

           <div className="topInfo_bottom">
                <label></label>
                <p>Disponible</p>
              </div>
*/
const Molecules_topInfoStyles = styled.div`
  width: 100%;
  height: 10vh;
  background: rgba(30, 30, 30, 1);

  display: flex;
  img {
    border-radius: 50px;
    height: 80%;
    margin-left: 10px;
    margin-top: 1%;
    width: 50px;
  }
  .topInfo_content {
    display: flex;
    flex-direction: column;
    .topInfo_top {
      height: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 15px;
      p {
        font-size: 15px;
        color: #999;
        font-weight: bold;
        margin-left: 5px;
      }

      label {
        background: #131313;
        color: #999;
        border-radius: 5px;
        padding: 2px 5px;
        font-size: 10px;
        margin-left: 5px;
      }
    }
    .topInfo_bottom {
      height: 50%;
      display: flex;
      justify-content: start;
      align-items: center;

      p {
        font-size: 14px;
        color: #888;
        font-weight: bold;
        margin-left: 5px;
        margin-top: 12px;
      }
      label {
        width: 10px;
        height: 10px;
        background: #4d5300;
        margin-left: 10px;
        border-radius: 50px;
      }
    }
  }
`;
export default Molecules_topInfo;
