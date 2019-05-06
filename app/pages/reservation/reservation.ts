
module Application.Components {
    export class Reservation {
        $inject = ['$location','$sessionStorage','libraryService'];
        constructor(public $location: ng.ILocationService, public $sessionStorage: any, public libraryService:any) { }
        public requests: any
        public ShipSelections: any = []
         $onInit() {
             console.log('Request Book');
             this.GetRequests();
             
        }
         AddRequest(callnumber: string) {
             this.libraryService.AddRequest(callnumber)
                 .then((resp: any) => {
                     if (!resp.data.BookId) {
                         alert(resp.data)

                     } else {
                         this.GetRequests();
                     }
                 })

         }
         GetRequests() {
             this.libraryService.getOpenRequests()
                 .then((resp: any) => {
                     this.requests = resp.data;
                 });
         }
         ShipItem(r: any) {
             let found = false;
             let temp:any = [];//=angular.copy(this.ShipSelections);

             angular.forEach(this.ShipSelections, (i: any, k: any) => {
                 if (i.ReservationSubId == r.ReservationSubId) {
                     found = true;
                 } else {
                     temp.push(i);
                 }                    
             });
             if (!found) {
                 temp.push(r);
             }
             this.ShipSelections = temp;
         }
        go(url: string) {
            this.$location.url(url);
        }
    }

    app.component("reservation", {
        controller: Reservation,
        bindings: { someVariable: '<' },
        controllerAs: "vm",
        templateUrl: function (templates: any) { return templates.reservation }, 
    })
}