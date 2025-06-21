
import { Session } from "bc-react-session";

class InterfaceMessageChat {
    constructor(
      nameLabel,
      botMessage,
      contentMessage,
      isDelete,
      isEditable,
      timestamp
    ) {
      this.nameLabel = nameLabel;
      this.botMessage = botMessage;
      this.contentMessage = contentMessage;
      this.isDelete = isDelete;
      this.isEditable = isEditable;
      this.timestamp = timestamp;
    }
  }


export class GlobalActionsMessage {
  constructor() {}
  createInterfaceMessage(NavigationModal) {
    try {
      this.NavigationModal = NavigationModal;
      let cursorNavigation = Array(this.NavigationModal.length);
      for (let i = 0; i < this.NavigationModal.length; i++) {
        cursorNavigation[i] = new InterfaceMessageChat(
          this.NavigationModal[i].nameLabel,
          this.NavigationModal[i].botMessage,
          this.NavigationModal[i].contentMessage,
          this.NavigationModal[i].isDelete,
          this.NavigationModal[i].isEditable,
          this.NavigationModal[i].timestamp
        );
      }
      this.cursorNavigation = cursorNavigation;
      return this.cursorNavigation;
    } catch (err) {
      console.info("Ha fallado algo en la creacion del modal de navegacion");
    }
  }
  inserInterfaceMessageBot(Interface, object) {
    this.object = object;
    const sessionInformation = Session.get("account_information");
    let name = sessionInformation.payload["name"];
    this.object.forEach((element) => {
      Interface.push(
        new InterfaceMessageChat(
          element[1] == 1 ? "Patria Para Todos" : name,
          element[1],
          element[2],
          0,
          0,
          element[3]
        )
      );
    });
    return Interface;
  }
  inserInterfaceMessage(Interface, object) {
    this.object = object;
    this.object.forEach((element) => {
      Interface.push(
        new InterfaceMessageChat(
          element[0],
          element[1],
          element[2],
          0,
          0,
          element[3]
        )
      );
    });
    return Interface;
  }
}
