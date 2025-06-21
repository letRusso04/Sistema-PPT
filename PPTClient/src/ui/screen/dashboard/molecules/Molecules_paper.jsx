import React from "react";
import styled from "styled-components";
function Molecules_paper(props) {
  return (
    <Molecules_paperStyle>
      <span>{props.date}</span>
      <h2>{props.title}</h2>
      <p>{props.content}</p>
    </Molecules_paperStyle>
  );
}
const Molecules_paperStyle = styled.div`
  width: 80%;
  margin: 15px;
  padding: 15px;
  span {
    font-weight: bold;
    color: rgba(200, 200, 200, 0.8);
    font-size: 14px;
    text-transform: uppercase;
  }
  h2{
    font-weight: bold;
    color: rgba(200, 200, 200, 1);
    font-size: 18px;
    text-transform: uppercase;
  }
  p{
    font-weight: bold;
    color: rgba(200, 200, 200, 1);
    font-size: 14px;
    text-transform: uppercase;
    text-align: justify;
  }
`;

export default Molecules_paper;

