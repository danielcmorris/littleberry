
module Application.Components {
    export class SubjectsPage {
        public book: any;

        $onInit(): void { }
        $onDestroy(): void { }
    }

    app.component("subjectsPage", {
        controller: SubjectsPage,
        bindings: { book: '<' },
        controllerAs: "vm",
        template: '<subjects></subjects>'
    })
}
