/// <reference path="../../../../type-definitions/types.d.ts" />




module Application.Components {

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

    export class Navbar {
        $insert = ['$location','$sessionStorage'];
        constructor(public $location: ng.ILocationService, public $sessionStorage:any) { }
        public callnumber: any
        public username: string;
        public AccountId: number;

        public permission:any={}

        $onInit() {



            if (this.$sessionStorage.myaccount) {
                let a = this.$sessionStorage.myaccount
                this.username = a.FirstName + ' ' + a.LastName;
                this.AccountId = a.AccountId;
            }
            else {

                    //this.$location.url('/')
               
            }
          
            this.permission = new NavigationPermissions(a.AccountType);


           
        }

        LogOut() {
            this.$sessionStorage.$reset();
            let url = "/";
            this.go(url);
        }

        OpenByCallNumberKey(keyEvent: any) {
            if (keyEvent.which === 13) {
                this.OpenByCallNumber();
            }
        }
        OpenByCallNumber() {
            let cn = this.callnumber;
            let booknumber = cn.replace(/\D/g, '');
            let prefix = cn.replace(/[0-9]/g, '');
            let url = "/library/catalog/edit/" + prefix + "/" + booknumber;
           
            console.log(url);
            this.go(url);
        }
        go(url: string) {
            this.$location.url(url);
        }
    }

    app.component("navbar", {
        controller: Navbar,
        bindings: { book: '<' },
        controllerAs: "vm",
        templateUrl: function (templates: any) { return templates.navbar+"?v="+new Date() }
    })
}