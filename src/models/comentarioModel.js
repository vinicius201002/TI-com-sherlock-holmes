var database = require("../database/config")

function cadastrar(idUsuario, idPostagem, corpo) {
    var instrucaoSql = `
        INSERT INTO comentario (fkUsuario, fkPostagem, corpo) VALUES (${idUsuario},${idPostagem}, '${corpo}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}
function listarPorPostagem(idPostagem) {
    var instrucaoSql = `SELECT * FROM comentario JOIN usuario ON fkUsuario = usuario.id WHERE fkPostagem = ${idPostagem}`;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function listarPorData(idPostagem) {
    var instrucaoSql = `
SELECT CONCAT(DAY(comentario.dataHora), '/', MONTH(comentario.dataHora), '/', YEAR(comentario.dataHora)) AS data, 
    COUNT(id) as qtdComentarios FROM comentario WHERE fkPostagem = ${idPostagem} GROUP BY CONCAT(DAY(comentario.dataHora), '/', MONTH(comentario.dataHora), '/', YEAR(comentario.dataHora)); `;
        console.log("Executando a instrução SQL: \n" + instrucaoSql);
        return database.executar(instrucaoSql);
}


module.exports = {
    cadastrar,
    listarPorPostagem,
    listarPorData
};