var comentarioModel = require("../models/comentarioModel");

function cadastrarComentario(req, res) {
    var idPostagem = req.params.idPostagem;
    var idUsuario = req.params.idUsuario;
    var corpo = req.body.corpoServer;

    // validação do corpo
    if (idUsuario == undefined) {
        res.status(400).send("Seu id_usuario está undefined!");
    } else if (idPostagem == undefined) {
        res.status(400).send("Seu id_posta")
    } else {
        comentarioModel.cadastrar(idUsuario, idPostagem, corpo)
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

function listarComentariosPorPostagem(req, res) {
    var idPostagem = req.params.idPostagem;

    // validação do corpo
     if (idPostagem == undefined) {
        res.status(400).send("Seu id_postagem está undefined")
    } else {
        comentarioModel.listarPorPostagem(idPostagem)
            .then((resultado) => {
                res.status(200).json(resultado)
            })
            .catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o cadastro do acesso! Erro: ", erro.sqlMessage);
                    res.status(500).send(erro.sqlMessage);
                }
            )
    }


}

function listarAgrupadoPorData(req, res) {
    var idPostagem = req.params.idPostagem;

    // validação do corpo
    if (idPostagem == undefined) {
        res.status(400).send("Seu id_postagem está undefined")
    } else {
        comentarioModel.listarPorData(idPostagem)
            .then((resultado) => {
                if (resultado.length > 0) {

                    res.status(200).json(resultado)
                } else {
                    res.status(204).send()
                }
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
    listarComentariosPorPostagem,
    cadastrarComentario,
    listarAgrupadoPorData
}