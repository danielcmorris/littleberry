
module Application.Components {

    class LoginPage {
        $onInit(): void { }
        $onDestroy(): void { }
    }

    app.component("loginPage", {
        controller: LoginPage,
        controllerAs: "vm",
        template: `
<div class="page-container-sm">
    <login></login>
</div>
        `
    })
}
