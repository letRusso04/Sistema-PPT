import styled from "styled-components";
import panel5p from "../../../../application/Assets/img/banner1des.png";
import panel5 from "../../../../application/Assets/img/banner2des.png";
export const Templates_Home = styled.div`
  background: url("${panel5p}");
  background-repeat: no-repeat;
  background-position: cover;
  background-size: cover;
  height: 100vh;
  overflow: scroll;

  .content__main {
    width: 100vw;
    height: 90vh;
    .content__main-left {
      
      width: 100%;
      height: 90%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      color: #ccc;
    
      h1 {
        font-size: 50px;
        margin: 0px;
        width: 80%;
        padding: 0px 0px 0px 10%;
        animation-name: light_color;
        animation-duration: 2s;
        animation-iteration-count: infinite;
        animation-direction: alternate;
        @keyframes light_color {
          0% {
            color: #888;
          }
          100% {
            color: #fff;
          }
        }
      }
      p {
        font-size: 30px;
        margin: 0px;
      }
    }
    .content__main-right{
      width: 100vw;
      height: 10%;
      display: flex;
      justify-content: space-between;
      align-items: end;
      img{
        height: 80%;
      }
      p{
        color: #ccc;
        font-weight: bold;
        font-size: 14px;
        margin-left: 5px;
      }
    }
  }
  @media screen and (max-width: 750px) {
    .content__main {
      .content__main-left {
        h1 {
          font-size: 50px;
        }
        p {
          font-size: 40px;
        }
      }
    }
  }
  @media screen and (max-width: 500px) {
    .content__main {
      .content__main-left {
        h1 {
          font-size: 40px;
        }
        p {
          font-size: 30px;
        }
      }
    }
  }
`;


export default Templates_Home;