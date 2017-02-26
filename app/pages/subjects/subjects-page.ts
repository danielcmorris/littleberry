/// <reference path="../../../td/types.d.ts" />




module Application.Components {
    export class SubjectsPage {
        public book: any
        $onInit() {
            console.log(this.book)
        }
    }

    app.component("subjectsPage", {
        controller: SubjectsPage,
        bindings: { book: '<' },
        controllerAs: "vm",
        template:'<navbar></navbar><subjects></subjects>'
    })
}