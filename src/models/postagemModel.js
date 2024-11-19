var database = require("../database/config")

function cadastrar(titulo, corpo, linkImagem, idUsuario) {
    var instrucaoSql = `
        INSERT INTO Postagem (titulo, corpo, imagem, fkUsuario) VALUES ('${titulo}', '${corpo}', '${linkImagem}', ${idUsuario});
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function listarTodasPostagens() {
    var instrucaoSql = `
    SELECT * FROM Postagem;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function listarPostagensPorIdPostagem(id) {
    var instrucaoSql = `SELECT * FROM Postagem WHERE id = ${id}`;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function listarPostagensPorUsuario(fkUsuario) {
    var instrucaoSql = `
    SELECT * FROM Postagem WHERE fkUsuario = ${fkUsuario};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function excluir(id) {
    var instrucaoSql = `DELETE FROM postagem where id = ${id}`;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function atualizar(id, titulo, corpo, linkImagem) {
    var instrucaoSql = `UPDATE FROM postagem SET titulo = '${titulo}', corpo = '${corpo}', linkImagem = '${linkImagem}' WHERE id = ${id}`
}
module.exports = {
    cadastrar,
    listarTodasPostagens,
    listarPostagensPorUsuario,
    excluir,
    atualizar,
    listarPostagensPorIdPostagem
};