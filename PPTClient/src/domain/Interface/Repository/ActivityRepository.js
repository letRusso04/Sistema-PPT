class InterfaceActivity {
    constructor(
      ActivityUrl,
      ActivityName,
      ActivityRouter,
      ActivityStatus,
      activityStatusLabel
    ) {
      this.ActivityUrl = ActivityUrl;
      this.ActivityName = ActivityName;
      this.ActivityRouter = ActivityRouter;
      this.ActivityStatus = ActivityStatus;
      this.activityStatusLabel = activityStatusLabel;
    }
  }
  

export class GlobalActionsActivity{
    constructor() {}
    createActivityUser(NavigationModal) {
        try {
          this.NavigationModal = NavigationModal;
          let cursorNavigation = Array(this.NavigationModal.length);
          for (let i = 0; i < this.NavigationModal.length; i++) {
            cursorNavigation[i] = new InterfaceActivity(
  
              this.NavigationModal[i].ActivityUrl,
              this.NavigationModal[i].name,
              this.NavigationModal[i].lastConnection,
              this.NavigationModal[i].ActivityStatus,
              "DESCONECTADO"//this.NavigationModal[i].activityStatusLabel
            );
          }
          this.cursorNavigation = cursorNavigation;
          return this.cursorNavigation;
        } catch (err) {
          console.info("Ha fallado algo en la creacion del modal de navegacion");
        }
      }
  }
  

