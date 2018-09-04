angular.module('CustomAuth0', [])
    .service('CustomAuth0', function () {
    var googleClient = "773988801980-kf3n06kh3jbgvqb5s3j7iknmfketfh7k.apps.googleusercontent.com";
    var googleSecret = "T0eBdFhxwSip6OB4WGNlpxQw";
    var authorization = {
        clientID: 'LHdL4hUjgN6ulY31zLDl6xaaQsM-BAvG',
        domain: 'littleberry.auth0.com'
    };
    function setDomain(p) {
        var full = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '');
        full = full + '/' + p;
        console.log('RedirectURL Host', full);
        return full;
    }
    this.login = function () {
        var webAuth = new auth0.WebAuth(authorization);
        webAuth.authorize({
            redirectUri: location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '') + '/callback',
            responseType: 'token id_token',
            scope: 'openid email profile',
            connection: 'google-oauth2'
        });
    };
    this.logout = function () {
        console.log('this.authorization', authorization);
        var webAuth = new auth0.WebAuth(authorization);
        // webAuth.logout({
        //     returnTo: location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '') + '/callback',
        //     client_id: clientID
        // })
        localStorage.removeItem('access_token');
        localStorage.removeItem('id_token');
        localStorage.removeItem('expires_at');
    };
    this.loadSession = function () {
    };
    this.profile = function () {
        var accessToken = localStorage.getItem("access_token");
        var webAuth = new auth0.WebAuth(authorization);
        webAuth.parseHash({ hash: window.location.hash }, function (err, authResult) {
            if (err) {
                return console.log(err);
            }
            else {
                console.log(authResult);
            }
        });
        if (!accessToken) {
            accessToken = 'ERROR';
        }
        console.log('getting user info:', accessToken);
        webAuth.client.userInfo(accessToken, function (err, data) {
            if (!data) {
                console.log('user not logged in');
            }
            else {
                console.log('UserInfo Data', data);
                localStorage.setItem("email", data.email);
                localStorage.setItem("name", data.name);
                //localStorage.setItem("familyName", data.familyName);
                // localStorage.setItem("givenName", data.givenName);
                localStorage.setItem("picture", data.picture);
            }
            if (data) {
                console.log("UserInfo", data);
            }
        });
    };
});
