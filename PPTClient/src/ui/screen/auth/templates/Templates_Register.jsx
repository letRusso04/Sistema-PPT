import styled from "styled-components";
import panel7 from "../../../../application/Assets/img/banner3des.png";
import panel7p from "../../../../application/Assets/img/banner2des.png";
export const Templates_Register = styled.div`
  background: url("${panel7}");
  background-repeat: no-repeat;
  background-position: cover;
  background-size: cover;
  width: 100%;
  overflow: scroll;
  .content {
    width: 100%;
    height: 100vh;
    display: flex;
    color: #ccc;
    flex-direction: column;
    .content__top {
      height: 20%;
      width: 100%;
      color: rgba(200, 200, 200, 0.8);
      display: flex;
      flex-direction: column;
      align-items: start;
      justify-content: start;
      padding: 10px;
      margin-left: 5%;
      h1 {
        font-size: 25px;
        margin: 0px 0px 0px 10px;

        padding: 0px;
      }
      p {
        font-size: 25px;
        margin: 0px 0px 0px 10px;
        padding: 0px;
      }
      div{
        display: flex;
        p{
          font-size: 18px;
          padding-right: 5px;
        }
        a{
          font-size: 18px;
          color: rgba(10, 0, 150, 0.9);
          cursor: pointer;
          transition: color 300ms;
          text-decoration: none;
          &:hover{
            color: rgba(4, 0, 230, 0.9);
          }
        }
      }
    }
    .content__main {
      height: 70%;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-around;
     
      .content__main-left {
        width: 40%;
        height: 100%;
        background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.8));
        border-radius: 5px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
      .content__main-right {
        width: 40%;
        height: 100%;
        background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.8));
        border-radius: 5px;
        display: flex;

        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
    }
    .content__bottom {
      height: 15%;
      width: 100%;
      display: flex;
      align-items: end;
      justify-content: center;
      flex-direction: column;
      .content__bottom-top {
        width: 100%;
        height: 50%;
        display: flex;
        align-items: start;
        margin-top: 5px;
        justify-content: end;
        input{
          position: absolute;
          background: rgba(9, 0, 40, 0.8);
          border: none;
          outline: none;
          color: #ccc;
          cursor: pointer;
          width: 220px;
         padding: 5px 10px 5px 5px;
         border-radius: 5px;
          font-size: 20px;
          right: -10px;
          transition: 500ms;
          &:hover{
            right: 0px;
            background: rgba(32, 0, 150, 0.8);
            color: #FFF;
          }
        }
      }
      .content__bottom-bottom {
        width: 100%;
        height: 50%;
        display: flex;
        align-items: end;
        justify-content: center;
      }
    }
  }
  
`;


export default Templates_Register;