/// <reference path="../../type-definitions/types.d.ts" />
 
 
module Application.Controllers{
    
    export class MainCtrl{
        public Title:string;
        $insert= ['$route', '$routeParams', '$location'];
        constructor(private $route: ng.route.IRouteService,
            private $routeParams: ng.route.IRouteParamsService,
            private $location:ng.ILocationService) {
            //console.log(this.$routeParams);
             var v=new Application.Config.version()
            console.log(v)
            this.Title="PFSA Library Version "+v.number;


            
       
        }
    }


    app.controller("MainCtrl", MainCtrl);


}

app.factory('$localstorage', ['$window', function ($window:ng.IWindowService) {
    return {
        set: function (key: any, value: any) {
            $window.localStorage[key] = value;
        },
        get: function (key: any, defaultValue: any) {
            return $window.localStorage[key] || false;
        },
        setObject: function (key: any, value: any) {
            $window.localStorage[key] = JSON.stringify(value);
        },
        getObject: function (key: any) {
            if ($window.localStorage[key] != undefined) {
                return JSON.parse($window.localStorage[key] || false);
            }
            return false;
        },
        remove: function (key: any) {
            $window.localStorage.removeItem(key);
        },
        clear: function () {
            $window.localStorage.clear();
        }
    }
}]);