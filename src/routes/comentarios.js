var express = require("express");
var router = express.Router();

var comentarioController = require("../controllers/comentarioController");

router.post("/:idPostagem/:idUsuario", function (req, res) {
    comentarioController.cadastrarComentario(req, res);
})

router.get("/:idPostagem", function(req, res) {
    comentarioController.listarComentariosPorPostagem(req, res);
});

module.exports = router;