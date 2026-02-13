export class NavigationPermissions {
  AddTitle = false;
  EditTitle = false;
  AddRequest = false;
  Requests = false;
  SearchRequest = false;
  Members = false;
  Subjects = false;
  LoggedIn = false;

  constructor(accountType: string) {
    switch (accountType) {
      case 'Admin':
        this.AddTitle = true;
        this.EditTitle = true;
        this.AddRequest = true;
        this.Subjects = true;
        this.LoggedIn = true;
        this.Members = true;
        this.Requests = true;
        break;
      case 'Member':
        this.AddRequest = true;
        this.LoggedIn = true;
        break;
      default:
        break;
    }
  }
}
