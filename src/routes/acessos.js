var express = require("express");
var router = express.Router();

var acessoController = require("../controllers/acessoController");

router.post("/cadastrar", function (req, res) {
    acessoController.cadastrar(req, res);
})

module.exports = router;