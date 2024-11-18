var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrar", function (req, res) {
    usuarioController.cadastrar(req, res);
})

router.put("/editar", function (req, res) {
    usuarioController.editar(req, res);
})

router.post("/autenticar", function (req, res) {
    usuarioController.autenticar(req, res);
});

router.get("/", function (req, res) {
    usuarioController.listarUsuarios(req, res);
});

router.delete("/excluir/:id", function (req, res) {
    usuarioController.excluirUsuario(req, res);
})

module.exports = router;