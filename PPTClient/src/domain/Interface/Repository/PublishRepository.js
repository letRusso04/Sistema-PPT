
class InterfacePublish {
    constructor(labelUrl, labelName, labelType, labelContent, labelImage) {
      this.labelUrl = labelUrl;
      this.labelName = labelName;
      this.labelType = labelType;
      this.labelContent = labelContent;
      this.labelImage = labelImage;
    }
  }
  
export class GlobalActionsPublish{
    constructor(){}
    createPublishNavigation(NavigationModal) {
        try {
          this.NavigationModal = NavigationModal;
          let cursorNavigation = Array(this.NavigationModal.length);
          for (let i = 0; i < this.NavigationModal.length; i++) {
            cursorNavigation[i] = new InterfacePublish(
              this.NavigationModal[i].labelUrl,
              this.NavigationModal[i].labelName,
              this.NavigationModal[i].labelType,
              this.NavigationModal[i].labelContent,
              this.NavigationModal[i].labelImage
            );
          }
          this.cursorNavigation = cursorNavigation;
          return this.cursorNavigation;
        } catch (err) {
          console.info("Ha fallado algo en la creacion del modal de navegacion");
        }
      }
    
  }








