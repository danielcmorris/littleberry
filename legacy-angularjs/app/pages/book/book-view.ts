
module Application.Library.Components {
    export class BookView {
        static $inject = ['$location', '$sessionStorage', 'libraryService'];
        constructor(
            public $location: ng.ILocationService,
            public $sessionStorage: any,
            public libraryService: any
        ) { }

        public book: Types.IBook;
        public history: any;
        public permission: any;
        public showBookImage: boolean = false;

        $onInit(): void {
            this.permission = this.libraryService.UpdatePermissions();
        }

        $onDestroy(): void { }

        Edit(): void {
            let b = this.book;
            this.go('/library/catalog/edit/' + b.Prefix + '/' + b.BookNumber);
        }

        BookImage(b: Types.IBook): string {
            let imageServer = Application.Config.LibraryConfig.imageServer;
            if (!this.book.Url) {
                let img = Application.Config.LibraryConfig.defaultBookImage;
                return imageServer + '/' + img;
            } else {
                return imageServer + '/' + this.book.Url;
            }
        }

        Request(): void {
            let b = this.book;
            let url = 'library/requests/add/' + b.Prefix + '/' + b.BookNumber;
            this.go(url);
        }

        go(url: string): void {
            this.$location.url(url);
        }
    }

    app.component("bookView", {
        controller: BookView,
        bindings: { book: '<', history: '<' },
        controllerAs: "vm",
        templateUrl: '/app/pages/book/book-view.html'
    })
}
