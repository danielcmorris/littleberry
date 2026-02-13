
module Application.Components {
    interface IBook extends Application.Library.Types.IBook { }

    export class Requests {
        static $inject = ['$location', '$sessionStorage', '$routeParams', 'libraryService', '$mdDialog'];
        constructor(
            public $location: ng.ILocationService,
            public $sessionStorage: any,
            public $routeParams: any,
            public libraryService: any,
            private $mdDialog: any
        ) { }

        public requests: any;
        public email: string;
        public ShipSelections: any = [];
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
        public links: any;
        public permission: Application.Context.NavigationPermissions;
        public redirect: string;

        $onInit(): void {
            this.mode = this.$routeParams.mode;
            this.Prefix = this.$routeParams.prefix;
            this.BookNumber = this.$routeParams.booknumber;
            this.CallNumber = this.Prefix + this.BookNumber;
            this.Account = JSON.parse(localStorage.getItem("account"));

            if (this.mode)
                this.mode = this.mode.toLowerCase();
            if (this.mode == 'edit' || this.mode == 'add') {
                this.getBook(this.Prefix, this.BookNumber);
                this.redirect = "/#/library/requests/" + this.mode + "/" + this.Prefix + "/" + this.BookNumber;
                this.email = this.Account.Email;
                this.LookupAccount('email', this.email);
                this.links = [
                    { "url": "/#/library", "text": "home" },
                    { "url": "/#/library/catalog", "text": "catalog" },
                    { "url": "/#/library/catalog/view/" + this.Prefix + "/" + this.BookNumber, "text": this.CallNumber },
                    { "url": "", "text": "request " + this.CallNumber },
                ];
            } else {
                this.GetRequests();
                this.links = [
                    { "url": "/#/library", "text": "home" },
                    { "url": "", "text": "requests" },
                ];
                this.showList = true;
                this.redirect = "/#/library/requests/";
            }
            this.permission = this.libraryService.UpdatePermissions();
            if (this.$sessionStorage.myaccount) {
                this.Account = this.$sessionStorage.myaccount;
                let s = this.Account.AccountType;
                if (this.mode === "mine") { this.email = this.Account.Email; }
                if (s === "Admin" || s === "Librarian" || s === "Staff") {
                    console.log("SHOW SEARCH");
                } else {
                    this.showSearch = false;
                }
            }
        }

        $onDestroy(): void { }

        LookupAccount(searchType: string, q: string): boolean {
            this.Account = JSON.parse(localStorage.getItem('account'));
            if (this.Account) {
                let a: Application.Models.Account = JSON.parse(localStorage.getItem('account'));
                if (a.Email === q) {
                    this.Account = a;
                    this.showAddress = true;
                    this.showSearch = false;
                    this.showConfirm = false;
                    return true;
                }

                this.libraryService.LookupAccount(searchType, q)
                    .then((resp: any) => {
                        if (resp.data != 'No Accounts Found') {
                            this.Account = resp.data[0];
                            this.showAddress = true;
                            this.showSearch = false;
                            this.showConfirm = false;
                        } else {
                            let c = confirm("No account was found for " + q + ".  Would you like to make a new account for them?");
                            if (c) {
                                this.showSearch = false;
                                this.showAddress = true;
                                this.showConfirm = false;
                                this.Account = new Application.Models.Account();
                                this.Account.Email = q;
                                this.Account.Password = "";
                            }
                        }
                    });
            }
            return false;
        }

        ViewRequest(obj: any): void {
            let id = obj.ReservationSubId;
            this.libraryService.getRequest(id)
                .then((resp: any) => {
                    if (resp.data != 'No Accounts Found') {
                        let a: Application.Models.Request = <Application.Models.Request>resp.data[0];
                        var alert = this.$mdDialog.alert()
                            .title("Request " + id)
                            .content(a)
                            .ok('Close');
                        this.$mdDialog
                            .show(alert)
                            .finally(function () {
                                alert = undefined;
                            });
                    } else {
                        confirm("No account was found");
                    }
                });
        }

        private getBook(prefix: string, booknumber: string): void {
            this.libraryService.getBook(prefix, booknumber)
                .then((resp: any) => {
                    this.book = <IBook>resp.data;
                });
        }

        AddRequest(callnumber: string): void {
            this.libraryService.AddRequest(callnumber, this.email)
                .then((resp: any) => {
                    if (!resp.data.BookId) {
                        alert(resp.data);
                    } else {
                        this.GetRequests();
                    }
                });
        }

        AddRequestByAccount(a: any, callnumber: string): void {
            this.libraryService.SaveAccount(a)
                .then((resp: any) => {
                    this.libraryService.AddRequest(this.CallNumber, this.Account.Email)
                        .then((resp: any) => {
                            if (!resp.data.BookId) {
                                alert(resp.data);
                            } else {
                                this.showConfirm = true;
                                this.showAddress = false;
                                this.GetRequests();
                            }
                        });
                });
        }

        UpdateRequest(type: string, res: any, status: boolean, dt: Date): void {
            let obj: any = {};
            obj.ReservationSubId = res.ReservationSubId;
            obj.ChangeType = type;
            obj.OnOff = status;
            obj.ChangeDate = dt;

            this.libraryService.UpdateRequest(obj)
                .then((resp: any) => {
                    this.GetRequests();
                });
        }

        GetRequests(): void {
            this.Account = JSON.parse(localStorage.getItem('account'));
            if (this.Account) {
                this.libraryService.getOpenRequests()
                    .then((resp: any) => {
                        this.requests = resp.data;
                    });
            }
        }

        ShipItem(r: any): void {
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

        go(url: string): void {
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
