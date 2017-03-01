

module Application.Components {
    export class Home {
        $insert = ['$location', '$sessionStorage', 'libraryService'];
        public books: any;
        constructor(public $location: ng.ILocationService, public $sessionStorage: any, public libraryService: any) { }
        public someVariable: any
        $onInit() {
            console.log('Home Page');
            this.webSearch('recent additions');
        }
        webSearch(terms: string) {
            this.libraryService.Recent()
                .then((resp: any) => {
                    this.books = resp.data;

                });



        }
        GetBook(book:any){
          
            let url="/library/catalog/view/"+book.Prefix+"/"+book.BookNumber;
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