


module Application.Components {
    export class Author {
        $insert = ['$location', '$sessionStorage', 'libraryService'];
        constructor(public $location: ng.ILocationService, public $sessionStorage: any, public libraryService: any) { }
        public mode: any
        public links: any;
        public authors: any;
public searchResults:boolean = false;
        $onInit() {
            console.log('Author, mode=' + this.mode);
            this.links = [{ "url": "/#/library", "text": "home" }, { "url": "", "text": "authors" }]
            this.GetAuthors()
        }
        GetAuthor(author:any){
            this.go("library/authors/"+author.Author)
        }
        GetAuthors() {

            this.libraryService.getAuthorsByBookCount(1)
                .then((resp: any) => {
                    this.authors = resp;
                    this.searchResults= true;
                })
        }
        go(url: string) {
            this.$location.url(url);
        }
    }

    app.component("author", {
        controller: Author,
        bindings: { mode: '<' },
        controllerAs: "vm",
        templateUrl: function (templates: any) { return templates.author },
    })
}