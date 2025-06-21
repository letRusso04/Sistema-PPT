
import styled from "styled-components";
export const Molecules_RegisterStyles = styled.div`
  width: 70%;
  padding: 20px;
  display: flex;
  div > p {
    font-size: 16px;
    width: 100%;
    margin: 0px;
    padding: 2px;
    color: rgba(200, 200, 200, 0.8);
  }
  div {
    width: 97%;
  }
  .select_options {
      background: none;
      width: 250px;
      margin: 10px;
      color: #e0e0e0 !important;
      font-weight: bold;
      & > div {
        background: #222222;
        font-family: Robotothin;
        &:hover {
          background: #222222 !important;
        }
      }
    }
  .format_input {
    border: 2px solid rgba(100, 100, 100, 0.5);
    width: 100%;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: start;
    padding: 5px;
    p {
      font-size: 18px;
      margin: 0px;
    }
    input {
      background: none;
      border: none;
      width: 100%;
      padding: 2px;
      font-size: 19px;
      color: #ccc;
      overflow: hidden;
    }
  }
`;
export default Molecules_RegisterStyles;
