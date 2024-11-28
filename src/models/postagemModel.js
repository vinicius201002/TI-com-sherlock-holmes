var database = require("../database/config")

function cadastrar(titulo, corpo, linkImagem, idUsuario) {
    var instrucaoSql = `
        INSERT INTO postagem (titulo, corpo, imagem, fkUsuario) VALUES ('${titulo}', '${corpo}', '${linkImagem}', ${idUsuario});
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function listarTodasPostagens() {
    var instrucaoSql = `
    SELECT *, postagem.id as postagemid FROM postagem JOIN usuario on fkUsuario = usuario.id;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function listarPostagensPorIdPostagem(id) {
    var instrucaoSql = `SELECT * FROM postagem JOIN usuario on fkUsuario = usuario.id WHERE postagem.id = ${id};`;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function listarPostagensPorUsuario(fkUsuario) {
    var instrucaoSql = `
    SELECT * FROM postagem WHERE fkUsuario = ${fkUsuario};
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
    var instrucaoSql = `UPDATE postagem SET titulo = '${titulo}', corpo = '${corpo}', imagem = '${linkImagem}' WHERE id = ${id}`;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function listarPostagensMaisEngajada(idPostagem) {
    var 
        instrucaoSql = `SELECT 
        CONCAT(DAY(a.dataHora), '/', MONTH(a.dataHora), '/', YEAR(a.dataHora)) AS data,
                p.id AS postagem_id, 
                p.titulo AS postagem_titulo,
                COUNT(DISTINCT a.id) AS quantidade_acessos,
                COUNT(DISTINCT c.id) AS quantidade_comentarios,
                COUNT(DISTINCT cu.id) AS quantidade_curtidas,
                COUNT(DISTINCT v.id) AS quantidade_visualizacoes,
                (COUNT(DISTINCT a.id) + COUNT(DISTINCT c.id) + COUNT(DISTINCT cu.id) + COUNT(DISTINCT v.id)) AS total_interacoes
            FROM 
                postagem p
            LEFT JOIN 
                Acesso a ON a.fkUsuario = p.id AND DAY(a.dataHora) = DAY(a.dataHora) 
            LEFT JOIN 
                Comentario c ON c.fkUsuario = p.id AND DAY(a.dataHora) = DAY(c.dataHora) 
            LEFT JOIN 
                Curtida cu ON cu.fkUsuario = p.id AND DAY(a.dataHora) = DAY(cu.dataHora) 
            LEFT JOIN 
                Visualizacao v ON v.fkUsuario = p.id AND DAY(a.dataHora) = DAY(v.dataHora) 
                where p.id = ${idPostagem}
            GROUP BY 
               DAY(v.dataHora)
            ORDER BY 
                total_interacoes DESC;`;
    

 
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function listarComentarios(idPostagem) {
    var instrucaoSql = `
    SELECT comentario.*, usuario.nome FROM comentario JOIN postagem ON comentario.fkPostagem = postagem.id JOIN usuario ON comentario.fkUsuario = usuario.id WHERE fkPostagem = ${idPostagem} ORDER BY dataHora DESC;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


module.exports = {
    cadastrar,
    listarTodasPostagens,
    listarPostagensPorUsuario,
    excluir,
    atualizar,
    listarPostagensPorIdPostagem,
    listarPostagensMaisEngajada,
    listarComentarios
};