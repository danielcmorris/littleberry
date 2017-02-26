/// <reference path="../../../td/types.d.ts" />






module Application.Components {
    export class Account {
        public accounts: any;
        public account: any;
        public mode: string = 'empty';
        public setPassword: boolean = false;

        $insert = ['$location', 'libraryService', '$routeParams', '$mdDialog', '$mdToast'];
        constructor(public $location: ng.ILocationService, public libraryService: any, public $routeParams: any, private $mdDialog: any, private $mdToast: any) { }
        $onInit() {
            //  console.log(this.book)
            let l = this.libraryService;
            let aid = this.$routeParams.accountid;

            if (this.$location.url() == '/library/accounts/add') {
                this.mode = 'edit';
                aid = 0;
                this.account = {}
                this.account.Status = 'Active';
                this.account.AccountType = 'Member';

                this.setPassword = true;
            } else {

                if (!aid) {
                    this.mode = 'list';
                    l.getAccounts()
                        .then((resp: any) => { this.accounts = resp; });
                } else {
                    this.mode = 'edit';
                    if (aid > 0) {
                        l.getAccount(aid)
                            .then((resp: any) => {
                                this.account = resp.data;
                            });
                    }
                }
            }
        }
        editAccount(obj: any) {
            this.go('/library/accounts/' + obj.AccountId);
        }
        ChangePassword(ev: any) {
            this.$mdDialog.show({

                contentElement: '#myDialog',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true
            });
        }
        CancelPassword() {

            this.$mdDialog.hide();
        }
        UpdatePassword(password: string) {
            this.account.Password = password;
            this.SaveUser(3);

        }
       
        Toast(msg: string, secs:number) {
            secs = secs * 1000;
            this.$mdToast.show(
                this.$mdToast.simple()
                    .capsule(true)
                    .textContent(msg)
                    .position('top right')
                    .hideDelay(secs)
            );

        }

        Delete() {
            let a = this.account;
            let msg = 'Are you sure you want to delete ' + a.FirstName + ' ' + a.LastName + '\'s account?');
            if (confirm(msg)) {
                this.account.Status = 'Deleted';
                this.Toast("Deleting Account...",2);
                this.SaveUser(1);
            }
        }
        SaveUser(saveType: number) {
            // 1 is update, 2 is insert
            let l = this.libraryService;
            this.Toast("Saving...", 2);
            l.SaveAccount(this.account)
                .then((resp: any) => {
                    if (saveType === 0) {
                        this.Toast("Saved", 2);
                        this.account = resp.data;
                        return;
                    }


                    if (saveType === 1)
                        this.go('/library/accounts/');

                    if (saveType === 2)
                        this.go('/library/accounts/add');
                    if (saveType === 3)
                        this.$mdDialog.hide();

                });

        }
        go(url: string) {

            this.$location.url(url);
        }

        AddAccount(){

            this.go('/library/accounts/add');
        }
    }

    app.component("account", {
        controller: Account,
        bindings: { accountId: '<' },
        controllerAs: "vm",
        templateUrl: function (templates: any) { return templates.account },
    })
}