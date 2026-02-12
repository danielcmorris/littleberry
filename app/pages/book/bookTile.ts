
module Application.Components {
    export class bookTile {
        public book: any;

        $onInit(): void {
            console.log(this.book);
        }

        $onDestroy(): void { }
    }

    app.component("bookTile", {
        controller: bookTile,
        bindings: { book: '<' },
        controllerAs: "vm",
        templateUrl: function (templates: any) { return templates.bookTile },
    })
}
