import React from "react";
import styled from "styled-components";
import Molecules_selectionLarge from "../../molecules/molecules_display/Molecules_selectionLarge";
function Organism_listNavbar(props) {
  return (
    <Organism_listNavbarStyle>
      <div className="content__listNavbar-hover">
        <div className="container_selection">
          {props.contentList &&
            props.contentList.map(
              ({ icon, labelName, router, active, category }) => (
                <div>
                  {category && <h1 className="isCategory">{category}</h1>}
                  <Molecules_selectionLarge
                    Icon={icon}
                    labelName={labelName}
                    Router={router}
                    active={active}
                  />
                </div>
              )
            )}
        </div>
      </div>
    </Organism_listNavbarStyle>
  );
}

const Organism_listNavbarStyle = styled.div`
  width: 100%;
  height: 90vh;
  background: rgba(30, 30, 30, 1);

  display: flex;
  align-items: end;
  padding-left: 2px;
  justify-content: space-between;
  flex-direction: column;

  transition: 600ms;

  .container_selection {
    width: 100%;
    height: 90vh;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: start;
    overflow: scroll;
    border-left: 2px solid rgba(100, 100, 100, 0.2);
    padding-left: 5px;
  }

  .icon_style {
    color: #888;
    padding-left: 4px;
    margin: 8px 3px;
    cursor: polist;
    transition: 300ms;
    &:hover {
      color: #aaa;
    }
  }
  .isCategory {
    color: #aaa;
    font-size: 12px;
  }
`;

export default Organism_listNavbar;
