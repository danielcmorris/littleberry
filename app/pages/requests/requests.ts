/// <reference path="../../../td/types.d.ts" />




module Application.Components {
    interface IBook extends Application.Library.Types.IBook { }
    export class Requests {
        $insert = ['$location', '$sessionStorage', '$routeParams','libraryService'];
        constructor(public $location: ng.ILocationService, public $sessionStorage: any, public $routeParams:any, public libraryService:any) { }
        public requests: any
        public email: string="dmorris@morrisdev.com";
        public ShipSelections: any = []
        public mode: string;
        public CallNumber: string;
        public Prefix: string;
        public BookNumber: string;
        public book: any;
        public Account: any;
        public showAddress: boolean=false;
        public showConfirm: boolean=false;
        public showSearch: boolean = false;
        public showList: boolean = false;
        public permission:Application.Context.NavigationPermissions;
        public redirect:string;


         $onInit() {
            
              this.mode = this.$routeParams.mode;
             this.Prefix = this.$routeParams.prefix;
             this.BookNumber = this.$routeParams.booknumber;
             this.CallNumber = this.Prefix + this.BookNumber;
             
             if(this.mode)
                this.mode = this.mode.toLowerCase();
             if (this.mode == 'edit' || this.mode == 'add') {
                 this.getBook(this.Prefix, this.BookNumber);
                 this.showSearch = true;
                 this.redirect="/#/library/requests/"+this.mode+"/"+this.Prefix+"/"+this.BookNumber;
             } else {
                 this.GetRequests();
                 this.showList = true;
                 this.redirect="/#/library/requests/";
             }
             this.permission= this.libraryService.UpdatePermissions()
          //   console.log(this.mode);
        }
         LookupAccount(searchType: string, q: string) {
             this.libraryService.LookupAccount(searchType, q)
                 .then((resp: any) => {
                     console.log(resp);
                     if (resp.data != 'No Accounts Found') {
                         this.Account = resp.data[0];
                         this.showAddress = true;
                         this.showSearch = false;
                         this.showConfirm = false;
                     } else {
                         let c = confirm("No account was found for " + q + ".  Would you like to make a new account for them?");
                         if (c) {
                             this.showAddress = true;
                             this.showSearch = false;
                             this.showConfirm = false;
                             this.Account = {};
                             this.Account.Email = q;
                         }
                         
                     }
                 })

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

         AddRequestByAccount(a: any,callnumber: string) {

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
         UpdateRequest(type:string, res:any, status:boolean,dt:Date) {

             let obj: any = {};
             obj.ReservationSubId =res.ReservationSubId;
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
             this.libraryService.getOpenRequests()
                 .then((resp: any) => {
                     this.requests = resp.data;
                 });
         }
         ShipItem(r: any) {
             let found = false;
             let temp:any = []; 

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