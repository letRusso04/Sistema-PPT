class InterfaceProduct {
    constructor(router, labelID, labelName, category, subLabel, type, cost, price, stock, currency) {
      this.router = router;
      this.labelID = labelID;
      this.labelName = labelName;
      this.category = category;
      this.subLabel = subLabel;
      this.type = type;
      this.cost = cost;
      this.price = price;
      this.stock = stock;
      this.currency = currency;
    }
  }
  


export class GlobalActionsProduct{
    constructor(){}
    createInterfaceProduct(NavigationModal) {
        try {
          this.NavigationModal = NavigationModal;
          let cursorNavigation = Array(this.NavigationModal.length);
          for (let i = 0; i < this.NavigationModal.length; i++) {
            cursorNavigation[i] = new InterfaceProduct(
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
      deleteInterfaceAll(Interface){
        this.Interface = false;
      }
     insertInterfaceProduct(Interface, object) {
        this.object = object;
        this.Interface = Interface;
        this.object.forEach((element) => {
          this.Interface.push(
            new InterfaceProduct(
              element.router,
              element.labelID,
              element.labelName,
              element.category,
              element.subLabel,
              element.type,
              element.price,
              element.stock,
              element.currency
            )
          );
        });
        return this.Interface;
      }
  }

