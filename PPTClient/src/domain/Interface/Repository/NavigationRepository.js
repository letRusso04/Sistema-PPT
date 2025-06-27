
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
