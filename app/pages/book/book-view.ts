/// <reference path="../../../../type-definitions/types.d.ts" />





module Application.Library.Components {
    export class BookView {
        $insert = ['$location', '$sessionStorage', 'libraryService'];
        constructor(public $location: ng.ILocationService, public $sessionStorage: any, public libraryService: any) { }
        public book: Types.IBook;
        public history: any;
        public permission:any;
        public showBookImage:boolean=false;
        $onInit() {
          
            
            this.permission= this.libraryService.UpdatePermissions()
             
        }
        Edit() {
            let b = this.book;
       
            this.go('/library/catalog/edit/' +b.Prefix + '/' + b.BookNumber);

        }
        BookImage(b: Types.IBook) {
            let imageServer = Application.Config.LibraryConfig.imageServer;

            if (!this.book.Url) {
                let img = Application.Config.LibraryConfig.defaultBookImage;
                return imageServer + '/' + img;
            } else {
                return imageServer + '/' + this.book.Url;
            } 
            
        }
         Request() {
            let b = this.book;
            let url = 'library/requests/add/' + b.Prefix + '/' + b.BookNumber;
            this.go(url);
        }
        go(url: string) {
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