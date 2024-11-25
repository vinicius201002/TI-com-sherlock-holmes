var database = require("../database/config")

function cadastrar(idUsuario, idPostagem) {
    var instrucaoSql = `
        INSERT INTO visualizacao (fkUsuario, fkPostagem) VALUES (${idUsuario}, ${idPostagem});
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


module.exports = {
    cadastrar
};