import React from "react";
import styled from "styled-components";
import Molecules_listselect from "../../molecules/molecules_display/Molecules_listselect";
function Organism_listchat(props) {
  return (
    <Organism_listchatStyles>
      {props.contentList &&
        props.contentList.map(
          ({ botID, nameBot, imageUrl, router, status }) => (
            <Molecules_listselect 
            key={botID}
            contentID={botID}
            nameContent={nameBot} 
            imageUrl={imageUrl}
            router={router}
            status={status}
            />
          )
        )}
    </Organism_listchatStyles>
  );
}

const Organism_listchatStyles = styled.div`
  width: 100%;
  height:70vh;
  display: flex;
  align-items: end;
  justify-content: start;
  overflow: scroll;
  flex-direction: column;
`;

export default Organism_listchat;
