
module Application.Controllers{

    export class MainCtrl{
        public Title:string;
        static $inject = ['$route', '$routeParams', '$location', '$window'];
        constructor(private $route: ng.route.IRouteService,
            private $routeParams: ng.route.IRouteParamsService,
            private $location:ng.ILocationService ,
            private $window:Window) {
        }

        $onInit(): void {
            var v = new Application.Config.version();
            console.log(v);
            this.Title = "PFSA Library Version " + v.number;
        }
    }

    app.controller("MainCtrl", MainCtrl);
}
