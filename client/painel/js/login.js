document.addEventListener("DOMContentLoaded", function(event) {
    login.event.init();
});

var login = {};

login.event = {

    init: () => {

        document.querySelector("#btnLogin").onclick = () => {

            login.method.validarLogin();
        }
    }

}

login.method = {

    validarLogin: () => {

        let email = document.querySelector("#txtEmailLogin").value.trim();
        let senha = document.querySelector("#txtSenhaLogin").value.trim();

        if (email.length == 0) { 
            app.method.mensagem("Informe o E-mail, por favor.");
            document.querySelector("#txtEmailLogin").focus();
            return;
        }

        if (senha.length == 0) { 
            app.method.mensagem("Informe a senha, por favor.");
            document.querySelector("#txtSenhaLogin").focus();
            return;
        }

        login.method.login(email, senha);
    },

    // método que realiza o login via api
    login: (email, senha) => {

        var body = {
            email: email,
            senha: senha
        }

        app.method.post('/login', JSON.stringify(body),
        (response) => {

            app.method.mensagem("Login Efetuado!", 'green');

            app.method.gravarValorStorage(response.TokenAcesso, "token");
            app.method.gravarValorStorage(response.Nome, "nome");
            app.method.gravarValorStorage(response.Email, "email");
            app.method.gravarValorStorage(response.Telefone, "telefone");

            window.location.href = "/painel/home.html";
            
            console.log(response);
        },
        (error) => {
            app.method.mensagem(error);
        }, true)
    },
}