
module Application.Components {
    export class BookPage {
        public book: any;

        $onInit(): void {
            console.log(this.book);
        }

        $onDestroy(): void { }
    }

    app.component("bookPage", {
        controller: BookPage,
        bindings: { book: '<' },
        controllerAs: "vm",
        template: `test<book></book><hr><book-tile></book-tile>`
    })
}
