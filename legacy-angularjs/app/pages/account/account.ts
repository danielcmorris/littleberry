
module Application.Components {
    export class Account {
        public accounts: any;
        public account: any;
        public mode: string;
        public setPassword: boolean = false;
        public showHints: boolean = true;
        public states: any;

        static $inject = ['$location', 'libraryService', '$routeParams', '$mdDialog', '$mdToast', '$sessionStorage'];
        constructor(
            public $location: ng.ILocationService,
            public libraryService: any,
            public $routeParams: any,
            private $mdDialog: any,
            private $mdToast: any,
            private $sessionStorage: any
        ) { }

        $onInit(): void {
            let l = this.libraryService;
            let aid = 0;

            this.states = ('AL AK AZ AR CA CO CT DE FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS ' +
                'MO MT NE NV NH NJ NM NY NC ND OH OK OR PA RI SC SD TN TX UT VT VA WA WV WI ' +
                'WY').split(' ').map(function (state) {
                    return { abbrev: state };
                });

            if (this.mode === 'add' || this.mode === 'join') {
                this.account = new Application.Models.Account();
                this.account.Status = 'Active';
                this.account.AccountType = 'Member';
                this.account.Country = 'United States';
                this.account.Password = 'password';
                this.setPassword = true;
            }
            if (this.mode == 'edit') {
                aid = this.$routeParams.accountid;
                l.getAccount(aid)
                    .then((resp: any) => {
                        this.account = resp.data;
                    });
            }
            if (this.mode == 'list') {
                l.getAccounts()
                    .then((resp: any) => { this.accounts = resp; });
            }
        }

        $onDestroy(): void { }

        editAccount(obj: any): void {
            this.go('/library/accounts/' + obj.AccountId);
        }

        ChangePassword(ev: any): void {
            this.$mdDialog.show({
                contentElement: '#myDialog',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true
            });
        }

        CancelPassword(): void {
            this.$mdDialog.hide();
        }

        UpdatePassword(password: string): void {
            this.account.Password = password;
            this.SaveUser(3);
        }

        Toast(msg: string, secs: number): void {
            secs = secs * 1000;
            this.$mdToast.show(
                this.$mdToast.simple()
                    .capsule(true)
                    .textContent(msg)
                    .position('top right')
                    .hideDelay(secs)
            );
        }

        Delete(): void {
            let a = this.account;
            let msg = 'Are you sure you want to delete ' + a.FirstName + ' ' + a.LastName + '\'s account?';
            if (confirm(msg)) {
                this.account.Status = 'Deleted';
                this.Toast("Deleting Account...", 2);
                this.SaveUser(1);
            }
        }

        SaveUser(saveType: number): void {
            let l = this.libraryService;
            this.Toast("Saving...", 2);
            l.SaveAccount(this.account)
                .then((resp: any) => {
                    if (saveType === 0) {
                        this.Toast("Saved", 2);
                        this.account = resp.data;
                        return;
                    }
                    if (saveType === 4) {
                        this.Toast("Saved", 2);
                        this.account = resp.data;
                        this.$sessionStorage.myaccount = this.account;
                        this.$location.url('/#/members/welcome');
                    }
                    if (saveType === 1)
                        this.go('/library/accounts/');
                    if (saveType === 2)
                        this.go('/library/accounts/add');
                    if (saveType === 3)
                        this.$mdDialog.hide();
                });
        }

        go(url: string): void {
            this.$location.url(url);
        }

        AddAccount(): void {
            this.go('/library/accounts/add');
        }
    }

    app.component("account", {
        controller: Account,
        bindings: { accountId: '<', mode: '<' },
        controllerAs: "vm",
        templateUrl: function (templates: any) { return templates.account }
    })
}
