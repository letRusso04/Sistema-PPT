import styled from "styled-components";
import panel8 from "../../../../application/Assets/img/banner2des.png";
import panel8p from "../../../../application/Assets/img/banner2des.png";
export const Templates_Control = styled.div`
background: url("${panel8}");
  background-repeat: no-repeat;
  background-position: cover;
  background-size: cover;
  width: 100%;
  overflow: scroll;
  height: 100vh;
  animation-name: move_background;
  animation-duration: 5s;
  animation-iteration-count: infinite;
  animation-direction: alternate;
  @keyframes move_background {
    0% {
      background: url("${panel8}");
      background-repeat: no-repeat;
      background-position: cover;
      background-size: cover;
    }
    100% {
      background: url("${panel8p}");
      background-repeat: no-repeat;
      background-position: cover;
      background-size: cover;
    }
  }
  .content__top {
    width: 100%;
    height: 20vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    h1{
      color: #aaa;
      font-size: 30px;
      margin: 0px;
      padding: 0px;
    }
    a{
      color: #888;
      font-size: 20px;
      margin: 0px;
      padding: 0px;
      cursor: pointer;
      transition: color 300ms;
      &:hover{
        color: #eee;

      }
    }
  }
  .content__main {
    width: 100vw;
    height: 60vh;
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-wrap: wrap;

  }
  .content__bottom {
    width: 100%;
    height: 20vh;
    display: flex;
    align-items: end;
    justify-content: center;
    color: #aaa;
    font-weight: bold;
  }
`;


export default Templates_Control;