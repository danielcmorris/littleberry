
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

        static $inject = ['$location', '$timeout', 'libraryService', '$cookies', '$sessionStorage', '$window'];
        constructor(
            private $location: ng.ILocationService,
            private $timeout: ng.ITimeoutService,
            private libraryService: any,
            private $cookies: any,
            private $sessionStorage: any,
            private $window: ng.IWindowService
        ) { }

        $onInit(): void {
            this.password = '';
            let account = this.getCookie("account");
            if (account.Email) {
                this.username = account.Email;
            }
        }

        $onDestroy(): void { }

        setCookie(cookieName: any, obj: any): void {
            let expireDate = new Date();
            expireDate.setDate(expireDate.getDate() + 100);
            this.$cookies.putObject(cookieName, obj, { expires: expireDate });
        }

        getCookie(cookieName: any): any {
            let obj: any = this.$cookies.getObject(cookieName);
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
