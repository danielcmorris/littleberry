/// <reference path="../../type-definitions/types.d.ts" />
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
      //  public apiServer: string = "http://api.pfsa.morrisdev.com";
          
        constructor() {
            this.number = "1.7";// + Math.random();
            let path = window.location.host;
         
            if (path.substring(0, 5) === "local") {
                this.apiServer = "http://localhost:53035";
              //  this.apiServer = "http://api.pfsa.morrisdev.com";
            } else {
                this.apiServer = "http://api.pfsa.morrisdev.com";

            }



        }
    }
    export class routes {
        $insert = ['$routeProvider', '$locationProvider','$location']
        constructor(private $routeProvider: ng.route.IRouteProvider,
            private $locationProvider: ng.ILocationProvider
        ) {
            
            this.$routeProvider
                .when('/', {
                    template: '<login></login>'
                })
                .when('/home', {
                    template: '<index></index>'
                })
                .when('/contact', {
                    template: '<contact></contact>'
                })
                .when('/contact-us', {
                    template: '<contact-us></contact-us>'
                })
                .when('/mailing-list', {
                    template: '<mailing-list></mailing-list>'
                })
                .when('/retirement', {
                    template: '<retirement-planner></retirement-planner>'
                })
                .when('/refer', {
                    template: '<refer></refer>'
                })
                .when('/survivor/:view?', {
                    template: '<survivor-needs-planner></survivor-needs-planner>'
                })

                .when('/cp/:view?', {
                    template: '<college-planner></college-planner>'

                })
                .when('/agents', {
                    template: '<agent-list></agent-list>'
                })
                .when('/linc', {
                    template: '<needs></needs>'
                })
                .when('/library/catalog', {
                    template: '<navbar></navbar><library></library>'
                })
                .when('/library/catalog/add', {
                    template: '<navbar></navbar><book></book>'
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
                .when('/library/subjects', {
                    template: '<navbar></navbar><subjects></subjects>'
                })

                .when('/library/accounts/add', {
                    template: '<navbar></navbar><account></account>'
                })
                .when('/library/accounts/:accountid', {
                    template: '<navbar></navbar><account></account>'
                })
                .when('/library/accounts', {
                    template: '<navbar></navbar><account></account>'
                })
                .when('/library/preview/:barcode', {
                    template: '<book-preview></book-preview>'
                })
                .when('/madlib', {
                    template: '<madlib></madlib>'
                }).when('/hang-man', {
                    template: '<hang-man></hang-man>'
                })
                .when('/request-quote', {
                    template: '<request-quote email-to="it@morrisdev.com"></request-quote>'
                })
                .when('/library/recent-additions', {
                    template: '<recent-additions></recent-additions>'
                })
                .otherwise({ redirectTo: '/' });;

                this.$locationProvider.html5Mode(false);

                //if ($sessionStorage.myaccount) {

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

    interface IHttpProviderLocal extends ng.IHttpProvider {
        defaults: any;
    }
    export class httpConfig {
        $insert = ["$httpProvider"]
        constructor(private $httpProvider: IHttpProviderLocal) {

            this.$httpProvider.defaults.useXDomain = true;
            this.$httpProvider.defaults.withCredentials = false;
            delete this.$httpProvider.defaults.headers.common["X-Requested-With"];
            //this.$httpProvider.defaults.headers.common["Accept"] = "application/json";
            //  this.$httpProvider.defaults.headers.common["Content-Type"] = "application/json";
        }
    }
    app.config(httpConfig)

    
    export class templates {

        /* PAGES */
         public index: string = ROOT_PATH +"app/pages/index/index.html";       
         public library: string = ROOT_PATH +"app/pages/library.html";
         
        /* LIBRARY COMPONENTS */
        public book: string = ROOT_PATH + "app/pages/book/book.html";
        public subjects: string = ROOT_PATH + "app/pages/subjects/subjects.html";
        public account: string = ROOT_PATH + "app/pages/account/account.html";
        public navbar: string = ROOT_PATH + "app/pages/navbar/navbar.html";
        public reservation: string = ROOT_PATH + "app/pages/reservation/reservation.html";
        public requests: string = ROOT_PATH + "app/pages/requests/requests.html";
        public bookTile: string = ROOT_PATH + "app/pages/library/book/bookTile.html";
        public recentAdditions: string = ROOT_PATH + "app/pages/library/recentAdditions/recentAdditions.html";


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
            console.log(window.location.pathname);
            let v = new version()
            
            this.index += "?v=" + v.number;
            this.library += "?v=" + v.number;
            this.book += "?v=" + v.number;



        }
    }
    app.service("templates", templates)


}