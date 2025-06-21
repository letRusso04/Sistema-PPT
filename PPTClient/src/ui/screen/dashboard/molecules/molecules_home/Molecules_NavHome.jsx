import React from "react";
import styled from "styled-components";
import Icon from "@mdi/react";
import { mdiNewspaperVariantMultipleOutline } from "@mdi/js";
import Molecules_Publish from "./Molecules_Publish";

function Molecules_NavHome(props) {

  return (
    <Molecuoles_NavHomeStyles>
      <div className="NavHome__top">
        <Icon
          path={mdiNewspaperVariantMultipleOutline}
          size={2}
          styles="icon_styles"
        />
        <h1>ULTIMAS PUBLICACIONES</h1>
      </div>
      <div className="NavHome__main">
        {
          props.InterfacePublishList && props.InterfacePublishList.map(({labelUrl,labelName, labelType,labelContent,  labelImage })=>(
            <Molecules_Publish
            userPublishUrl={labelUrl}
            userPublishName={labelName}
            userPublishType={labelType}
            userPublishContent={labelContent}
            userPublishImage={labelImage}
            />
          ))
        }

      </div>

    </Molecuoles_NavHomeStyles>
  );
}
const Molecuoles_NavHomeStyles = styled.div`

  height: 90vh;
  width: 100%;
  overflow: scroll;
  display: flex;
  flex-direction: column;
  justify-content: start;

  .NavHome__top {
    display: flex;
    align-items: center;
    justify-content: start;
    height: 10vh;
    color: #020202;
    margin-left: 10px;
    h1 {
      
      margin-left: 10px;
    }
  }
  .NavHome__main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;
    height: 80vh;
    overflow: scroll;
  }

`;
export default Molecules_NavHome;
