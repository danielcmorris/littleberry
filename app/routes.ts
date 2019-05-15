declare function profile():any;
declare var auth0:any;

module Application.Config{
    export class routes {
        Login() {
            let email = localStorage.getItem("email");
            if(email){
                var a = new Library.Models.Account();
                a.Email = email;
                a.FirstName = localStorage.getItem("givenName");
                a.LastName = localStorage.getItem("familyName");
                a.Password = localStorage.getItem("access_token");                
                }            
        }


        $inject = ['$routeProvider', '$locationProvider',  ]
        constructor(private $routeProvider: ng.route.IRouteProvider,
            private $locationProvider: ng.ILocationProvider   
          
            
        ) {
            var a = new Authorization;
            var authorization = {
                clientID: 'LHdL4hUjgN6ulY31zLDl6xaaQsM-BAvG',
                domain: 'littleberry.auth0.com',
    
            }

            
            var webAuth = new auth0.WebAuth(a.authorization);
            webAuth.parseHash({ hash: window.location.hash }, function(err:any, authResult:any) {
                if (!authResult) {
                    return console.log('authResult',err);
  
                  }else{
                      console.log('authResult',authResult)
                      localStorage.setItem('authResult',JSON.stringify(authResult))
                      localStorage.setItem('access_token',authResult.accessToken);
                      localStorage.setItem('id_token',authResult.idToken);
                      var t = new Date();
                      t.setSeconds(t.getSeconds() + authResult.expiresIn);
                      localStorage.setItem('expires_at',t.toString());
                  }
                });


 
            this.$routeProvider
                .when('/login', {
                    template: '<navbar></navbar><login-page></login-page>'
                })
                .when('/callback', {
                    template: '<navbar></navbar><callback-page></callback-page>'
                })
                .when('/', {
                    template: '<navbar></navbar><home></home>'
                }) 
                 .when('/home', {
                    template: '<navbar></navbar><home></home>'
                })   
                 .when('/member/join', {
                    template: '<navbar></navbar><account mode="\'join\'"></account>'
                })
                .when('/member/requests', {
                    template: '<navbar></navbar><my-requests></myrequests>'
                })
                .when('/member/', {
                    template: '<navbar></navbar><profile></profile>'
                })
                .when('/member/welcome', {
                    template: '<navbar></navbar><home></home>'
                })
                .when('/library/catalog', {
                    template: '<navbar></navbar><library mode="\'full\'"></library>'
                })
                .when('/library/recent', {
                    template: '<navbar></navbar><library mode="\'recent\'"></library>'
                })
                .when('/library/subject/:prefix', {
                    template: '<navbar></navbar><library mode="\'subject\'"></library>'
                })             
                .when('/library/author', {
                    template: '<navbar></navbar><author mode="\'list\'"></author>'
                })
                .when('/library/author/:author', {
                    template: '<navbar></navbar><library mode="\'author\'"></library>'
                })
                .when('/library/catalog/add', {
                    template: '<navbar></navbar><book></book>'
                })
                .when('/library/catalog/:prefix', {
                    template: '<navbar></navbar><library></library>'
                })
                .when('/library/catalog/request/:prefix/:booknumber', {
                    template: '<navbar></navbar><reservation></reservation>'
                })
                .when('/library/catalog/:mode/:prefix/:booknumber', {
                    template: '<navbar></navbar><book></book>'
                })                                                 
                .when('/library/advanced', {
                    template: '<navbar></navbar><reservation></reservation>'
                })                
                .when('/library/requests', {
                    template: '<navbar></navbar><requests></requests>'
                })
                .when('/library/requests/:mode/:prefix/:booknumber', {
                    template: '<navbar></navbar><requests></requests>'
                })
                .when('/library/requests/:modem', {
                    template: '<navbar></navbar><requests></requests>'
                })
                .when('/library/subjects', {
                    template: '<navbar></navbar><subjects></subjects>'
                })
                .when('/library/accounts/add', {
                    template: '<navbar></navbar><account mode="\'add\'"></account>'
                })
                .when('/library/accounts/:accountid', {
                    template: '<navbar></navbar><account mode="\'edit\'"></account>'
                })
                .when('/library/accounts', {
                    template: '<navbar></navbar><account mode="\'list\'"></account>'
                })
                .when('/library/preview/:barcode', {
                    template: '<book-preview></book-preview>'
                })                
                .when('/library/recent-additions', {
                    template: '<recent-additions></recent-additions>'
                })
                .otherwise({ redirectTo: '/' });;

                this.$locationProvider.html5Mode(false);
                //this.$locationProvider.hashPrefix('');
                //if ($sessionStorage.myaccount) {
///this is a test
                //    let sid = $sessionStorage.myaccount.SessionId;
                //    console.log(sid);
                //}
                //else {
                //    if (this.$location.path != '/') {
                //        this.$location.url('/');
                //    }
                //}

        }
    }
    app.config(routes);

}