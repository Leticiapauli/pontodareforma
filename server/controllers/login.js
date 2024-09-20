const db = require('../firestore'); // Importa a conexão com o Firestore

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

            if (userData.senha === senha) {
                return { status: 200, message: 'Login realizado com sucesso!' };
            } else {
                return { status: 401, message: 'Senha incorreta!' };
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