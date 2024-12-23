var usuarioModel = require("../models/usuarioModel");

function autenticar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {

        usuarioModel.autenticar(email, senha)
            .then(
                function (resultadoAutenticar) {
                    console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String

                    if (resultadoAutenticar.length == 1) {
                        console.log(resultadoAutenticar);
                        res.status(200).json(resultadoAutenticar)


                    } else if (resultadoAutenticar.length == 0) {
                        res.status(403).send("Email e/ou senha inválido(s)");
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

function listarPorId(req, res) {
    var idUsuario = req.params.id;

    usuarioModel.listarPorId(idUsuario)
        .then(resposta => {
            res.status(200).json(resposta)
        })
        .catch(erro => {
            res.status(500).json(erro.sqlMessage);
        })


}

async function editar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var id = req.body.idServer;
    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
    var dtNasc = req.body.dtNascServer;
    var adm = req.body.isADMServer;

    // Convertendo escolha de ADM
    if (adm) {
        adm = 1;
    } else {
        adm = 0;
    }

    // Faça as validações dos valores
    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else if (dtNasc == undefined) {
        res.status(400).send("Sua data de nascimento está undefined");
    } else {


        await usuarioModel.editar(id, nome, email, senha, dtNasc, adm)
            .then(resposta => {
                res.status(200).send()
            })
            .catch(error => {
                console.log(error)
            })


    }

}

async function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
    var dtNasc = req.body.dtNascServer;
    var adm = req.body.isADMServer;

    // Convertendo escolha de ADM
    if (adm) {
        adm = 1;
    } else {
        adm = 0;
    }

    // Faça as validações dos valores
    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else if (dtNasc == undefined) {
        res.status(400).send("Sua data de nascimento está undefined");
    } else {

        // verificando se o e-mail já existe
        if (await usuarioModel.verificarCadastroExistente(email) == 0) {

            await usuarioModel.cadastrar(nome, email, senha, dtNasc, adm)
                .then(resposta => {
                    console.log(resposta)
                    res.status(200).send()
                })
                .catch(error => {
                    console.log(error)
                })
        } else {
            res.status(400).send("Email já existente");
        }



    }
}

function listarUsuarios(req, res) {
    usuarioModel.listarTodos()
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

function excluirUsuario(req, res) {
    var id = req.params.id;
    usuarioModel.excluirUsuario(id)
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

function listarUsuariosComMaisAcessos(req, res) {
    usuarioModel.listarUsuariosComMaisAcessos()
        .then((resposta) => {
            res.status(200).json(resposta);
        })
        .catch((erro) => {
            res.status(500).json(erro.sqlMessage)
        })
}

function listarTotalUsuarios(req, res) {
    usuarioModel.listarTotalUsuarios()
        .then((resposta) => {
            res.status(200).json(resposta);
        })
        .catch((erro) => {
            res.status(500).json(erro.sqlMessage)
        })
}

function listarTotalAcessos(req, res) {
    usuarioModel.listarTotalAcessos()
        .then((resposta) => {
            res.status(200).json(resposta);
        })
        .catch((erro) => {
            res.status(500).json(erro.sqlMessage)
        })
}

function listarUsuariosInativos(req, res) {
    var dtInicio = req.params.dtInicio;
    var dtFim = req.params.dtFim;

    usuarioModel.listarUsuariosInativos(dtInicio, dtFim)
        .then((resposta) => {
            res.status(200).json(resposta);
        })
        .catch((erro) => {
            res.status(500).json(erro.sqlMessage)
        })

}

function listarFaixasEtarias(req, res) {
    usuarioModel.listarFaixasEtarias()
        .then((resposta) => {
            res.status(200).json(resposta);
        })
        .catch((erro) => {
            res.status(500).json(erro.sqlMessage)
        })
}

function listarAcessosPorDia(req, res) {
    var dtInicio = req.params.dtInicio;
    var dtFim = req.params.dtFim;

    usuarioModel.listarAcessosPorDia(dtInicio, dtFim)
        .then((resposta) => {
            res.status(200).json(resposta);
        })
        .catch((erro) => {
            res.status(500).json(erro.sqlMessage)
        })
}

function listarUsuariosComMaisInteracoes(req, res) {
    var dtInicio = req.params.dtInicio;
    var dtFim = req.params.dtFim;


    usuarioModel.listarUsuariosComMaisInteracoes(dtInicio, dtFim)
        .then((resposta) => {
            res.status(200).json(resposta);
        })
        .catch((erro) => {
            res.status(500).json(erro.sqlMessage)
        })

}

module.exports = {
    autenticar,
    cadastrar,
    listarUsuarios,
    excluirUsuario,
    editar,
    listarUsuariosComMaisAcessos,
    listarTotalUsuarios,
    listarTotalAcessos,
    listarUsuariosInativos,
    listarFaixasEtarias,
    listarAcessosPorDia,
    listarUsuariosComMaisInteracoes,
    listarPorId
}