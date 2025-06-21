
 // Clase que genera los Download Link

class InterfaceDownload {
    constructor(
      icon,
      labelName,
      router,
      labelUrl,
      labelStadistic,
      labelUp,
      permissions
    ) {
      this.icon = icon;
      this.labelName = labelName;
      this.router = router;
      this.labelUrl = labelUrl;
      this.labelStadistic = labelStadistic;
      this.labelUp = labelUp;
      this.permissions = permissions;
    }
  }
  
 export class GlobalActionsDownload{
    constructor(){}
    createDownloadNavigation(NavigationModal) {
        try {
          this.NavigationModal = NavigationModal;
          let cursorNavigation = Array(this.NavigationModal.length);
          for (let i = 0; i < this.NavigationModal.length; i++) {
            cursorNavigation[i] = new InterfaceDownload(
              this.NavigationModal[i].icon,
              this.NavigationModal[i].labelName,
              this.NavigationModal[i].router,
              this.NavigationModal[i].labelUrl,
              this.NavigationModal[i].labelStadistic,
              this.NavigationModal[i].labelUp,
              this.NavigationModal[i].permissions
            );
          }
          this.cursorNavigation = cursorNavigation;
          return this.cursorNavigation;
        } catch (err) {
          console.info("Ha fallado algo en la creacion del modal de navegacion");
        }
      }
  }
