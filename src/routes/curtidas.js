var express = require("express");
var router = express.Router();

var curtidaController = require("../controllers/curtidaController");

router.post("/cadastrar", function (req, res) {
    curtidaController.cadastrar(req, res);
})

router.get("/:id", function (req, res) {
    curtidaController.listar(req, res);
})

module.exports = router;