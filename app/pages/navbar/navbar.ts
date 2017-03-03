/// <reference path="../../../../type-definitions/types.d.ts" />
/// <reference path="../../classes/NavigationPermissions.ts" />




module Application.Components {



    export class Navbar {
        $insert = ['$location', '$sessionStorage', 'libraryService'];
        constructor(public $location: ng.ILocationService, public $sessionStorage: any, private libraryService: Application.Services.libraryService) { }
        public callnumber: any
        public username: string;
        public AccountId: number;
        public subjects: any;
        public authors: any;
        public permission: any = {}

        $onInit() {

            
            this.GetSubjects()
            this.GetAuthors(30);
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
            this.permission = new Application.Context.NavigationPermissions('Anon');
            let url = "/";
            this.go(url);
        }
        GetAuthors(bookCount:number) {
            this.libraryService.getAuthorsByBookCount(bookCount)
                .then((resp: any) => {
                    this.authors = resp;
                    
                })
        }
        GetSubjects() {

            this.libraryService.getSubjects()
                .then((resp: any) => {
                    this.subjects = resp;

                })
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
            let url = "/library/catalog/view/" + prefix + "/" + booknumber;
            let ls = this.libraryService;
            ls.getBook(prefix, booknumber)
                .then((resp: any) => {

                    if (resp.data.CallNumber) {
                        if (resp.data.Status === 'Deleted') {
                            alert('This title was deleted.');
                        } else {
                            this.go(url);
                        }
                    } else {
                        alert('No title found for call number ' + cn);
                    }
                })

        }
        go(url: string) {
            this.$location.url(url);
        }
    }

    app.component("navbar", {
        controller: Navbar,
        bindings: { book: '<' },
        controllerAs: "vm",
        templateUrl: function (templates: any) { return templates.navbar }
    })
}