
module Application.Components {
    interface IBook extends Application.Library.Types.IBook { }

    export class BookPreview {
        public mydocs: any = [];
        public api: any = {};
        public searchText: string;
        public books: Array<IBook> = [];
        public patient: any = {};
        public myChart: any;

        static $inject = ['$location', '$http'];
        constructor(
            private $location: any,
            private $http: any
        ) { }

        $onInit(): void { }

        $onDestroy(): void { }
    }

    app.component("bookPreview", {
        controller: BookPreview,
        controllerAs: "vm",
        templateUrl: "app/pages/library/preview/preview.html?v=" + new Date(),
    })
}
