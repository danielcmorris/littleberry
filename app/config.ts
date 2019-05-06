declare var ROOT_PATH: string;


module Application.Config {
   export interface ITemplates {
        GetUrl(templateName: string): string;
    }

    export class version {
        public number: string;
        public author: string = "Morris Development";
        public supportContact: string = "dmorris@morrisdev.com";
        public apiKey: string = "dswejkdfkui8yoihkjnlj98776tsad87sd9809fdijsnekjjdsoidjs";
        public apiServer: string = "http://localhost:53035/";
        
        
        constructor() {
            this.number = "1.8";// + Math.random();
            let path = window.location.host;
         
            if (path.substring(0, 5) === "local") {
            //    this.apiServer = "http://localhost:53035";
                this.apiServer = "https://pfsaapi.azurewebsites.net"
             
            } else {
                       // this.apiServer = "https://api.pfsa.morrisdev.com";
                this.apiServer = "https://pfsaapi.azurewebsites.net"

            }



        }
    }
    
    interface IHttpProviderLocal extends ng.IHttpProvider {
        defaults: any;
    }
    export class httpConfig {
        $inject = ["$httpProvider"]
        constructor(private $httpProvider: IHttpProviderLocal) {

            this.$httpProvider.defaults.useXDomain = true;
            this.$httpProvider.defaults.withCredentials = false;
            delete this.$httpProvider.defaults.headers.common["X-Requested-With"];
            //this.$httpProvider.defaults.headers.common["Accept"] = "application/json";
            //  this.$httpProvider.defaults.headers.common["Content-Type"] = "application/json";
        }
    }
    app.config(httpConfig)

    
    // export class AuthZero{
    //     $inject = ["angularAuth0Provider"]
    //     constructor(private auth:any){

    //     }
    // }
    // app.config(AuthZero)



    export class templates {

        /* PAGES */
             
         
        /* LIBRARY COMPONENTS */
        public library: string = ROOT_PATH +"app/pages/index/library.html";
        public home: string = ROOT_PATH +"app/pages/home/home.html";
         public author: string = ROOT_PATH +"app/pages/author/author.html";
        public book: string = ROOT_PATH + "app/pages/book/book.html";
        public subjects: string = ROOT_PATH + "app/pages/subjects/subjects.html";
        public account: string = ROOT_PATH + "app/pages/account/account.html";
        public navbar: string = ROOT_PATH + "app/pages/navbar/navbar.html";
        public reservation: string = ROOT_PATH + "app/pages/reservation/reservation.html";
        public requests: string = ROOT_PATH + "app/pages/requests/requests.html";
        public recentAdditions: string = ROOT_PATH + "app/pages/library/recentAdditions/recentAdditions.html";
        public myRequests: string = ROOT_PATH + "app/pages/requests/my-requests.html";

public bookTile: string = ROOT_PATH + "app/pages/library/book/bookTile.html";
        

        /* COMPONENTS */
        public address: string = ROOT_PATH +"app/components/address/address.html";
        public assets: string = ROOT_PATH + "app/components/assets/assets.html";
        public cashNeeds: string = ROOT_PATH +"app/components/cashNeeds/cashNeeds.html";
        public contact: string = ROOT_PATH + "app/components/contact/contact.html";
        public contactUs: string = ROOT_PATH + "app/components/contact-us/contact-us.html";
        public dependants: string = ROOT_PATH + "app/components/dependants/dependants.html";
        public income: string = ROOT_PATH + "app/components/income/income.html";
        public insurance: string = ROOT_PATH + "app/components/insurance/insurance.html";
        public liabilities: string = ROOT_PATH + "app/components/liabilities/liabilities.html";
        public librarySearch: string = ROOT_PATH + "app/components/library-search/library-search.html";
        public needs: string = ROOT_PATH +"app/components/needs/needs.html";
        public objectives: string = ROOT_PATH + "app/components/objectives/objectives.html";
        public pension: string = ROOT_PATH +"app/components/pension/pension.html";
        public primaryContact: string = ROOT_PATH + "app/components/primaryContact/primaryContact.html";
        public rateAssumptions: string = ROOT_PATH + "app/components/rateAssumptions/rateAssumptions.html";
        public receipts: string = ROOT_PATH +"app/components/receipts/receipts.html";
        public savings: string = ROOT_PATH + "app/components/savings/savings.html";
        public socialSecurityOverride: string = ROOT_PATH +"app/components/socialSecurityOverride/socialSecurityOverride.html";
        public spousalContact: string = ROOT_PATH +"app/components/spousalContact/spousalContact.html";
        public survivorNeeds: string = ROOT_PATH + "app/components/survivorNeeds/survivorNeeds.html";
        public mailingList: string = ROOT_PATH + "app/components/mailingList/mailingList.html";
        public madlibs: string = ROOT_PATH + "app/components/madlibs/madlibs.html";
        public hangMan: string = ROOT_PATH + "app/components/hangman/hangman.html";

        public requestQuote: string = ROOT_PATH + "app/components/request-quote/request-quote.html";
        public refer: string = ROOT_PATH + "app/components/refer/refer.html";


        
         
        GetUrl(templateName: string) {
            let s = this;
            switch (templateName) {
                case 'address':
                    return s.address;
                case  'mailingList':
                    return s.mailingList + "?v=" + new Date();
                case 'requestQuote':
                    return s.requestQuote + "?v=" + new Date();
                case 'refer':
                    return s.refer+ "?v=" + new Date();
                default:
                    console.log("ERROR: TEMPLATE " + templateName + " NOT FOUND");
                    return 'ERROR';
                }

        }
        constructor() {
             
            let v = new version()
            
             
            this.library += "?v=" + v.number;
            this.book += "?v=" + v.number;



        }
    }
    app.service("templates", templates)


}