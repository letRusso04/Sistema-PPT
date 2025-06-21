class InterfaceMenuList {
    constructor(categoryName, permissionsLevel, categoryLabel) {
      this.categoryName = categoryName;
      this.permissionsLevel = permissionsLevel;
      this.categoryLabel = categoryLabel;
    }
  }
  

export class GlobalActionsMenu{
    constructor(){}
    createMenuList(NavigationModal) {
        try {
          this.NavigationModal = NavigationModal;
          let cursorNavigation = Array(this.NavigationModal.length);
          for (let i = 0; i < this.NavigationModal.length; i++) {
            cursorNavigation[i] = new InterfaceMenuList(
              this.NavigationModal[i].categoryName,
              this.NavigationModal[i].permissionsLevel,
              this.NavigationModal[i].categoryLabel
            );
          }
          this.cursorNavigation = cursorNavigation;
          return this.cursorNavigation;
        } catch (err) {
          console.info("Ha fallado algo en la creacion del modal de navegacion");
        }
      }
    
  }
