var curtidaModel = require("../models/curtidaModel");

function cadastrar(req, res) {
    var idUsuario = req.body.idUsuarioServer;
    var idPostagem = req.body.idPostagemServer;


    // validação do corpo
    if (idUsuario == undefined) {
        res.status(400).send("Seu id_usuario está undefined!");
    } else if (idPostagem == undefined) {
        res.status(400).send("Seu id_posta")
    } else {
        curtidaModel.cadastrar(idUsuario, idPostagem)
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

function listarCurtidaNaPostagem(idUsuario, idPostagem) {
    


}

module.exports = {
    cadastrar,
    listarCurtidaNaPostagem
}