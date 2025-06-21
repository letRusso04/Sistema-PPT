import styled from "styled-components";
import panel6 from "../../../../application/Assets/img/banner2des.png";
import panel6p from "../../../../application/Assets/img/banner2des.png";
export const Templates_Login = styled.div`
  background: url("${panel6}");
  background-repeat: no-repeat;
  background-position: cover;
  background-size: cover;
  width: 100vw;
  
  overflow: scroll;
  .content {
    width: 100%;
    margin-top: 50px;
    display: flex;
    color: #ccc;
    flex-direction: column;
    .content__top {
      height: 20vh;
      width: 100%;
      color: rgba(200, 200, 200, 0.8);
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: end;
      h1 {
        font-size: 30px;
        margin: 0px;
      }
      p {
        margin: 0px;
        font-size: 25px;
      }
   
      a{
        cursor: pointer;
        font-size: 16px;
        color: rgba(100,100,100,0.8);
        margin: 0px;
        padding: 0px;
        transition: color 300ms;
        text-decoration: none;
        &:hover{
          color: rgba(100,100,100,1);
        }
      }
    }
    .content__main {
      height: 60vh;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      .content__main-container {
        border-radius: 5px;
        width: 35%;
        height: 85%;
        background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.7));
        border-radius: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
      
      }
    }
    .content__bottom {
      height: 20vh;
      width: 100%;
      p {
        font-size: 20px;
      }
      display: flex;
      align-items: end;
      justify-content: center;
    }
  }
`;


export default Templates_Login;