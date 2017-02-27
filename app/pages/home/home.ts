 

module Application.Components {
    export class Home {
        $insert = ['$location','$sessionStorage','libraryService'];
        constructor(public $location: ng.ILocationService, public $sessionStorage: any, public libraryService:any) { }
        public someVariable: any
         $onInit() {
            console.log('Home Page');
             
        }
         
    }

    app.component("home", {
        controller: Home,
        bindings: { someVariable: '<' },
        controllerAs: "vm",
       // templateUrl: 'someURL.html'
        template: `
        <div style="width:500px;margin-left:100px;margin-right:auto;margin-top:40px;" > <h2>PFSA Library</h2 > </div>
        <div style="width:500px;margin-left:100px;margin-right:auto;margin-top:40px;" ><hr>
       <p>Welcome to the PFSA Library!</p>

        </div>
        
        `
    })
}