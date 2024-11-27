var express = require("express");
var router = express.Router();

var curtidaController = require("../controllers/curtidaController");
var visualizacaoController = require("../controllers/visualizacaoController");
var comentarioController = require("../controllers/comentarioController")


router.get("/curtida/porData/:idPostagem", (req, res) => {
    curtidaController.listarAgrupadoPorData(req, res)
})

router.get("/visualizacao/porData/:idPostagem", (req, res) => {
    visualizacaoController.listarAgrupadoPorData(req, res)
})

router.get("/comentario/porData/:idPostagem", (req, res) => {
    comentarioController.listarAgrupadoPorData(req, res)
})

module.exports = router;