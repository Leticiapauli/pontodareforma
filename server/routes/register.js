const ct = require('../controllers/register');

module.exports = (server) => {

    // Rota para cadastro
    server.post('/register', async (req, res) => {
        const result = await ct.controllers().register(req);
        res.send(result.status, result);
    });
}
