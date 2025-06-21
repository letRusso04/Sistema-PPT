class InterfaceChatBotAI {
    constructor(botID, nameBot, imageUrl, router, status) {
      this.botID = botID;
      this.nameBot = nameBot;
      this.imageUrl = imageUrl;
      this.router = router;
      this.status = status;
    }
  }



export class GlobalActionsBot{
  constructor() {}
  createBotInterface(NavigationModal) {
    this.NavigationModal = NavigationModal;
    let cursorNavigation = Array(this.NavigationModal.length);
    for (let i = 0; i < this.NavigationModal.length; i++) {
      cursorNavigation[i] = new InterfaceChatBotAI(
        this.NavigationModal[i].botID,
        this.NavigationModal[i].nameBot,
        this.NavigationModal[i].imageUrl,
        this.NavigationModal[i].router,
        this.NavigationModal[i].status
      );
    }
    this.cursorNavigation = cursorNavigation;
    return this.cursorNavigation;
  }
}
