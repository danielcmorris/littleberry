/// <reference path="../../td/types.d.ts" />
var Application;
(function (Application) {
    var Components;
    (function (Components) {
        var index = (function () {
            function index() {
                this.primaryContact = {};
                this.address = {};
                this.dependants = {};
            }
            return index;
        }());
        Components.index = index;
        app.component("index", {
            controller: index,
            controllerAs: "vm",
            templateUrl: function (templates:any) { return templates.index; },
        });
    })(Components = Application.Components || (Application.Components = {}));
})(Application || (Application = {}));
