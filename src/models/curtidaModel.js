var database = require("../database/config")

function cadastrar(idUsuario, idPostagem) {
    var instrucaoSql = `
        INSERT INTO curtida (fkUsuario, fkCurtida) VALUES (${idUsuario},${idPostagem}});
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


module.exports = {
    cadastrar
};