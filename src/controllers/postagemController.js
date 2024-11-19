var postagemModel = require("../models/postagemModel");

function cadastrar(req, res) {
    var titulo = req.body.tituloServer;
    var corpo = req.body.corpoServer;
    var linkImagem = req.body.linkImagemServer;
    var idUsuario = req.body.idUsuarioServer;

    // validação do corpo
    if (idUsuario == undefined || corpo == undefined || linkImagem == undefined || titulo == undefined) {
        res.status(400).send("Algum campo do body está undefined!");
    } else {
        postagemModel.cadastrar(titulo, corpo, linkImagem, idUsuario)
            .then((resposta) => {
                res.status(200).json(resposta)
            })
            .catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o cadastro da postagem! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            )
    }
}

function listarTodasPostagens(req, res) {
    postagemModel.listarTodasPostagens()
        .then(resposta => {
            res.status(200).json(resposta);
        })
        .catch(erro => {
            res.status(500).json(erro.sqlMessage);
        })
}

function listarPostagensPorUsuario(req, res) {
    var fkUsuario = req.params.fkUsuario;
    postagemModel.listarPostagensPorUsuario(fkUsuario)
        .then(resposta => {
            if (resposta.length == 0) {
                res.status(204).json(resposta);
            } else {
                res.status(200).json(resposta);
            }
        })
        .catch(erro => {
            res.status(500).json(erro.sqlMessage);
        })

}

function excluir(req, res) {
    var id = req.params.id;
    postagemModel.excluir(id)
        .then(resposta => {
            if (resposta.length == 0) {
                res.status(204).json(resposta);
            } else {
                res.status(200).json(resposta);
            }
        })
        .catch(erro => {
            res.status(500).json(erro.sqlMessage);
        })

}

function atualizar(req, res) {
    var id = req.params.id;
    var titulo = req.body.tituloServer;
    var corpo = req.body.corpoServer;
    var linkImagem = req.body.linkImagemServer;

    postagemModel.atualizar(id, titulo, corpo, linkImagem)
        .then(resposta => {
            res.status(200).json(resposta);
        })
        .catch(erro => {
            res.status(500).json(erro.sqlMessage);
        })
}

function listarPostagensPorId(req, res) {
    var id = req.params.id;


    if (id == undefined) {
        res.status(400).send("ID indefinido")
    } else {
        postagemModel.listarPostagensPorIdPostagem(id)
            .then(resposta => {
                console.log(resposta)
                   res.status(200).json(resposta)
            })
            .catch(erro => {
                res.status(500).json(erro.sqlMessage);
            })
    }
}

function renderizarPostagens(req, res) {
    var id = req.params.id;


    if (id == undefined) {
        res.status(400).send("ID indefinido")
    } else {
        postagemModel.listarPostagensPorIdPostagem(id)
            .then(resposta => {
                console.log(resposta)
                if (resposta.length == 0) {
                    console.log("nenhum artigo encontrado")
                    res.status(404).render('404');
                } else {
                    res.render('artigo', resposta[0]);
                }
                   
            })
            .catch(erro => {
                res.status(500).json(erro.sqlMessage);
            })
    }
}


module.exports = {
    cadastrar,
    listarTodasPostagens,
    listarPostagensPorUsuario,
    excluir,
    atualizar,
    listarPostagensPorId,
    renderizarPostagens
}