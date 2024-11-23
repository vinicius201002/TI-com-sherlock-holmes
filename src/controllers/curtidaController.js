var curtidaModel = require("../models/curtidaModel");

function cadastrarCurtida(req, res) {
    var idPostagem = req.params.idPostagem;
    var idUsuario = req.params.idUsuario;


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

function listarCurtidaNaPostagem(req, res) {
    var idUsuario = req.params.idUsuario;
    var idPostagem = req.params.idPostagem;


    // validação do corpo
    if (idUsuario == undefined) {
        res.status(400).send("Seu id_usuario está undefined!");
    } else if (idPostagem == undefined) {
        res.status(400).send("Seu id_postagem está undefined")
    } else {
        curtidaModel.listarPorUsuario(idUsuario, idPostagem)
            .then((resultado) => {
                res.status(200).json(resultado)
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

function listarCurtidasNaPostagem(req, res) {
    var idPostagem = req.params.idPostagem;

    if (idPostagem == undefined) {
        res.status(400).send("Seu id_postagem está indefinido")
    } else {
        curtidaModel.listarPorPostagem(idPostagem)
            .then((resultado) => {
                res.status(200).json(resultado)
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

function deletarCurtida(req, res) {
    var idPostagem = req.params.idPostagem;
    var idUsuario = req.params.idUsuario;

    if (idPostagem == undefined || idUsuario == undefined) {
        res.status(400).send("Algum parametro indefinido");
    } else {
        curtidaModel.deletarCurtida(idPostagem, idUsuario)
        .then((resposta) => {
            res.status(200).json(resposta);
        })
        .catch((erro) => {
            res.status(500).send(erro.sqlMessage);
        })
    }
}

module.exports = {
    cadastrarCurtida,
    listarCurtidaNaPostagem,
    listarCurtidasNaPostagem,
    deletarCurtida
}