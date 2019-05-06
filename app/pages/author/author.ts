


module Application.Components {
    export class Author {
        $inject = ['$location', '$sessionStorage', 'libraryService',
            '$filter'];
        constructor(private $location: ng.ILocationService, private $sessionStorage: any, private libraryService: any, private $filter: any) { }
        public mode: any
        public links: any;
        public authors: any;
        public pageTitle: string;
        public AuthorName: string;
        public searchText: string
        public searchResults: boolean = false;
        public filteredList: any;
        public authorList: any;
        public spinner: boolean = false;
        $onInit() {
            console.log('Author, mode=' + this.mode);
            this.links = [{ "url": "/#/library", "text": "home" }, { "url": "", "text": "authors" }]
            this.GetAuthors()
        }
        GetAuthor(author: any) {
            this.go("library/authors/" + author.Author)
        }
        ClearSearch() {
            this.searchResults = false;
            this.authorList = true;
            this.searchText = '';
            this.pageTitle = this.authors.length + ' Authors Found'

        }
        GetAuthors() {
            this.spinner = true;
            if (this.$sessionStorage.authors) {
                 this.authors=this.$sessionStorage.authors
                this.spinner = false
                this.authorList = true;
                this.pageTitle = this.authors.length + ' Authors Found'
            } else {
                this.libraryService.getAuthorsByBookCount(1)
                    .then((resp: any) => {
                        this.spinner = false

                        this.authors = resp;
                        this.$sessionStorage.authors = this.authors;
                        this.authorList = true;
                        this.pageTitle = this.authors.length + ' Authors Found'
                    })
            }
        }
        go(url: string) {
            this.$location.url(url);
        }
        SearchKey(keyEvent: any) {
            if (keyEvent.which === 13) {
                this.SearchAuthors();
            }
        }
        SearchAuthors() {

            this.searchResults = false;
            this.spinner = true;
            this.authorList = false;
            this.filteredList = this.$filter('filter')(this.authors, { "Author": this.searchText });
            this.spinner = false
            this.pageTitle = this.filteredList.length + ' Authors Found'
            this.searchResults = true;
            console.log(this.authors)
            //    let self=this;
            //     setTimeout(()=>{self.searchResults=true;},3000);

        }
    }

    app.component("author", {
        controller: Author,
        bindings: { mode: '<' },
        controllerAs: "vm",
        templateUrl: function (templates: any) { return templates.author },
    })
}