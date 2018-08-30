
module Application.Components {



    class login {
        public title: string;
        public admittance: number;
        public discharge: number;
        public goal: number;
        public username: string;
        public password: string;
        public errorMessage: string;
        public refreshStatus: Function;
        public redirect: string;
        public loading: boolean = false;
        $insert = ['$location', '$timeout', 'libraryService', '$cookies', '$sessionStorage', '$window', 'CustomAuth0']
        constructor(private $location: ng.ILocationService, private $timeout: ng.ITimeoutService
            , private libraryService: any
            , private $cookies: any
            , private $sessionStorage: any, private $window: ng.IWindowService,
            private CustomAuth0:any) {
            this.password = '';

        }
        LoginKey(keyEvent: any) {
            if (keyEvent.which === 13) {
                this.Login();
            }
        }
        Login() {
            console.log("logging in");
            this.CustomAuth0.login();
            return false;
            if (this.password != '') {
                this.loading = true
                this.libraryService.Login(this.username, this.password)
                    .then((resp: any) => {

                        this.$sessionStorage.myaccount = resp.data;
                        console.log("SUCCESSFUL LOGIN")
                        this.refreshStatus();
                        //  this.$location.url(this.redirect);
                        if (!this.redirect) {
                            this.$location.url('/catalog');
                        } else {
                            this.$window.location.href = this.redirect + "?redirect=true";
                        }

                    }, (resp: any) => {
                        this.password = '';
                        this.errorMessage = 'Sorry, wrong username/password.';
                        this.loading = false;
                        this.$timeout(() => {
                            this.errorMessage = '';
                        }, 3200);

                    });
            }

        }
        $onInit() {
            let account = this.getCookie("account");

            if (account.Email) {
                this.username = account.Email;
            }
        }
        setCookie(cookieName: any, obj: IIncome) {
            let expireDate = new Date()
            expireDate.setDate(expireDate.getDate() + 100);
            this.$cookies.putObject(cookieName, obj, { expires: expireDate });
        }
        getCookie(cookieName: any): any {
            let obj: any = this.$cookies.getObject(cookieName)
            if (!obj) {
                obj = {};
            }
            return obj;
        }
    }
    app.component("login", {
        controller: login,
        bindings: { refreshStatus: '&', redirect: '<' },
        controllerAs: "vm",
        templateUrl: "app/pages/login/login.html?v=" + new Date(),
    })
}
