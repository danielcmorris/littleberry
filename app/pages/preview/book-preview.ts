 module Application.Components {
    interface IBook extends Application.Library.Types.IBook { }
    export class BookPreview {
        public mydocs: any = [];
        public api: any = {};
        public searchText: string;
        public books: Array<IBook> = [];
        public patient: any ={};
        public myChart: any;
        $insert = ['$location', '$http'];
        constructor(private $location: any, private $http: any) {



        }

        $onInit() {
            let b = <IBook>{};
            //b.barcode = "C1312";
            //b.callnumber = "Callnumber";
            //b.category = "Biography";
            //b.description = "The story of João Machado Bendito, a merchant that owned the “Loja do Ti Bailão” and its stories told by his sons…";
            //b.title = "A Loja do Ti Bailhão"
            //b.author = "João C. Bendito and Jorge M. Bendito";
            //b.thumburl = "http://pfsa.morrisdev.com/wp-content/uploads/2016/09/Loja-do-Ti-Bailao-194x300.jpg"

            //let url = ""
            //this.books.push(b);
            

           
        }
        
    }
   
    app.component("bookPreview", {
        controller: BookPreview,
        controllerAs: "vm",
        templateUrl: "app/pages/library/preview/preview.html?v=" + new Date(),
    })
}