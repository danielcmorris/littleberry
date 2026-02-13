declare function profile(): any;
declare var auth0: any;

module Application.Config {
    export class routes {
        Login(): void {
            let email = localStorage.getItem("email");
            if (email) {
                var a = new Library.Models.Account();
                a.Email = email;
                a.FirstName = localStorage.getItem("givenName");
                a.LastName = localStorage.getItem("familyName");
                a.Password = localStorage.getItem("access_token");
            }
        }

        static $inject = ['$routeProvider', '$locationProvider'];
        constructor(
            private $routeProvider: ng.route.IRouteProvider,
            private $locationProvider: ng.ILocationProvider
        ) {
            var a = new Authorization;
            var webAuth = new auth0.WebAuth(a.authorization);
            webAuth.parseHash({ hash: window.location.hash }, function (err: any, authResult: any) {
                if (!authResult) {
                    return console.log('authResult', err);
                } else {
                    console.log('authResult', authResult);
                    localStorage.setItem('authResult', JSON.stringify(authResult));
                    localStorage.setItem('access_token', authResult.accessToken);
                    localStorage.setItem('id_token', authResult.idToken);
                    var t = new Date();
                    t.setSeconds(t.getSeconds() + authResult.expiresIn);
                    localStorage.setItem('expires_at', t.toString());
                }
            });

            this.$routeProvider
                .when('/login', {
                    template: '<login-page></login-page>'
                })
                .when('/callback', {
                    template: '<callback-page></callback-page>'
                })
                .when('/', {
                    template: '<home></home>'
                })
                .when('/home', {
                    template: '<home></home>'
                })
                .when('/member/join', {
                    template: '<account mode="\'join\'"></account>'
                })
                .when('/member/requests', {
                    template: '<my-requests></my-requests>'
                })
                .when('/member/', {
                    template: '<profile></profile>'
                })
                .when('/member/welcome', {
                    template: '<home></home>'
                })
                .when('/library/catalog', {
                    template: '<library mode="\'full\'"></library>'
                })
                .when('/library/recent', {
                    template: '<library mode="\'recent\'"></library>'
                })
                .when('/library/subject/:prefix', {
                    template: '<library mode="\'subject\'"></library>'
                })
                .when('/library/author', {
                    template: '<author mode="\'list\'"></author>'
                })
                .when('/library/author/:author', {
                    template: '<library mode="\'author\'"></library>'
                })
                .when('/library/catalog/add', {
                    template: '<book></book>'
                })
                .when('/library/catalog/:prefix', {
                    template: '<library></library>'
                })
                .when('/library/catalog/request/:prefix/:booknumber', {
                    template: '<reservation></reservation>'
                })
                .when('/library/catalog/:mode/:prefix/:booknumber', {
                    template: '<book></book>'
                })
                .when('/library/advanced', {
                    template: '<reservation></reservation>'
                })
                .when('/library/requests', {
                    template: '<requests></requests>'
                })
                .when('/library/requests/:mode/:prefix/:booknumber', {
                    template: '<requests></requests>'
                })
                .when('/library/requests/:modem', {
                    template: '<requests></requests>'
                })
                .when('/library/subjects', {
                    template: '<subjects></subjects>'
                })
                .when('/library/accounts/add', {
                    template: '<account mode="\'add\'"></account>'
                })
                .when('/library/accounts/:accountid', {
                    template: '<account mode="\'edit\'"></account>'
                })
                .when('/library/accounts', {
                    template: '<account mode="\'list\'"></account>'
                })
                .when('/library/preview/:barcode', {
                    template: '<book-preview></book-preview>'
                })
                .when('/library/recent-additions', {
                    template: '<recent-additions></recent-additions>'
                })
                .otherwise({ redirectTo: '/' });

            this.$locationProvider.html5Mode(false);
        }
    }
    app.config(routes);
}
