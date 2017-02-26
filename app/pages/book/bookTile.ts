/// <reference path="../../../td/types.d.ts" />




module Application.Components {
    export class bookTile {
        public book: any
        $onInit() {
            console.log(this.book)
        }
    }

    app.component("bookTile", {
        controller: bookTile,
        bindings: {book:'<'},
        controllerAs: "vm",
        templateUrl: function (templates: any) { return templates.bookTile },
    })
}