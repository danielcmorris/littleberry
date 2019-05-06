
module Application.Components {



    class callback {
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
        $inject = ['$location', '$timeout', 'libraryService', '$cookies', '$sessionStorage', '$window']
        constructor(private $location: ng.ILocationService, private $timeout: ng.ITimeoutService
            , private libraryService: any
            , private $cookies: any
            , private $sessionStorage: any, private $window: ng.IWindowService) {
 
            console.log('Called back!')
        }
        
    }
    app.component("callback", {
        controller: callback,
        bindings: { refreshStatus: '&', redirect: '<' },
        controllerAs: "vm",
        templateUrl: "app/pages/callback/callback.html?v=" + new Date(),
    })
}
