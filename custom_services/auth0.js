angular.module('CustomAuth0',[])

.service('CustomAuth0', function(){

    var webAuth = new auth0.WebAuth({
        clientID: 'LHdL4hUjgN6ulY31zLDl6xaaQsM-BAvG',
        domain: 'littleberry.auth0.com',
        redirectUri: setDomain(),
        responseType: 'token id_token',
        scope: 'openid email profile'
    });
   
    function setDomain(){
        var full = location.protocol+'//'+location.hostname+(location.port ? ':'+location.port: '');
        full = full +'/#/callback';
        console.log('RedirectURL Host',full)

        return full;

        // let d = window.location.hostname;
        // if(d==='localhost'){
        //     id='http://'+d;
        // }else{
        //     d='https://'+d;            
        // }
        // console.log(d)
    }
    this.login = function() {

        webAuth.authorize({});

    }
    this.logout =function () {
        // Remove tokens and expiry time from localStorage
        localStorage.removeItem('access_token');
        localStorage.removeItem('id_token');
        localStorage.removeItem('expires_at');
        window.location.href="/login";
    }
    this.profile =function() {
      
        webAuth.parseHash(function (err, data) {
            console.log(err, data);
            if (err) {
                console.log('ERROR!', err);
                return (err);

            }
            if (data) {

                if (data.accessToken) {
                    
                     localStorage.setItem("access_token",data.accessToken);
                     localStorage.setItem("id_token",data.idToken);
                     localStorage.setItem("expires_at",data.expiresIn);

                    webAuth.client.userInfo(data.accessToken, function (err, data) {
                        localStorage.setItem("email",data.email);
                        localStorage.setItem("name",data.name);
                        localStorage.setItem("familyName",data.familyName);
                        localStorage.setItem("givenName",data.givenName);
                        localStorage.setItem("picture",data.picture )
                      
                        if (data) { console.log("UserInfo", data); }
                    });
                }
            }
            // window.location.hash = '';
        });
    }


   
});