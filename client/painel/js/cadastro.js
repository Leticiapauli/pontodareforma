document.addEventListener("DOMContentLoaded", function(event) {
    cadastro.event.init();
});

var cadastro = {};

cadastro.event = {

    init: () => {

        document.querySelector("#btnCadastro").onclick = () => {

            cadastro.method.validarCadastro();
        }
    }

}

cadastro.method = {
    validarCadastro: () => {
        let nome = document.querySelector("#txtNomeCadastro").value.trim();
        let telefone = document.querySelector("#txtTelefoneCadastro").value.trim();
        let endereco = document.querySelector("#txtEnderecoCadastro").value.trim();
        let email = document.querySelector("#txtEmailCadastro").value.trim();
        let senha = document.querySelector("#txtSenhaCadastro").value.trim();

        if (email.length == 0) { 
            app.method.mensagem("Informe o E-mail, por favor.");
            document.querySelector("#txtEmailCadastro").focus();
            return;
        }

        if (senha.length == 0) { 
            app.method.mensagem("Informe a senha, por favor.");
            document.querySelector("#txtSenhaCadastro").focus();
            return;
        }

        cadastro.method.cadastro(nome, telefone, endereco, email, senha);
    },

    // método que realiza o cadastro via API
    cadastro: (nome, telefone, endereco, email, senha) => {
        var body = {
            nome: nome,
            telefone: telefone,
            endereco: endereco,
            email: email,
            senha: senha
        }

        app.method.post('/register', JSON.stringify(body),
        (response) => {
            // Verifica se o status é 201 (sucesso)
            if (response.status === 201) {
                app.method.mensagem("Cadastro Efetuado com Sucesso!", 'green');
                // Redireciona para a página de login
                window.location.href = "/painel/login.html";
            } else {
                app.method.mensagem(response.message || "Ocorreu um erro.", 'red');
            }
        },
        (error) => {
            app.method.mensagem("Erro: " + error, 'red');
        }, true);
    },
}