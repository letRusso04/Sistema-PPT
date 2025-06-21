
export class InterfaceNavigationUser {
    constructor(
      id,
      icon,
      labelName,
      router,
      active,
      separator,
      category,
      permissions
    ) {
      this.id = id;
      this.icon = icon;
      this.labelName = labelName;
      this.router = router;
      this.active = active;
      this.separator = separator;
      this.category = category;
      this.permissions = permissions;
    }
    
  }

export class GlobalActionsNavigation{
    constructor(){}
    createNavigation(NavigationModal) {
        try {
          this.NavigationModal = NavigationModal;
          let cursorNavigation = Array(this.NavigationModal.length);
          for (let i = 0; i < this.NavigationModal.length; i++) {
            cursorNavigation[i] = new InterfaceNavigationUser(
              this.NavigationModal[i].id,
              this.NavigationModal[i].icon,
              this.NavigationModal[i].labelName,
              this.NavigationModal[i].router,
              this.NavigationModal[i].separator,
              this.NavigationModal[i].active,
              this.NavigationModal[i].category,
              this.NavigationModal[i].permissions
            );
          }
          this.cursorNavigation = cursorNavigation;
          return this.cursorNavigation;
        } catch (err) {
          console.info("Ha fallado algo en la creacion del modal de navegacion");
        }
      }
      insertNavigation(Interface, object) {
        this.object = object;
        this.object.forEach((element) => {
          Interface.push(
            new InterfaceNavigationUser(
              element.id,
              element.icon,
              element.labelName,
              element.router,
              element.separator,
              element.active,
              element.category,
              element.permissions
            )
          );
        });
        return Interface;
      }
    
  }



