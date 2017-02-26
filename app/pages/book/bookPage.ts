
module Application.Components {
    export class BookPage {
        public book: any
        $onInit() {
            console.log(this.book)
        }
    }

    app.component("bookPage", {
        controller: BookPage,
        bindings: { book: '<' },
        controllerAs: "vm",
        template: `test<book></book><hr><book-tile></book-tile>`
    })
}