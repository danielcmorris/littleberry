
module Application.Components {
    export class BlankTemplate {
        static $inject = ['$location', '$sessionStorage', 'libraryService'];
        constructor(
            public $location: ng.ILocationService,
            public $sessionStorage: any,
            public libraryService: any
        ) { }

        public someVariable: any;

        $onInit(): void { }

        $onDestroy(): void { }

        go(url: string): void {
            this.$location.url(url);
        }
    }

    app.component("blankTemplate", {
        controller: BlankTemplate,
        bindings: { someVariable: '<' },
        controllerAs: "vm",
        template: `
        <div class="page-container-sm mt-lg">
            <h2>New Feature</h2>
            <hr>
            <i>This is an advanced feature that may be included if PFSA finds it worth while.</i>
        </div>
        `
    })
}
