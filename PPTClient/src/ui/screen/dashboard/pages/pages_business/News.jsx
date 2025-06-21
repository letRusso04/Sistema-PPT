import React from "react";
import Organism_act from "../../organisms/Organism_act";
import { Templates_ContentCentralStyles, Implements_ContentCentral } from "../../templates/Templates_contentCentral";
import Molecules_paper from "../../molecules/Molecules_paper";
import { GlobalActionsPapers } from "../../../../../domain/Interface/Repository/PapersRepository";
import { InterfaceNewPapersGeneral, InterfaceNewPapers } from "../../../../../domain/Interface/local/NavigationModal";
function News() {
  let cursorNavigation = new GlobalActionsPapers();
  let createNewPaperGeneral = cursorNavigation.createPaperNews(InterfaceNewPapersGeneral);
  let createNewPapers = cursorNavigation.createPaperNews(InterfaceNewPapers);
  return (
    <Templates_ContentCentralStyles>
      <div className="content-left">
        {createNewPaperGeneral.map(({ title, content, type, date }) => (
          <Organism_act
            title={title}
            content={content}
            type={type}
            key={title}
            date={date}
          />
        ))}
      </div>
      <div className="content-right">
        <h1 style={Implements_ContentCentral.extends_News.h1}>Últimas Noticias Generales</h1>
        {createNewPapers.map(({ title, date, content }) => (
          <Molecules_paper title={title} date={date} content={content}/>
        ))}
      </div>
    </Templates_ContentCentralStyles>
  );
}

export default News;
