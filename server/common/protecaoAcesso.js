var jwt = require('jsonwebtoken');
var SchemaObject = require('node-schema-object');

var UsuarioAcessoToken = new SchemaObject({ tokenAcesso: String },
    {
        methods: {

            gerarTokenAcesso(dados) {

                try {

                    return jwt.sign({email: dados.email}, 'Token', { expiresIn: 86400000 });
                
                } catch (error) {

                    console.log(error);
                    throw error
                }
            },

            verificaTokenAcesso(req, res, next) {

                var headerTokenAcesso = req.headers["Authorization"];

                if (typeof headerTokenAcesso != 'undefined'){

                    try {

                        jwt.verify(headerTokenAcesso, 'Token');
                        next();

                    } catch (error) {
                        res.send(401);
                    }

                } else {
                    res.send(401);
                }
            },

            retornaCodigoTokenAcesso(valor, req) {

                var headerTokenAcesso =  req.headers["Authorization"];
                var decoded = jwt.decode(headerTokenAcesso, { complete: true})

                if (valor === "email") {
                    return decoded.payload.email;
                }
            }
        }
    }
);

module.exports = UsuarioAcessoToken;