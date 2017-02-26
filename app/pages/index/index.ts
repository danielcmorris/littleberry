/// <reference path="../../td/types.d.ts" />

 
 
module Application.Components {
    export class index {
        public primaryContact = {}
        public address = {}
        public dependants = {}
    }

    app.component("index", {
        controller: index,
        controllerAs: "vm",
        templateUrl:function (templates:any) { return templates.index },
    })
}