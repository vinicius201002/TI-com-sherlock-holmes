var express = require("express");
var router = express.Router();

var postagemController = require("../controllers/postagemController");

router.post("/cadastrar", function (req, res) {
    postagemController.cadastrar(req, res);
})

router.get("/listar", function (req, res) {
    postagemController.listarTodasPostagens(req, res);
})

router.get('/listarPorUsuario/:fkUsuario', function (req, res) {
    postagemController.listarPostagensPorUsuario(req, res);
});

router.get('/listar/:id', function(req, res) {
    postagemController.listarPostagensPorId(req, res);
})

router.delete('/:id', function (req, res) {
    postagemController.excluir(req, res);
})

router.patch("/atualizar/:id", function (req, res) {
    postagemController.atualizar(req, res);
})
module.exports = router;