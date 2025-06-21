class InterfaceCustomer {
    constructor(router, labelID, labelName, category, subLabel, type) {
      this.router = router;
      this.labelID = labelID;
      this.labelName = labelName;
      this.category = category;
      this.subLabel = subLabel;
      this.type = type;
    }
  }

  export class GlobalActionsCustomer{
    constructor(){}
    createInterfaceCustomer(NavigationModal) {
        try {
          this.NavigationModal = NavigationModal;
          let cursorNavigation = Array(this.NavigationModal.length);
          for (let i = 0; i < this.NavigationModal.length; i++) {
            cursorNavigation[i] = new InterfaceCustomer(
              this.NavigationModal[i].router,
              this.NavigationModal[i].labelID,
              this.NavigationModal[i].labelName,
              this.NavigationModal[i].category,
              this.NavigationModal[i].category,
              this.NavigationModal[i].subLabel,
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

