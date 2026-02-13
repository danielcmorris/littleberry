class Authorization {
    public googleClient: string = "773988801980-kf3n06kh3jbgvqb5s3j7iknmfketfh7k.apps.googleusercontent.com";
    public googleSecret: string = "T0eBdFhxwSip6OB4WGNlpxQw";
    public authorization = {
        clientID: 'LHdL4hUjgN6ulY31zLDl6xaaQsM-BAvG',
        domain: 'littleberry.auth0.com',
    };

    public isAuthenticated(): boolean {
        try {
            const expiresAt = JSON.parse(localStorage.getItem('expires_at') || '{}');
            return new Date().getTime() < expiresAt;
        } catch {
            return false;
        }
    }

    login(): void {
        var webAuth = new auth0.WebAuth(this.authorization);
        webAuth.authorize({
            redirectUri: location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '') + '/#/callback',
            responseType: 'token id_token',
            scope: 'openid email profile',
        });
    }

    logout(): void {
        var webAuth = new auth0.WebAuth(this.authorization);
        webAuth.logout({
            returnTo: location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '') + '/',
            client_id: this.authorization.clientID,
        });
        localStorage.removeItem('access_token');
        localStorage.removeItem('id_token');
        localStorage.removeItem('expires_at');
    }

    profile(): any {
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
