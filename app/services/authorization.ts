//module Application.Services{
class Authorization {
    public googleClient = "773988801980-kf3n06kh3jbgvqb5s3j7iknmfketfh7k.apps.googleusercontent.com";
    public googleSecret = "T0eBdFhxwSip6OB4WGNlpxQw"
    public authorization = {
        clientID: 'LHdL4hUjgN6ulY31zLDl6xaaQsM-BAvG',
        domain: 'littleberry.auth0.com',

    }

    login() {

        var webAuth = new auth0.WebAuth(this.authorization);
        webAuth.authorize({
            redirectUri: location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '') + '/callback',
            responseType: 'token id_token',
            scope: 'openid email profile',
            connection: 'google-oauth2'

        });

    }
    logout() {
        console.log('this.authorization', this.authorization);

        var webAuth = new auth0.WebAuth(this.authorization);
        // webAuth.logout({
        //     returnTo: location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '') + '/callback',
        //     client_id: clientID
        // })

        localStorage.removeItem('access_token');
        localStorage.removeItem('id_token');
        localStorage.removeItem('expires_at');


    }
    profile() {


        if (localStorage.getItem('authResult')) {

            let userProfile = JSON.parse(localStorage.getItem('authResult'));
            if (userProfile.idTokenPayload) {
                return userProfile.idTokenPayload;
            } else {
                return null;
            }
        }
    }

}
