var database = require("../database/config")

function cadastrar(idUsuario) {
    var instrucaoSql = `
        INSERT INTO acesso (fkUsuario) VALUES (${idUsuario});
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


module.exports = {
    cadastrar
};