/// <reference path="../../../../type-definitions/types.d.ts" />
/// <reference path="../../classes/NavigationPermissions.ts" />




module Application.Components {



    export class Navbar {
        $insert = ['$location', '$sessionStorage', 'libraryService'];
        constructor(public $location: ng.ILocationService, public $sessionStorage: any, private libraryService: Application.Services.libraryService ) { }
        public callnumber: any
        public username: string;
        public AccountId: number;
        public subjects: any;
        public authors: any;
        public permission: any = {}

        $onInit() {   
           
            let auth=new Authorization();
            
            this.GetSubjects()
            this.GetAuthors(30);
            let profile = auth.profile();
            if(profile){
                console.log("profile",profile)
                this.username = profile.given_name + ' ' + profile.family_name;
                

               let a:any ={}
                a.AccountType = 'Member';
                a.FirstName = profile.given_name
                a.LastName =   profile.family_name;
                a.Email = profile.email;
                a.AccountId=0;

                console.log("Logged in as "+this.username)
                this.permission.LoggedIn=true
                this.libraryService.autoLogin(a)
                    .then((resp:any)=>{
                          var data:Application.Models.Account=resp.data;
                            this.AccountId = parseInt(data.AccountId);
                            console.log('autoLogin Data',data);
                            this.permission = new Application.Context.NavigationPermissions( data.AccountType)
                            console.log(this.permission);
                            this.permission.LoggedIn=true
                    })
 
                
            }
            else {

               console.log("NOT LOGGED IN")

            }




        }
        SetProfile(){
            
        }
        Login(){
            let auth=new Authorization();
            
            auth.login();

        }
        LogOut() {
            let auth=new Authorization();
            auth.logout();
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