﻿

module Application.Components {




    interface IBook extends Application.Library.Types.IBook { }


    class Book {
        private _tempThumbNail: string = 'http://pfsa.morrisdev.com/tools/app/pages/library/book/placeholder.jpg';
        private _thumbUrl: string
        barcode: string;
        title: string;
        callNumber: string;
        category: string;
        description: string;
        edition: string;
        isbn: string;
        media: string;
        pubdate: string;
        author: string;
        publisher: string;
        publocation: string;
        subject: string;

        constructor() {
            this._thumbUrl = this._tempThumbNail;

        }
        get thumbUrl(): string {
            let u = this._thumbUrl;
            let ext: string = this.getExt(u);
            if (ext != '') {

                return this._thumbUrl;
            } else {

                return this._tempThumbNail
            }

        }
        set thumbUrl(val) {
            this._thumbUrl = val
        }
        type: string;
        getExt(filename: string) {
            var ext = filename.split('.').pop();
            if (ext == filename) return "";
            return ext;
        }

    }
    export class library {
        public mydocs: any = [];
        public api: any = {};
        public searchText: string;
        public books: Array<IBook>;
        public recent: Book[];
        public version: Application.Config.version;
        public searchResults: boolean = false;
        public callnumber: string = '';
        public sessionStorage: any;
        public links: any;
        public prefix:string='';

        $insert = ['$location', '$http', '$cookies', '$sessionStorage', '$routeParams'];
        constructor(private $location: ng.ILocationService, private $http: any,
            public libraryService: any, public $cookies: any, private $sessionStorage: any, private $routeParams: any) {

            this.links = [{ "url": "/#/library", "text": "home" }, { "url": "", "text": "catalog" }]
            let library: IBook[] = []
            this.sessionStorage = $sessionStorage;

            this.version = new Application.Config.version();
            this.SubjectList();

        }

        OpenByCallNumberKey(keyEvent: any) {
            if (keyEvent.which === 13) {
                this.OpenByCallNumber();
            }
        }
        OpenByCallNumber() {
            let cn = this.callnumber;
            let booknumber = cn.replace(/\D/g, '');
            let prefix = cn.replace(/[0-9]/g, '');
            let url = "/library/edit/" + prefix + "/" + booknumber;
            this.go(url);

        }
        SubjectList() {
            let s = this.version.apiServer;
            //let url = s + "library/subjects"
            //this.$http.get(url)
            //    .then((resp: any) => {
            //        console.log(resp.data);
            //    });
        }
        SearchKey(keyEvent: any) {
            if (keyEvent.which === 13) {
                this.Search();
            }
        }
        Search(searchText?: string) {
            // if (this.searchText) 
            this.webSearch(this.searchText, this.prefix);
            this.setCookie("titleSearch", this.searchText);



        }
        ClearSearch() {
            this.searchText = '';
        }
        NewBook() {
            this.$location.url('library/add');
        }
        SubjectSearch(prefix: string) {
            this.sessionStorage.prefix = prefix

            this.libraryService.Search(prefix, '', '')
                .then((resp: any) => {
                    this.books = resp.data;
                    this.sessionStorage.searchResults = this.books;
                    this.searchResults = true;
                });
        }
        webSearch(terms: string,prefix:string) {
            if (terms != 'recent additions') {
                this.sessionStorage.searchText = terms
                this.libraryService.Search(prefix, '', terms)
                    .then((resp: any) => {
                        this.books = resp.data;
                        this.sessionStorage.searchResults = this.books;
                        this.searchResults = true;
                    });

            } else {
                this.libraryService.Recent()
                    .then((resp: any) => {
                        this.books = resp.data;
                        this.sessionStorage.searchResults = this.books;

                        this.searchResults = true;
                    });

            }

        }

        getBook(b: IBook) {
            let url = "/library/catalog/view/" + b.Prefix + "/" + b.BookNumber;
            this.go(url);
        }

        go(url: string) {

            this.$location.url(url);
        }

        $onInit() {
            var lastSearch: any
            this.searchText = this.sessionStorage.searchText
            this.prefix = this.$routeParams.prefix;

            if (this.sessionStorage) {
                lastSearch = this.sessionStorage.searchResults
            }
            if (!lastSearch && !this.prefix) {
                if (this.prefix) {
                    this.SubjectSearch(this.prefix)
                } else {
                    this.webSearch('recent additions','');
                }
            } else {
                if (this.prefix) {
                    this.SubjectSearch(this.prefix)

                    this.searchResults = true;
                } else {
                    this.webSearch('recent additions','');
                    this.books = lastSearch;
                    this.searchResults = true;
                }

            }


        }
        submitForm() {

        }

        cleanForm() {
            this.searchText = '';
        }

        setCookie(cookieName: any, obj: any) {
            let expireDate = new Date()
            expireDate.setDate(expireDate.getDate() + 100);
            this.$cookies.putObject(cookieName, obj, { expires: expireDate });
        }
        getCookie(cookieName: any): any {
            let obj: any = this.$cookies.getObject(cookieName)
            if (!obj) {
                obj = {};
            }
            return obj;
        }



    }


    app.component("library", {
        controller: library,
        controllerAs: "vm",
        templateUrl: function (templates: any) { return templates.library },
    })

}
