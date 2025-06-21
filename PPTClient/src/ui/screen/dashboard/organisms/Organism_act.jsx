import React from "react";
import styled from "styled-components";
function Organism_act(props) {
  switch (props.type) {
    case "gold":
      return (
        <Organism_actStyleGold>
          <span>{props.date}</span>
          <h1>{props.title}</h1>
          <div className="content_act">
            {props.content.map((element) => (
              <p>{element}</p>
            ))}
          </div>
        </Organism_actStyleGold>
      );
    case "clasic":
      return (
        <Organism_actStyleClassic>
          <span>{props.date}</span>
          <h1>{props.title} </h1>
          <div className="content_act">
            {props.content.map((element) => (
              <p>{element}</p>
            ))}
          </div>
        </Organism_actStyleClassic>
      );
    case "upgrade":
      return (
        <Organism_actStyleUpgrade>
          <span>{props.date}</span>
          <h1>{props.title} </h1>
          <div className="content_act">
            {props.content.map((element) => (
              <p>{element}</p>
            ))}
          </div>
        </Organism_actStyleUpgrade>
      );
  }
}

const Organism_actStyleClassic = styled.div`
  width: 90%;
  flex-wrap: wrap;
  border-radius: 5px;
  padding: 10px;;
  margin: 10px;
  color: #ccc;
  background: radial-gradient(
    circle,
    rgba(68, 68, 68, 1) 0%,
    #525151 50%,
    rgba(50, 50, 50, 1) 100%
  );
  position: relative;
  margin-top: 30px;
  h1{
    margin-left: 10px;
    font-size: 22px;
  }
  p{
    margin: 8px 0px 8px 15px;
    font-size: 18px;
    font-weight: bold;
    color: rgba(200,200,200,1);
  }
  span {
    position: absolute;
    top: -18px;
    right: 10px;
    font-weight: bold;
    color: rgba(200,200,200,0.8);
    font-size: 12px;
    text-transform: uppercase;
  }
`;
const Organism_actStyleGold = styled.div`
  width: 90%;
  flex-wrap: wrap;
  border-radius: 5px;
  padding: 10px;
  margin: 10px;
  color: #ccc;
  background: rgb(103, 0, 0);
  background: radial-gradient(
    circle,
    rgba(103, 0, 0, 1) 0%,
    rgba(240, 0, 0, 1) 50%,
    rgba(119, 3, 3, 1) 100%
  );
  position: relative;
  margin-top: 30px;
  h1{
    margin-left: 10px;
    font-size: 25px;
  }
  p{
    margin: 8px 0px 8px 15px;
    font-size: 18px;
    font-weight: bold;
    color: rgba(200,200,200,1);
  }
  span {
    position: absolute;
    top: -18px;
    right: 10px;
    font-weight: bold;
    color: rgba(200,200,200,0.8);
    font-size: 12px;
    text-transform: uppercase;
  }
`;

const Organism_actStyleUpgrade = styled.div`
  width: 90%;
  flex-wrap: wrap;
  border-radius: 5px;
  padding: 10px;
  margin: 10px;
  color: #ccc;
  background: rgb(62, 0, 103);
  background: radial-gradient(
    circle,
    rgba(62, 0, 103, 1) 0%,
    rgba(116, 0, 111, 1) 50%,
    rgba(69, 3, 119, 1) 100%
  );
  position: relative;
  margin-top: 30px;
  h1{
    margin-left: 10px;
    font-size: 25px;
  }
  p{
    margin: 8px 0px 8px 15px;
    font-size: 18px;
    font-weight: bold;
    color: rgba(200,200,200,1);
  }
  span {
    position: absolute;
    top: -18px;
    right: 10px;
    font-weight: bold;
    color: rgba(200,200,200,0.8);
    font-size: 12px;
    text-transform: uppercase;
  }
`;
export default Organism_act;
