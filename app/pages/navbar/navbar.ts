/// <reference path="../../../../type-definitions/types.d.ts" />
/// <reference path="../../classes/NavigationPermissions.ts" />




module Application.Components {

  

    export class Navbar {
        $insert = ['$location','$sessionStorage'];
        constructor(public $location: ng.ILocationService, public $sessionStorage:any ) { }
        public callnumber: any
        public username: string;
        public AccountId: number;

        public permission:any={}

        $onInit() {



            if (this.$sessionStorage.myaccount) {
                let a = this.$sessionStorage.myaccount
                this.username = a.FirstName + ' ' + a.LastName;
                this.AccountId = a.AccountId;

            this.permission = new Application.Context.NavigationPermissions(a.AccountType);

            }
            else {

                    //this.$location.url('/')
               
            }
          


           
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