module Application.Context {

   export class NavigationPermissions{
        AddTitle:boolean = false;
        EditTitle:boolean = false;
        AddRequest:boolean=false;
        Requests:boolean=false;        
        SearchRequest:boolean=false;
        Members:boolean=false;
        Subjects:boolean=false;
        LoggedIn:boolean=false
        
        constructor(AccountType:string){
            switch (AccountType) {
                case 'Admin':
                    this.AddTitle = true;
                    this.EditTitle = true;
                    this.AddRequest = true;
                    this.Subjects = true;
                    this.LoggedIn = true;
                    this.Members = true;
                    this.Requests=true;
                    break;
            
                default:
                    break;
            }
        }
    }
}