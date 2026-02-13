
module Application.Components {
    export class Crumbs {
        public links: any;
    }

    app.component("crumbs", {
        controller: Crumbs,
        bindings: { links: '<' },
        controllerAs: "vm",
        template: `
        <ul class="breadcrumb">
            <li ng-repeat="bc in vm.links">
                <a ng-if="bc.url!=''" ng-href="{{bc.url}}">{{bc.text}}</a>
                <span ng-if="bc.url==''">{{bc.text}}</span>
            </li>
        </ul>
        `
    })
}
