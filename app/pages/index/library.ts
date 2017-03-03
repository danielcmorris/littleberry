

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
        public mode: string;
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
        public prefix: string = '';
        public pageTitle: string = 'Catalog';

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
            this.webSearch(this.searchText, this.prefix, '');
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
        webSearch(terms: string, prefix: string, author: string) {
            this.searchResults = false;
            if (terms != 'recent additions') {
                if (!prefix)
                    prefix = '';
                if (this.$routeParams.author)
                    author = this.$routeParams.author;
                this.sessionStorage.searchText = terms
                this.libraryService.Search(prefix, author, terms)
                    .then((resp: any) => {
                        this.books = resp.data;
                        this.sessionStorage.searchResults = this.books;
                        this.searchResults = true;
                        let count = this.books.length;
                        let countText = count.toString();
                        if (count === 1000) { 'More than ' + countText }
                        if (count > 0) {
                            if (this.mode === 'author') {
                                this.pageTitle = countText + " Titles by " + this.$routeParams.author;
                            }
                            if (this.mode === 'subject') {
                                this.pageTitle = countText + " Titles in " + this.books[0].Subject;
                            }
                            if (this.mode === 'full') {
                                this.pageTitle = countText + " Titles found";
                            }
                            this.searchResults = true;
                        } else {
                            this.pageTitle = 'No Titles Found for search text ("' + terms + '")';
                        }

                    });

            } else {
                if (this.mode === 'recent') {
                    this.pageTitle = 'Recent Additions'
                    this.libraryService.Recent()
                        .then((resp: any) => {
                            this.books = resp.data;
                            this.sessionStorage.searchResults = this.books;

                            this.searchResults = true;
                        });
                }
            }

        }

        getBook(b: IBook) {
            let url = "/library/catalog/view/" + b.Prefix + "/" + b.BookNumber;
            this.go(url);
        }

        go(url: string) {

            this.$location.url(url);
        }
        Recent() {
            //this.pageTitle = "Recent Additions"
            //this.webSearch('recent additions', '', '');
            this.$location.url('library/recent');


        }
        $onInit() {
            var lastSearch: any
            if (this.mode === 'recent') {
                this.sessionStorage.searchText = '';

            }
            this.searchText = this.sessionStorage.searchText
            let searchMode = ""
            console.log(this.mode)
            this.prefix = this.$routeParams.prefix;

            if (this.sessionStorage) {

                this.searchText = this.sessionStorage.searchText
                searchMode = this.sessionStorage.searchMode;
                if (searchMode = this.mode) {
                    lastSearch = this.sessionStorage.searchResults
                }
            }

            if (this.mode === 'recent') {
                this.links = [{ "url": "/#/library", "text": "home" }, { "url": "/#/library/catalog", "text": "catalog" }, { "url": "", "text": 'recent additions' }]
                this.webSearch('recent additions', '', '');
            } else {

                if (this.mode === 'subject') {
                    this.webSearch('', this.$routeParams.prefix, '');
                    this.links = [{ "url": "/#/library", "text": "home" }, { "url": "/#/library/catalog", "text": "catalog" }, { "url": "", "text": this.$routeParams.prefix }]
                    this.searchResults = true;
                }
                if (this.mode == 'author') {
                    this.webSearch('', '', this.$routeParams.author);
                    this.links = [{ "url": "/#/library", "text": "home" }, { "url": "/#/library/author", "text": "authors" },
                    { "url": "", "text": this.$routeParams.author }]
                    this.books = lastSearch;
                    this.searchResults = true;
                }
                if (this.mode == 'full' && !( this.searchText=== 'recent additions' || this.searchText==='')) {

                    this.books = lastSearch;
                    this.searchResults = true;
                }
                if (this.mode == 'full' && this.searchText === 'recent additions') {

                    //this.books = lastSearch;
                    this.searchResults = true;
                }
                this.searchResults = true;
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
        bindings: { mode: '=' },
        templateUrl: function (templates: any) { return templates.library },
    })

}
