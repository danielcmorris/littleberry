
module Application.Components {
    export class Reservation {
        static $inject = ['$location', '$sessionStorage', 'libraryService'];
        constructor(
            public $location: ng.ILocationService,
            public $sessionStorage: any,
            public libraryService: any
        ) { }

        public requests: any;
        public ShipSelections: any = [];

        $onInit(): void {
            this.GetRequests();
        }

        $onDestroy(): void { }

        AddRequest(callnumber: string): void {
            this.libraryService.AddRequest(callnumber)
                .then((resp: any) => {
                    if (!resp.data.BookId) {
                        alert(resp.data);
                    } else {
                        this.GetRequests();
                    }
                });
        }

        GetRequests(): void {
            this.libraryService.getOpenRequests()
                .then((resp: any) => {
                    this.requests = resp.data;
                });
        }

        ShipItem(r: any): void {
            let found = false;
            let temp: any = [];
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

        go(url: string): void {
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
