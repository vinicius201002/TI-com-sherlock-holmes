var visualizacaoModel = require("../models/visualizacaoModel");

function cadastrar(req, res) {
    var idUsuario = req.params.idUsuario;
    var idPostagem = req.params.idPostagem;

    // validação do corpo
    if (idUsuario == undefined || idPostagem == undefined) {
        res.status(400).send("Algum parametro indefinido.");
    } else {
        visualizacaoModel.cadastrar(idUsuario, idPostagem)
        .then(() => {
            res.status(200).send()
        })
        .catch(
            function (erro) {
                console.log(erro);
                console.log("\nHouve um erro ao realizar o cadastro da visualização! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
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
        visualizacaoModel.listarPorData(idPostagem)
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
    cadastrar,
    listarAgrupadoPorData
}