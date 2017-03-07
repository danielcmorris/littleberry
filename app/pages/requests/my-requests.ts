 


module Application.Components {
    export class MyRequests {
        $insert = ['$location','$sessionStorage','libraryService'];
        constructor(public $location: ng.ILocationService, public $sessionStorage: any, public libraryService:any) { }
        public links: any

         $onInit() {
            console.log('MyRequests');
              this.links=[
                {"url":"/#/library","text":"home"}, 
                {"url":"/#/library/member","text":"my profile"}, 
                {"url":"","text":"my requests"},
                ];
        }
        
        go(url: string) {
            this.$location.url(url);
        }
    }

    app.component("myRequests", {
        controller: MyRequests,
        bindings: { someVariable: '<' },
        controllerAs: "vm",
         templateUrl: function (templates: any) { return templates.myRequests },
        
    })
}