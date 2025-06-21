class InterfaceLogs {
    constructor(icon, name, date, format) {
      this.icon = icon;
      this.name = name;
      this.date = date;
      this.format = format;
    }
  }
  
  export class GlobalActionsLogs{
    constructor(){}
    createLogsUser(NavigationModal) {
        try {
          this.NavigationModal = NavigationModal;
          let cursorNavigation = Array(this.NavigationModal.length);
          for (let i = 0; i < this.NavigationModal.length; i++) {
            cursorNavigation[i] = new InterfaceLogs(
              this.NavigationModal[i].icon,
              this.NavigationModal[i].name,
              this.NavigationModal[i].date,
              this.NavigationModal[i].format
            );
          }
          this.cursorNavigation = cursorNavigation;
          return this.cursorNavigation;
        } catch (err) {
          console.info("Ha fallado algo en la creacion del modal de navegacion");
        }
      }
    
  }
