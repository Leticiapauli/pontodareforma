document.addEventListener("DOMContentLoaded", function(event) {
    home.event.init();
});

var home = {};

home.event = {

    init: () => {
        
        app.method.validaToken();
        app.method.carregarDadosUsuario();

        setTimeout(() => {
            app.method.loading(false);
        }, 1000);
    }
   
}

home.method = {


}