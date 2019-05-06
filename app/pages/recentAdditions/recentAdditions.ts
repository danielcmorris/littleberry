 

module Application.Components {






    interface IBook {
        barcode: string;
        title: string;
        callnumber?: string;
        author?: string;
        category?: string;
        description?: string;
        edition?: string;
        isbn?: string;
        media?: string;
        pubdate?: string;
        publisher?: string;
        publocation?: string;
        subject: string;
        thumburl?: string;
        type?: string;
    }

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
            let ext:string = this.getExt(u);
            if (ext!='') {

                return this._thumbUrl;
            } else {

                return this._tempThumbNail
            }

        }
        set thumbUrl(val) {
            this._thumbUrl = val
        }
        type: string;
        getExt(filename:string) {
            var ext = filename.split('.').pop();
            if (ext == filename) return "";
            return ext;
        }

    }
    export class RecentAdditions {
        public mydocs: any = [];
        public api: any = {};
        public searchText: string;
        public books: Array<IBook>;
        public recent: Book[];

        $inject = ['$location', '$http', 'md5'];
        constructor(private $location: any, private $http: any, public md5: any) {
            let library: IBook[] = []

        }

        search() {
            if (this.searchText) {
                this.webSearch(this.searchText);
            }
        }
        webSearch(terms: string) {

            let url: string = 'http://pfsa.morrisdev.com/api/books/?cmd=search&terms=' + terms;
            this.$http.get(url)
                .then((resp: any) => {
                    this.books = <IBook[]>resp.data;

                    //this.cacheMe("searhResults", this.books);

                });

        }
        getRecent(count: number) {
            this.recent = [];
            let r = this.recent;

            let url: string = 'http://pfsa.morrisdev.com/api/books/?cmd=recent&count=' + count;
            this.$http.get(url)
                .then((resp: any) => {
                    this.books = <IBook[]>resp.data;
                    let b = this.books;
                    angular.forEach(b, (i, k) => {
                          console.log(i.thumburl)
                        let bk = new Book();
                        bk.title = i.title;
                        bk.barcode = i.barcode;
                        bk.author = i.author;
                        bk.thumbUrl = i.thumburl;
                        bk.category = i.category;
                        bk.description = i.description;
                        bk.type = i.type;
                        bk.subject = i.subject;
                        console.log(i);
                        r.push(bk);

                    });
                    console.log(r);
                    //this.cacheMe("searhResults", this.books);

                });

        }
        getBook(b: IBook) {

            let url = "/library/edit/" + b.barcode;
            this.go(url);
        }
        go(url: string) {

            this.$location.url(url);
        }

        $onInit() {

            this.getRecent(5);

        }
        submitForm() {

        }

        cleanForm() {
            this.searchText = '';
        }



    }


    app.component("recentAdditions", {
        controller: RecentAdditions,
        controllerAs: "vm",
        templateUrl: function (templates: any) { return templates.recentAdditions },
    })

}
