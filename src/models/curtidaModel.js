var database = require("../database/config")

function cadastrar(idUsuario, idPostagem) {
    var instrucaoSql = `
        INSERT INTO curtida (fkUsuario, fkPostagem) VALUES (${idUsuario},${idPostagem});
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function listarPorUsuario(idUsuario, idPostagem) {
    var instrucaoSql = `SELECT * FROM curtida WHERE fkUsuario = ${idUsuario} AND fkPostagem = ${idPostagem}`;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
} 

function listarPorPostagem(idPostagem) {
    var instrucaoSql = `SELECT COUNT(id) as qtdCurtidas FROM curtida WHERE fkPostagem = ${idPostagem} `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function listarPorData(idPostagem) {
    var instrucaoSql = `SELECT CONCAT(DAY(curtida.dataHora), '/', MONTH(curtida.dataHora), '/', YEAR(curtida.dataHora)) AS data, 
    COUNT(id) as qtdcurtidas FROM curtida WHERE fkPostagem = ${idPostagem} GROUP BY CONCAT(DAY(curtida.dataHora), '/', MONTH(curtida.dataHora), '/', YEAR(curtida.dataHora));`;
        console.log("Executando a instrução SQL: \n" + instrucaoSql);
        return database.executar(instrucaoSql);
}

function deletarCurtida(idPostagem, idUsuario) {
    var instrucaoSql = `DELETE FROM Curtida WHERE fkPostagem = ${idPostagem} AND fkUsuario = ${idUsuario};`;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}
module.exports = {
    cadastrar,
    listarPorUsuario,
    listarPorPostagem,
    deletarCurtida,
    listarPorData
};