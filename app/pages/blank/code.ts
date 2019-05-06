 


module Application.Components {
    export class BlankTemplate {
        $inject = ['$location','$sessionStorage','libraryService'];
        constructor(public $location: ng.ILocationService, public $sessionStorage: any, public libraryService:any) { }
        public someVariable: any
         $onInit() {
            console.log('Blank Startup');
             
        }
        
        go(url: string) {
            this.$location.url(url);
        }
    }

    app.component("blankTemplate", {
        controller: BlankTemplate,
        bindings: { someVariable: '<' },
        controllerAs: "vm",
       // templateUrl: 'someURL.html'
        template: `
        <div style="width:500px;margin-left:100px;margin-right:auto;margin-top:40px;" > <h2>New Feature</h2 > </div>
        <div style="width:500px;margin-left:100px;margin-right:auto;margin-top:40px;" ><hr>
        <i>This is an advanced feature that may be included if PFSA finds it worth while.</i>

</div>
        
        `
    })
}