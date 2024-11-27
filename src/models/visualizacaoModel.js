var database = require("../database/config")

function cadastrar(idUsuario, idPostagem) {
    var instrucaoSql = `
        INSERT INTO visualizacao (fkUsuario, fkPostagem) VALUES (${idUsuario}, ${idPostagem});
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function listarPorData(idPostagem) {
    var instrucaoSql = `SELECT CONCAT(DAY(visualizacao.dataHora), '/', MONTH(visualizacao.dataHora), '/', YEAR(visualizacao.dataHora)) AS data, 
    COUNT(id) as qtdvisualizacaos FROM visualizacao WHERE fkPostagem = ${idPostagem} GROUP BY CONCAT(DAY(visualizacao.dataHora), '/', MONTH(visualizacao.dataHora), '/', YEAR(visualizacao.dataHora));`;
        console.log("Executando a instrução SQL: \n" + instrucaoSql);
        return database.executar(instrucaoSql);
}


module.exports = {
    cadastrar,
    listarPorData
};