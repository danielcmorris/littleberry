/// <reference path="../../../../type-definitions/types.d.ts" />



app.directive('fileModel', ['$parse', function ($parse: any) {
    return {
        restrict: 'A',
        link: function (scope: any, element: any, attrs: any) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;



            element.bind('change', function () {
                scope.$apply(function () {
                    var f = element[0].files[0]
                    modelSetter(scope, f);
                    //var reader = new FileReader();
                    //reader.onload = (function (theFile:any) {
                    //    return function (e: any) {        
                    //        if (scope.output) {
                    //            document.getElementById(scope.output).innerHTML = ['<img src="', e.target.result, '" title="', theFile.name, '" width="200" />'].join('');
                    //        }
                    //    };
                    //})(f);

                    //reader.readAsDataURL(f);



                });
            });
        }
    };
}]);

module Application.Library.Components {

    interface IRouteParams extends ng.route.IRouteParamsService {
        mode: string;
        prefix: string;
       
    }

    interface IBook extends Application.Library.Types.IBook {
        Number: any;
        bookImage:string;
        Notes:string;
    }


    export class book {
        public mode: string = "insert";
        public code: string;
        public subjects: any = [];
        private api: string;
        public loading: boolean = false;
        public callnumber: string = '';
        public prefix: string;
        public booknumber: string;
        public image: any = {};
        public barcodeNumber: string;
        public file: any;
        public editing: boolean = true;
        public imageServer: string;
        public bookImage: string = '';
        public book: IBook = <IBook>{};
        public SelectedSubject: any;
        public history: any;
        public imageChanged: boolean = false;
        public permissions: Application.Context.NavigationPermissions;
        public redirect: string;
        public links: any;
        static $inject = ['$location', '$http', '$routeParams',
            'libraryService', '$sessionStorage', 'ToolService'];


        constructor(
            private $location: ng.ILocationService,
            private $http: ng.IHttpService,
            private $routeParams: IRouteParams,
            private libraryService: any,
            public $sessionStorage: any,
            public tools: Application.Services.ToolService) {
            this.permissions = libraryService.UpdatePermissions();
            this.redirect = $location.path();
            this.image.uploading = false;
            this.book.Url = "";
            this.imageServer = Application.Config.LibraryConfig.imageServer;




        }
        uploadImage() {
            this.image.uploading = true;
            var fd = new FormData();
            var name = this.file.name
            var cn = this.book.CallNumber;
            var path = cn + "/" + name;
            this.bookImage = Application.Config.LibraryConfig.imageServer + '/assets/wait.gif';
            fd.append('file', this.file);

            fd.append('callnumber', this.book.CallNumber);
            this.libraryService.uploadImage(fd)
                .then((resp: any) => {
                    console.log(resp);
                    this.bookImage = Application.Config.LibraryConfig.imageServer + '/' + resp.data;
                    this.image.uploading = false;
                });

            //.error(function () {
            //    console.log("ERROR!!!");
            //});

        }
        LoadSubjects() {

            this.libraryService.getSubjects()
                .then((data: any) => {
                    this.subjects = data
                    this.updateSubject();
                });


        }
        updateSubject() {

            angular.forEach(this.subjects, (v, key) => {

                if (v.SubjectId == this.book.SubjectId) {

                    this.SelectedSubject = v;
                    console.log(this.SelectedSubject);
                    this.book.Subject = v.Name;
                    console.log(v.Name);
                    console.log(this.book.Subject);
                }
            });

        }
        ApplySubject() {
            let subj: string = this.book.SubjectId.toString();

            angular.forEach(this.subjects, (v, key) => {

                if (v.SubjectId == subj) {

                    this.book.Prefix = v.Prefix;
                    this.book.BookNumber = v.LastId + 1;
                    this.book.CallNumber = this.book.Prefix + this.book.BookNumber;
                    this.book.SubjectId = v.SubjectId
                }
            });
            this.clearBookImage();
        }
        getBook(prefix: string, booknumber: string) {
            this.loading = true;

            this.libraryService.getBook(prefix, booknumber)
                .then((resp: any) => {
                    console.log("got data", resp.data)

                    this.book = <IBook>resp.data;


                    this.book.CallNumber = this.book.Prefix + this.book.BookNumber;

                    console.log(resp.data, this.book)

                    if (!this.book.Url) {
                        let img = Application.Config.LibraryConfig.defaultBookImage;
                        this.bookImage = this.imageServer + '/' + img;
                    } else {
                        this.bookImage = this.imageServer + '/' + this.book.Url;
                    }
                    this.updateSubject()
                    this.libraryService.getBookHistory(prefix, booknumber)
                        .then((resp: any) => {
                            this.history = resp.data;
                        });

                    this.loading = false;
                });



        }
        clearBookImage() {
            this.bookImage = '';
            this.book.Url = '';
        }
        UpdateStatus() {

        }
        checkFile() {


        }
        delete(book: any) {
            let c = confirm("Are you sure?");
            if (c) {

                book.Status = 'Deleted';
                this.saveBook(1);

            }
        }
        saveBook(option: number) {
            this.loading = true;

            /* if the file selector has changed, then upload the image */
            if (this.file) {
                this.uploadImage();
            }
            // if we've changed data, it's probably in the search results from the previous page, so we need top update it
            // this.book.SubjectId = this.SelectedSubject;
            //      this.book.Subject = this.SelectedSubject.Subject;

            /* 
            
            if this is a prexisting book, then go through the cache and make sure to update the
            cached value with the new values so when the user returns to the search page they see the updated 
            results 

            */

            if (this.book.BookId) {
                if (this.$sessionStorage.searchResults) {
                    let searchResults = this.$sessionStorage.searchResults
                    this.$sessionStorage.searchResults = {};


                    angular.forEach(searchResults, (v: any, k: any) => {
                        console.log(v.BookId);
                        if (v.BookId.toString() == this.book.BookId.toString()) {

                            angular.copy(this.book, v);

                        }
                    });

                    this.$sessionStorage.searchResults = searchResults;

                }
            }

            this.libraryService.saveBook(this.book)
                .then((resp: any) => {
                    let b = this.book;
                       
                    if (this.book.Status === 'Deleted') {
                        this.$location.url('/library/recent')
                        this.loading = false;
                        return;
                    }
                    if (option == 1) {
                        this.$location.url('/library/recent');
                        this.loading = false;
                        return;
                    }
                    if (option == 2) {
                        this.book.Title='';
                        this.book.CallNumber='';
                        this.book.Number='';
                        this.book.Author='';                       
                        this.book.Subject='';
                        this.book.Notes='';
                        this.image.uploading=false;
                        this.bookImage = '';
                        this.book.Url = '';
                        this.file=null;
                        this.init(); 
                        this.$location.url('/library/catalog/add');
                        this.loading = false;
                        return;
                    }
                    this.loading = false;
                });




        }


        go(url: string) {

            this.$location.url('/library/' + url);
        }

        $onInit() {

           
            this.init();
           
        }


        init(){
            this.LoadSubjects();
            let viewmode = this.$routeParams.mode
            this.prefix = this.$routeParams.prefix

            if (!viewmode) {
                viewmode = 'add';
            }
            this.booknumber = this.$routeParams.booknumber
            this.callnumber = this.prefix + this.booknumber;
            console.log(this.mode + ':' + this.callnumber);
            this.links = [
                { "url": "/#/library", "text": "home" },
                { "url": "/#/library/catalog", "text": "catalog" }];

            if (this.callnumber && viewmode != 'add') {
                this.editing = false;
                this.mode = "update";

                this.getBook(this.prefix, this.booknumber);

            } else {
                this.mode = 'insert';
                this.editing = true;
                this.book.Subject = 'Azores';
                this.book.Status = 'Active'
                this.callnumber = "";

            }
            if (viewmode == 'edit') {
                this.editing = true;
                this.mode = "update";
            }

            console.log("viewmode", viewmode);
            this.links.push({ "url": "", "text": this.callnumber })

        }




    }

    app.component("book", {
        controller: book,
        controllerAs: "vm",
        templateUrl: function (templates: any) { return templates.book },
    })

}
