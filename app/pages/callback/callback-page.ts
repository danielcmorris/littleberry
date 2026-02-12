
module Application.Components {

    class CallbackPage {
        $onInit(): void { }
        $onDestroy(): void { }
    }

    app.component("callbackPage", {
        controller: CallbackPage,
        controllerAs: "vm",
        template: `
<div class="page-container-sm">
    <callback></callback>
</div>
        `
    })
}
