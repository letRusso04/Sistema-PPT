import { Session } from "bc-react-session";

export class InterfaceUser {
  constructor(
    name,
    date,
    lastConnection,
    country,
    password,
    description,
    userId,
    category,
    images
  ) {
    this.name = name;
    this.date = date;
    this.lastConnection = lastConnection;
    this.country = country;
    this.password = password;
    this.description = description;
    this.userId = userId;
    this.category = category;
    this.images = images;
  }
}

export class GlobalActionsAccount {
  constructor() {}
  createInterfaceUser(NavigationModal) {
    try {
      this.NavigationModal = NavigationModal;
      let cursorNavigation = Array(this.NavigationModal.length);
      for (let i = 0; i < this.NavigationModal.length; i++) {
        cursorNavigation[i] = new InterfaceUser(
          this.NavigationModal[i].name,
          this.NavigationModal[i].date,
          this.NavigationModal[i].lastConnection,
          this.NavigationModal[i].password,
          this.NavigationModal[i].country,
          this.NavigationModal[i].description,
          this.NavigationModal[i].userId,
          this.NavigationModal[i].category,
          this.NavigationModal[i].images,
        );
      }
      this.cursorNavigation = cursorNavigation;
      return this.cursorNavigation;
    } catch (err) {
      console.info("Ha fallado algo en la creacion del modal de navegacion");
    }
  }
  insertInterfaceUser(Interface, object) {
    this.object = object;
    const sessionInformation = Session.get("account_information");
    let name = sessionInformation.payload["name"];
    this.object.forEach((element) => {
      Interface.push(
        new InterfaceUser(
          element[1] == 1 ? "Patria Para Todos" : name,
          element[1],
          element[2],
          0,
          0,
          0,
          element[3]
        )
      );
    });
    return Interface;
  }
}
