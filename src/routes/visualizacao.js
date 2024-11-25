var express = require("express");
var router = express.Router();

var visualizacaoController = require("../controllers/visualizacaoController");

router.post("/:idPostagem/:idUsuario", function (req, res) {
    visualizacaoController.cadastrar(req, res);
})

module.exports = router;