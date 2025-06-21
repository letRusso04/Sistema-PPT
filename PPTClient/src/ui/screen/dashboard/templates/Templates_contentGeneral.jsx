import styled from "styled-components";
export const Templates_ContentGeneralStyles = styled.div`
  width: 100vw;
  height: 90vh;
  display: flex;
  .content-left {
    width: 10vw;
    height: 90vh;
    border-right: 2px solid rgba(40, 40, 40, 0.8);
    background: #181818;
    display: flex;
  }
  .content-right {
    width: 90vw;
    height: 90vh;
    display: flex;
    flex-direction: column;
    overflow: scroll;

  }
`;
