
module Application.Components {
    export class Home {
        static $inject = ['$location', '$sessionStorage', 'libraryService'];
        constructor(
            public $location: ng.ILocationService,
            public $sessionStorage: any,
            public libraryService: any
        ) { }

        public books: any;

        $onInit(): void {
            console.log('Home Page');
            this.loadRecentAdditions();
        }

        $onDestroy(): void { }

        private loadRecentAdditions(): void {
            this.libraryService.Recent()
                .then((resp: any) => {
                    this.books = resp.data;
                    this.$sessionStorage.searchResults = this.books;
                });
        }

        GetBook(book: any): void {
            let url = "/library/catalog/view/" + book.Prefix + "/" + book.BookNumber;
            this.$location.url(url);
        }
    }

    app.component("home", {
        controller: Home,
        bindings: { someVariable: '<' },
        controllerAs: "vm",
        templateUrl: function (templates: any) { return templates.home }
    })
}
