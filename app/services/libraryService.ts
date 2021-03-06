
module Application.Config {
    export class LibraryConfig {

        static get imageServer(): any { return 'https://d2rg9t5epa49og.cloudfront.net' }
        static get defaultBookImage(): any { return 'assets/book.png' }


    }
}

module Application.Services {
    export interface ISubject {
        subject: string;
        code: string;
    }
    export class libraryService {
        private _sid:any;
        get  sid():string {
           return this.getSessionId(); 
        }
        set sid(id:string) {
            this._sid = id;
        }
       // public sid: any  {};
        public server: string;
        public imageServer: string;
        $inject = ["$http", "$sessionStorage", "$location", "$q"]
        constructor(private $http: any, private $sessionStorage: any, private $location: any, private $q: any) {

            let v = new Application.Config.version()

            this.server = v.apiServer;

            this.$sessionStorage.myaccount = JSON.parse(localStorage.getItem("account"));
            if (this.$sessionStorage.myaccount) {
                this.sid = this.$sessionStorage.myaccount.SessionId;
            } else {
                this.sid = 'not found';
            }
            if (this.sid == 'not found') {
                try {
                    JSON.parse(localStorage.getItem("account")).SessionId
                } catch{
                    console.log("ERROR: No SessionID in sessionStorage OR localStorage!")
                }
            }
            
        }
        getSessionId() {
            try {

                return JSON.parse(localStorage.getItem("account")).SessionId;

            } catch{
                return null;
            }


        }
        checkLogin() {

            // if (this.$sessionStorage.myaccount) {
            //     this.sid = this.$sessionStorage.myaccount.SessionId;
            // }
            // else {
            //     if (this.$location.path != '/') {
            //         // this.$location.url('/')
            //         alert('redircting!')
            //     };

            // }

        }

        getAccounts(): ng.IHttpPromise<any> {
            // this.checkLogin();
            let deferred: any = this.$q.defer();
            let url: string = this.server + "/library/account?sid=" + this.getSessionId();
            this.$http.get(url)
                .then((resp: any) => {
                    deferred.resolve(resp.data);
                });

            return deferred.promise;
        }
        getAuthorsByBookCount(bookCount: number): ng.IHttpPromise<any> {

            let deferred: any = this.$q.defer();
            let resolved: boolean = false;

            if (this.$sessionStorage.authors && bookCount === 1) {
                let s = this.$sessionStorage.authors;
                deferred.resolve(s);
                resolved = true;
            }
            if (this.$sessionStorage.authors30 && bookCount === 30) {
                let s = this.$sessionStorage.authors30;
                deferred.resolve(s);
                resolved = true;
            }
            if (!resolved) {

                let url: string = this.server + "/api/author?bookCount=" + bookCount;
                this.$http.get(url)
                    .then((resp: any) => {
                        if (bookCount === 1) {
                            this.$sessionStorage.authors = resp.data;
                        }
                        if (bookCount === 30) {
                            this.$sessionStorage.authors30 = resp.data;
                        }
                        deferred.resolve(resp.data);
                    });
            }
            return deferred.promise;
        }
        getSubjects(): ng.IHttpPromise<any> {
            var deferred: any;
            deferred = this.$q.defer();
            console.log("GETTING SUBJECTS")
            let url: string = this.server + "/api/subject"
            this.$http.get(url)
                    .then((resp: any) => {
                        this.$sessionStorage.subjects = resp.data;
                        deferred.resolve(resp.data);
                        console.log()
                    });
            return deferred.promise;
        }
        saveSubject(subject: any) {


            this.checkLogin()
            let url = this.server + "/api/subject?" + this.sid;
            if (subject.SubjectId > 0) {
                console.log("PUT")
                return this.$http.put(url, subject);
            } else {
                console.log("POSTED")
                return this.$http.post(url, subject);
            }

        }
        Login(email: string, password: string) {
            let creds = { "email": email, "password": password };

            let url = this.server + "/api/Account/";
            return this.$http.post(url, creds)
        }
        autoLogin(account: Application.Library.Models.Account) {

            let url: string = this.server + "/api/autologin";

            return this.$http.post(url, account)


        }


        uploadImage(fd: any) {
            this.checkLogin()
            let url = this.server + "/api/image/";
            return this.$http.post(url, fd, {
                transformRequest: angular.identity,
                headers: { 'Content-Type': undefined }
            })

        }
        getBook(Prefix: string, BookNumber: number) {
            let url = this.server + "/api/library/catalog/" + Prefix + "/" + BookNumber;
            return this.$http.get(url);

        }
        getBookHistory(Prefix: string, BookNumber: number) {
            let url = this.server + "/library/catalog/" + Prefix + "/" + BookNumber + "/history";
            console.log("Getting book history")
            return this.$http.get(url);

        }
        getAccount(id: number) {
            this.checkLogin()
            let url = this.server + "/library/account/" + id + "?sid=" + this.sid;
            return this.$http.get(url);

        }
        AddRequest(callnumber: string, email: string): Application.Library.Types.IBook {
            let obj: any = { "CallNumber": callnumber, "RequestByEmail": email };
            let url = this.server + "/library/request?sid=" + this.sid;
            return this.$http.post(url, obj);
        }
        getOpenRequests() {
            this.checkLogin()

            let url = this.server + "/library/request?sid=" + this.sid;
            return this.$http.get(url);
        }
        getRequest(id: number) {
            let url = this.server + "/library/request/" + id + "?sid=" + this.sid;
            return this.$http.get(url);
        }
        UpdateRequest(obj: any) {

            this.checkLogin()

            let url = this.server + "/library/request?sid=" + this.sid;
            return this.$http.put(url, obj);

        }
        saveBook(book: Application.Library.Types.IBook) {

            this.checkLogin()
            let url = this.server + "/api/catalog?sid=" + this.sid;
            if (book.BookId > 0) {
                return this.$http.put(url, book);
            } else {
                return this.$http.post(url, book);
            }

        }
        Search(subject: string, author: string, title: string) {

            let url = this.server + "/api/library/search?prefix=" + subject + "&author=" + author + "&title=" + title;
            return this.$http.get(url);

        }
        LookupAccount(searchType: string, q: string) {
            var deferred: any;
            if (this.sid) {

                deferred = this.$q.defer();

                let url: string = this.server + "/library/accounts/search/email?q=" + q + "&sid=" + this.sid;
                this.$http.get(url)
                    .then((resp: any) => {

                        deferred.resolve(resp);
                    });
            }
            return deferred.promise;
        }
        SaveAccount(account: any) {
            var deferred: any;
            deferred = this.$q.defer();

            let url: string = this.server + "/library/account?sid=" + this.sid;
            if (account.AccountId > 0) {
                this.$http.put(url, account)
                    .then((resp: any) => {
                        deferred.resolve(resp);
                    });
            } else {
                this.$http.post(url, account)
                    .then((resp: any) => {
                        deferred.resolve(resp);
                    });
            }
            return deferred.promise;
        }
        UpdateAccountPassword(id: number, password: string) {
            var deferred: any;
            deferred = this.$q.defer();
            let obj: any = {};
            obj.AccountId = id;
            obj.NewPassword = password;

            let url: string = this.server + "/library/account?sid=" + this.sid;

            this.$http.put(url, obj)
                .then((resp: any) => {
                    deferred.resolve(resp);
                });

            return deferred.promise;
        }
        Recent() {

            let url = this.server + "/api/library/search";
            return this.$http.get(url);

        }
        UpdatePermissions(): Application.Context.NavigationPermissions {
            if (localStorage.getItem("account")) {
                let a = JSON.parse(localStorage.getItem("account"))

                return new Application.Context.NavigationPermissions(a.AccountType);

            } else {
                return new Application.Context.NavigationPermissions('Member');
            }
        }
    }






    app.service('libraryService', libraryService);
}

