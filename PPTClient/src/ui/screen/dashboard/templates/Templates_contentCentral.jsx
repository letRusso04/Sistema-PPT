import styled from "styled-components";
export const Templates_ContentCentralStyles = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  background: rgba(0, 0, 0, 0.5);
  .content-left {
    width: 50%;
    height: 90vh;
    border-right: 2px solid rgba(100, 100, 100, 0.5);
    overflow: scroll;
  }
  .content-right {
    width: 50%;
    height: 90vh;
    overflow: scroll;
  }
`;

export const Implements_ContentCentral = {
  extends_News: {
    h1: {
      margin: "20px",
      textTransform: "uppercase",
      fontSize: "30px",
      color: "rgba(210, 210, 210, 0.8)",
    },
  },
};
