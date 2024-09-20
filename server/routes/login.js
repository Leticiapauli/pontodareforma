const ct = require('../controllers/login');

module.exports = (server) => {

    // Rota para login
    server.post('/login', async (req, res) => {
        const result = await ct.controllers().login(req);
        res.send(result.status, result);
    });

}
