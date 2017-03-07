


module Application.Components {
    interface IBook extends Application.Library.Types.IBook { }
    export class Requests {
        $insert = ['$location', '$sessionStorage', '$routeParams', 'libraryService','$mdDialog'];
        constructor(public $location: ng.ILocationService, public $sessionStorage: any, public $routeParams: any, public libraryService: any,private $mdDialog:any) { }
        public requests: any
        public email: string;
        public ShipSelections: any = []
        public mode: string;
        public CallNumber: string;
        public Prefix: string;
        public BookNumber: string;
        public book: any;
        public Account: Application.Models.Account;
        public showAddress: boolean = false;
        public showConfirm: boolean = false;
        public showSearch: boolean = false;
        public showList: boolean = false;
        public links:any;
        public permission: Application.Context.NavigationPermissions;
        public redirect: string;


        $onInit() {

            this.mode = this.$routeParams.mode;
            this.Prefix = this.$routeParams.prefix;
            this.BookNumber = this.$routeParams.booknumber;
            this.CallNumber = this.Prefix + this.BookNumber;

            if (this.mode)
                this.mode = this.mode.toLowerCase();
            if (this.mode == 'edit' || this.mode == 'add') {
                this.getBook(this.Prefix, this.BookNumber);
               // this.showSearch = true;
                this.redirect = "/#/library/requests/" + this.mode + "/" + this.Prefix + "/" + this.BookNumber;
                this.email = this.$sessionStorage.myaccount.Email;
                this.LookupAccount('email', this.email)
                 this.links=[
                {"url":"/#/library","text":"home"},
                {"url":"/#/library/catalog","text":"catalog"},
                {"url":"/#/library/catalog/view/"+this.Prefix+"/"+this.BookNumber,"text":this.CallNumber},
                {"url":"","text":"request "+this.CallNumber},
            ];
            } else {
                this.GetRequests();
                this.links=[
                {"url":"/#/library","text":"home"}, 
                {"url":"","text":"requests"},
                ];
                this.showList = true;
                this.redirect = "/#/library/requests/";
            }
            this.permission = this.libraryService.UpdatePermissions()
            if (this.$sessionStorage.myaccount) {
                this.Account = this.$sessionStorage.myaccount;
                let s = this.Account.AccountType;
                
                  if(this.mode === "mine"){this.email=this.Account.Email;}
                if(s==="Admin" || s==="Librarian" || s==="Staff"){
                   // this.showSearch = true;
                    console.log("SHOW SEARCH")
                }else{
                    this.showSearch=false;
                }
            }

           
 
        }
        LookupAccount(searchType: string, q: string) {
             if (this.$sessionStorage.myaccount) {
                let a:Application.Models.Account = this.$sessionStorage.myaccount;
                if(a.Email === q){
                    this.Account = a;
                    this.showAddress=true;
                    this.showSearch=false;
                    this.showConfirm = false;
                    return true;
                }

            this.libraryService.LookupAccount(searchType, q)
                .then((resp: any) => {
                    console.log(resp);
                    if (resp.data != 'No Accounts Found') {
                        this.Account = resp.data[0];
                        this.showAddress = true;
                        this.showSearch=false;
                        this.showConfirm = false;
                    } else {
                        let c = confirm("No account was found for " + q + ".  Would you like to make a new account for them?");
                        if (c) {
                            this.showSearch=false;
                            this.showAddress = true;
                             
                            this.showConfirm = false;
                            this.Account = new Application.Models.Account();
                            this.Account.Email = q;
                            this.Account.Password="";
                        }

                    }
                })
             }

        }
        ViewRequest(obj:any){
           let id= obj.ReservationSubId
             this.libraryService.getRequest( id)
                .then((resp: any) => {
                    console.log(resp);
                    if (resp.data != 'No Accounts Found') {
                        let a:Application.Models.Request =<Application.Models.Request>resp.data[0];
                       var alert = this.$mdDialog.alert()
                            .title("Request "+id)
                            .content(a)
                            .ok('Close');

                        this.$mdDialog
                            .show( alert )
                            .finally(function() {
                                alert = undefined;
                            }); 
                    } else {
                        let c = confirm("No account was found");
                        

                    }
                })
         
    }
    // Necessary to pass locals to the dialog template.
DialogCtrl(mdPanelRef:any) {
 // this._mdPanelRef = mdPanelRef;
}

 
        getBook(prefix: string, booknumber: string) {
            //   this.loading = true;

            this.libraryService.getBook(prefix, booknumber)
                .then((resp: any) => {
                    this.book = <IBook>resp.data;
                    if (!this.book.Url) {
                        let img = Application.Config.LibraryConfig.defaultBookImage;
                        // this.bookImage = this.imageServer + '/' + img;
                    } else {
                        //  this.bookImage = this.imageServer + '/' + this.book.Url;
                    }
                    // this.updateSubject()
                    // this.loading = false;
                });



        }
        AddRequest(callnumber: string) {

            this.libraryService.AddRequest(callnumber, this.email)
                .then((resp: any) => {
                    if (!resp.data.BookId) {
                        alert(resp.data)

                    } else {

                        this.GetRequests();

                    }
                })

        }

        AddRequestByAccount(a: any, callnumber: string) {

            this.libraryService.SaveAccount(a)
                .then((resp: any) => {


                    this.libraryService.AddRequest(this.CallNumber, this.Account.Email)
                        .then((resp: any) => {
                            if (!resp.data.BookId) {
                                alert(resp.data)
                            } else {


                                this.showConfirm = true;
                                this.showAddress = false;
                                this.GetRequests();
                            }
                        })
                })
        }
        UpdateRequest(type: string, res: any, status: boolean, dt: Date) {

            let obj: any = {};
            obj.ReservationSubId = res.ReservationSubId;
            obj.ChangeType = type;
            obj.OnOff = status
            obj.ChangeDate = dt;


            this.libraryService.UpdateRequest(obj)
                .then((resp: any) => {
                    console.log(resp.data);
                    this.GetRequests();
                });
        }
        GetRequests() {
             if (this.$sessionStorage.myaccount) {
            this.libraryService.getOpenRequests()
                .then((resp: any) => {
                    this.requests = resp.data;
                });
             }
        }
        ShipItem(r: any) {
            let found = false;
            let temp: any = [];

            angular.forEach(this.ShipSelections, (i: any, k: any) => {
                if (i.ReservationSubId == r.ReservationSubId) {
                    found = true;
                } else {
                    temp.push(i);
                }
            });
            if (!found) {
                temp.push(r);
            }
            this.ShipSelections = temp;
        }
        go(url: string) {
            this.$location.url(url);
        }

    }
     app.component("requests", {
        controller: Requests,
        bindings: { someVariable: '<' },
        controllerAs: "vm",
        templateUrl: function (templates: any) { return templates.requests },
    })
}