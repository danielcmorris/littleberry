 

module Application.Components {
    export class Subjects {
        public subjects: any = [];
        public tmpSubject: any;
        public mysubject: any;
        public sortColumn: string = 'Name';
        public hidelist: boolean=false;
        $insert = ['$location', 'libraryService', '$sessionStorage'];
        constructor(private $location: ng.ILocationService,
            private $http: ng.IHttpService,
            private libraryService: any, public $sessionStorage: any) { }

        CancelEdit() {
            //angular.copy(this.tmpSubject, this.mysubject);
            if (this.mysubject.SubjectId > 0) {
                this.mysubject = JSON.parse(JSON.stringify(this.tmpSubject));
                console.log(this.mysubject)
                angular.forEach(this.subjects, (i: any, k: any) => {
                    if (i.SubjectId == this.mysubject.SubjectId) {
                        angular.copy(this.mysubject, i);
                    }
                });
            }
            this.hidelist = false;
        }
        NewSubject() {
            console.log("New Subject")
            this.hidelist = true;
        }
        Save(o:number) {
            //angular.copy(this.tmpSubject, this.mysubject);
            this.tmpSubject = {};

            if (o == 1) {
                this.libraryService.saveSubject(this.mysubject)
                    .then((resp: any) => {
                        this.hidelist = false;
                    });
               

            }
            if (o == 2) {
                this.mysubject.SubjectId = null;
                this.libraryService.saveSubject(this.mysubject)
                    .then((resp: any) => {
                        this.subjects.unshift(resp.data);
                        this.hidelist = false;
                    });

               

            }
        }
        Edit(subject: any) {
            console.log(subject)
            this.hidelist = true;
            if (subject) {
                //copy subject
                this.tmpSubject = JSON.parse(JSON.stringify(subject));

                console.log(this.tmpSubject);
                this.mysubject = subject;
            } else {
                this.mysubject = { "SubjectId": 0, "Name": "", "Prefix": "", "LastId": 0, "Status": "Active" };
            }
       
        }
        $onInit() {
            this.libraryService.getSubjects()
                .then((data: any) => {
                    this.subjects = data
                });
 
                 
 
    }
    }

    app.component("subjects", {
        controller: Subjects,
        controllerAs: "vm",
        templateUrl: function (templates: any) { return templates.subjects },
    })
}