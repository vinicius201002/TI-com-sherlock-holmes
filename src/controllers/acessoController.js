var acessoModel = require("../models/acessoModel");

function cadastrar(req, res) {
    var idUsuario = req.body.idUsuarioServer;

    // validação do corpo
    if (idUsuario == undefined) {
        res.status(400).send("Seu id_usuario está undefined!");
    } else {
        acessoModel.cadastrar(idUsuario)
        .then(() => {
            res.status(200).send()
        })
        .catch(
            function (erro) {
                console.log(erro);
                console.log("\nHouve um erro ao realizar o cadastro do acesso! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        )
    }
}

module.exports = {
    cadastrar
}