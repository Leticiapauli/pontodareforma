const db = require('../firestore'); // Importa a conexão com o Firestore

const controllers = () => {

    const register = async (req) => {
        const { nome, telefone, endereco, email, senha } = req.body;

        if (!nome || !telefone || !endereco || !email || !senha) {
            return { status: 400, message: 'Todos os campos são obrigatórios!' };
        }

        try {
            const userRef = db.collection('users').doc(email);
            const doc = await userRef.get();

            if (doc.exists) {
                return { status: 400, message: 'Usuário já cadastrado!' };
            }

            await userRef.set({
                nome,
                telefone,
                endereco,
                email,
                senha
            });

            return { status: 201, message: 'Usuário cadastrado com sucesso!' };
        } catch (error) {
            return { status: 500, message: 'Erro ao cadastrar o usuário: ' + error.message };
        }
    };

    return Object.create({
        register
    });
}

module.exports = Object.assign({ controllers });


/*
Exemplo de objeto de requisição para executar um registro:

POST - localhost:3000/register

{
    "nome": "teste",
    "telefone": "99999999",
    "endereco": "Rua do café",
    "email": "teste@gmail.com",
    "senha": "teste"
}

*/