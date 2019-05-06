
module Application.Controllers{
    
    export class MainCtrl{
        public Title:string;
        $inject= ['$route', '$routeParams', '$location' ];
        constructor(private $route: ng.route.IRouteService,
            private $routeParams: ng.route.IRouteParamsService,
            private $location:ng.ILocationService ,
            private $window:Window) {
            //console.log(this.$routeParams);

            // if ($location.protocol() !== 'https' && $location.host() != 'localhost') {
            //     $window.location.href = $location.absUrl().replace('http', 'https');
            // }
            $window.location.href = $location.absUrl().replace('https://', 'http://');

             var v=new Application.Config.version()
            console.log(v)
            this.Title="PFSA Library Version "+v.number;
            

            
       
        }
    }


    app.controller("MainCtrl", MainCtrl);


}

// module Application.Services{
    
//     class LocalStorage{
//         $inject = "$window";
//         constructor(private $window:ng.IWindowService){
            
//         }
        
        
//     }
// }
// app.factory('$localstorage', ['$window', function ($window:ng.IWindowService) {
    
//     return {
//         set: function (key: any, value: any) {
//             $window.localStorage[key] = value;
//         },
//         get: function (key: any, defaultValue: any) {
//             return $window.localStorage[key] || false;
//         },
//         setObject: function (key: any, value: any) {
//             $window.localStorage[key] = JSON.stringify(value);
//         },
//         getObject: function (key: any) {
//             if ($window.localStorage[key] != undefined) {
//                 return JSON.parse(<any>$window.localStorage[key] || false);
//             }
//             return false;
//         },
//         remove: function (key: any) {
//             $window.localStorage.removeItem(key);
//         },
//         clear: function () {
//             $window.localStorage.clear();
//         }
//     }
// }]);