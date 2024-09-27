const db = require('../firestore'); // Importa a conexão com o Firestore
const UsuarioAcessoToken = require('../common/protecaoAcesso');
const Acesso = new UsuarioAcessoToken();

const bcrypt = require('bcrypt');

const controllers = () => {

    const login = async (req) => {
        const { email, senha } = req.body;

        if (!email || !senha) {

            return { status: 400, message: 'Email e senha são obrigatórios!' };
        }

        try {

            const userRef = db.collection('users').doc(email);
            const doc = await userRef.get();

            if (!doc.exists) {
                return { status: 404, message: 'Usuário não encontrado!' };
            }

            const userData = doc.data();

            const isPasswordCorrect = await bcrypt.compare(senha, userData.senha);

            if (isPasswordCorrect) {

                var tokenAcesso = Acesso.gerarTokenAcesso(userData.email);

                return { 
                    status: 200,
                    TokenAcesso: tokenAcesso,
                    Nome: userData.nome,
                    Email: userData.email,
                    Telefone: userData.telefone
                };

            } else {

                return { status: 400, message: 'Usuário ou Senha incorretos!' };
            }

        } catch (error) {

            return { status: 500, message: 'Erro ao fazer login: ' + error.message };
        }
    };

    return Object.create({
        login
    });
}

module.exports = Object.assign({ controllers });

/*

POST - localhost:3000/login

Exemplo de objeto de requisição para executar um login:

{
    "email": "teste@gmail.com",
    "senha": "teste"
}

*/