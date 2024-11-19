var express = require("express");
var router = express.Router();
var postagemController = require("../controllers/postagemController");

router.post("/cadastrar", function (req, res) {
    postagemController.cadastrar(req, res);
});

router.get("/listar", function (req, res) {
    postagemController.listarTodasPostagens(req, res);
});

router.get("/listarPorUsuario/:fkUsuario", function (req, res) {
    postagemController.listarPostagensPorUsuario(req, res);
});

router.get("/listar/:id", function (req, res) {
    postagemController.listarPostagensPorId(req, res);
});

// Nova rota para renderizar o artigo usando EJS
router.get("/artigo/:id", function (req, res) {
    postagemController.renderizarPostagens(req, res, function (err, artigo) {
        if (err) {
            return res.status(500).send('Erro ao buscar o artigo');
        }
        if (!artigo) {
            return res.status(404).send('Artigo não encontrado');
        }
        res.render('artigo', { artigo });
    });
});

router.delete("/:id", function (req, res) {
    postagemController.excluir(req, res);
});

router.patch("/atualizar/:id", function (req, res) {
    postagemController.atualizar(req, res);
});

module.exports = router;
