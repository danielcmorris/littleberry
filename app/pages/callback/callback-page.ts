
 
module Application.Components {



    class CallbackPage {
    }
  app.component("callbackPage", {
        controller: CallbackPage,
        controllerAs: "vm",
        template:`
        <style>
    
</style>
<div class="container">

    <div class="row">
        <div class="col-md-12 login-cta">
        <h2>Callback</h2>
        <callback></callback>
        
        </div>
    </div>

</div>
        `
    })
    }
