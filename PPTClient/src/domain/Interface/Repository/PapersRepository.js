
class InterfaceNewPapers {
    constructor(title, date, content, type) {
      this.title = title;
      this.date = date;
      this.content = content;
      this.type = type;
    }
  }
  
export class GlobalActionsPapers{
    constructor(){}
    createPaperNews(NavigationModal) {
        try {
          this.NavigationModal = NavigationModal;
          let cursorNavigation = Array(this.NavigationModal.length);
          for (let i = 0; i < this.NavigationModal.length; i++) {
            cursorNavigation[i] = new InterfaceNewPapers(
              this.NavigationModal[i].title,
              this.NavigationModal[i].date,
              this.NavigationModal[i].content,
              this.NavigationModal[i].type
            );
          }
          this.cursorNavigation = cursorNavigation;
          return this.cursorNavigation;
        } catch (err) {
          console.info("Ha fallado algo en la creacion del modal de navegacion");
        }
      }
     
  }

