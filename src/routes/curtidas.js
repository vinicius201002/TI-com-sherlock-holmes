var express = require("express");
var router = express.Router();

var curtidaController = require("../controllers/curtidaController");

router.post("/:idPostagem/:idUsuario", function (req, res) {
    curtidaController.cadastrarCurtida(req, res);
})

router.delete("/:idPostagem/:idUsuario", function (req, res) {
    curtidaController.deletarCurtida(req, res);
})

router.get("/:idPostagem/:idUsuario", function (req, res) {
    curtidaController.listarCurtidaNaPostagem(req, res);
})



router.get("/:idPostagem", function(req, res) {
    curtidaController.listarCurtidasNaPostagem(req, res);
});

module.exports = router;