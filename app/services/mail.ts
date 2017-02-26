/*
{"to":"it@morrisdev.com","from":"dmorris@morrisdev.com",
	"subject":"Holy Crap, it works!",
	"message":"Hi Lucille, this is a message",
	"key":"dswejkdfkui8yoihkjnlj98776tsad87sd9809fdijsnekjjdsoidjs"
}
*/



module Application.Services {
     
    
    
    export class MailService {
        $insert = ["$http", "$location"]
        private mydomain:string
        constructor(private $http: ng.IHttpService, $location: ng.ILocationService) {
            this.mydomain = $location.protocol() + "://" + $location.host()
        }

        SendMail(obj: Application.Types.IEmail): ng.IPromise<any> {
            this.mydomain = "http://pfsa.morrisdev.com";
            let url = this.mydomain+"/wp-content/themes/aspire/custom/widgets/emailer.php";
            return this.$http.post(url, obj);
        }


    }
    app.service("mailService", MailService);

}