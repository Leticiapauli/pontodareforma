var app = {};

app.event = {


}

app.method = {

    get: (url, callbackSuccess, callbackError, login = false) => {

        try {

            if (app.method.validaToken(login)) {

                let xhr = new XMLHttpRequest();
                xhr.open('GET', url);
                xhr.setRequestHeader("Content-Type", "application/json;charset=utf-8");
                xhr.setRequestHeader("Authorization", app.method.obterValorStorage('token'));

                xhr.onreadystatechange = function () {

                    if (this.readyState == 4) {

                        if (this.status == 200) {

                            return callbackSuccess(JSON.parse(xhr.responseText));
                        } else {

                            if (xhr.status == 401) {
                                app.method.logout();
                            }

                            return callbackError(xhr.responseText);
                        }
                    }
                }

                xhr.send();
            }

        } catch (error){

            return callbackError(error);
        }

    },

    post: (url, body, callbackSuccess, callbackError, login = false) => {

        try {

            if (app.method.validaToken(login)) {

                let xhr = new XMLHttpRequest();
                xhr.open('POST', url);
                xhr.setRequestHeader("Content-Type", "application/json;charset=utf-8");
                xhr.setRequestHeader("Authorization", app.method.obterValorStorage('token'));

                xhr.onreadystatechange = function () {

                    if (this.readyState == 4) {

                        if (this.status == 200 || this.status == 201) {

                            return callbackSuccess(JSON.parse(xhr.responseText));
                        } else {

                            if (xhr.status == 401) {
                                app.method.logout();
                            }

                            return callbackError(xhr.responseText);
                        }
                    }
                }

                xhr.send(body);
            }

        } catch (error){

            return callbackError(error);
        }
    },

    // valida se o token do localstorage é valido
    validaToken: (login = false) => {

        var tokenAtual = app.method.obterValorStorage('token');

        if ((tokenAtual == undefined || tokenAtual == null 
            || tokenAtual == "" || tokenAtual == "null") && !login){
                
                window.location.href = '/painel/login.html';
                return false;
        }

        return true;
    },

    // grava um valor no localstorage
    gravarValorStorage: (valor, local) => {

        localStorage[local] = valor;
    },

    // obtem um valor do localstorage
    obterValorStorage: (local) => {

        return localStorage[local];
    },

    // limpa o localstorage e redireciona para login
    logout: () => {

        localStorage.clear();
        window.location.href = '/painel/login.html';
    },

    // metodo generico para mensagens
    mensagem: (texto, cor= 'red', tempo = 3500) => {

        let container = document.querySelector('#container-mensagens');

        if (container.childElementCount ===3) {
            return;
        };

        let id = Math.floor(Date.now() * Math.random()).toString();

        let msg = `<div id="msg-${id}" class="toast ${cor}">${texto}</div>`

        container.innerHTML += msg;

        setTimeout(() => {
            document.querySelector(`#msg-${id}`).remove();
        }, tempo)
    },

    // carrega os dados do usuário
    carregarDadosUsuario: () => {

        document.querySelector('.nome-usuario').innerHTML = app.method.obterValorStorage('nome');
        document.querySelector('.email-usuario').innerHTML = app.method.obterValorStorage('email');
    },
}