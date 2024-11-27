var database = require("../database/config")

function autenticar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    var instrucaoSql = `
        SELECT * FROM usuario WHERE email = '${email}' AND senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql
function cadastrar(nome, email, senha, dtNasc, adm) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, email, senha, dtNasc, adm);

    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucaoSql = `
        INSERT INTO usuario (nome, email, senha, dtNasc, admin) VALUES ('${nome}', '${email}', '${senha}', '${dtNasc}', ${adm});
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function editar(id, nome, email, senha, dtNasc, adm) {
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucaoSql = `
    UPDATE usuario SET nome = '${nome}', email = '${email}', senha = '${senha}', dtNasc = '${dtNasc}', admin = ${adm} WHERE id = ${id};`;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

async function verificarCadastroExistente(email) {
    var instrucaoSql = `
    SELECT * FROM usuario WHERE email = '${email}'`;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    var resultado = await database.executar(instrucaoSql);
    return resultado.length;
}

function listarTodos() {
    var instrucaoSql = `SELECT * FROM usuario`;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function excluirUsuario(id) {
    var instrucaoSql = `DELETE FROM usuario where id = ${id}`;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function listarUsuariosComMaisAcessos() {
    var instrucaoSql = `SELECT Usuario.id, Usuario.nome, count(Acesso.id) as qtdAcesso FROM Usuario
LEFT JOIN Acesso ON Usuario.id = Acesso.fkUsuario
GROUP BY Usuario.id
ORDER BY count(Acesso.id) DESC;`;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function listarTotalUsuarios() {
    var instrucaoSql = `SELECT count(id) as qtd_usuarios FROM Usuario;`
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function listarTotalAcessos() {
    var instrucaoSql = `SELECT count(id) as qtd_acessos FROM Acesso;`
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function listarUsuariosInativos(dtInicio, dtFim) {
    var instrucaoSql = "";
    if (dtInicio === "undefined" && dtFim === "undefined") { 
         instrucaoSql = `SELECT 
        Usuario.id, 
        Usuario.nome, 
        MAX(Acesso.dataHora) AS 'ultimo_acesso'
    FROM 
        Usuario
    LEFT JOIN 
        Acesso ON Acesso.fkUsuario = Usuario.id
    GROUP BY 
        Usuario.id
    ORDER BY 
        ultimo_acesso DESC;`
    } else {
        instrucaoSql = `SELECT 
        Usuario.id, 
        Usuario.nome, 
        MAX(Acesso.dataHora) AS 'ultimo_acesso'
    FROM 
        Usuario
    LEFT JOIN 
        Acesso ON Acesso.fkUsuario = Usuario.id
     WHERE Acesso.dataHora > '${dtInicio}' AND Acesso.dataHora < '${dtFim}'
    GROUP BY 
        Usuario.id
    ORDER BY 
        ultimo_acesso DESC
       ;
        `
    }
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function listarFaixasEtarias() {
    var instrucaoSql = `
SELECT 
    CASE 
        WHEN TIMESTAMPDIFF(YEAR, dtNasc, CURDATE()) < 18 THEN 'Até 18 anos'
        WHEN TIMESTAMPDIFF(YEAR, dtNasc, CURDATE()) BETWEEN 18 AND 29 THEN 'Entre 18 e 29 anos'
        WHEN TIMESTAMPDIFF(YEAR, dtNasc, CURDATE()) BETWEEN 30 AND 49 THEN 'Entre 30 e 49 anos'
        ELSE 'Maior de 50'
    END AS faixa_etaria,
    COUNT(*) AS quantidade
FROM 
    Usuario
GROUP BY 
    faixa_etaria
ORDER BY 
    faixa_etaria;`;
    return database.executar(instrucaoSql);
}

function listarAcessosPorDia(dtInicio, dtFim) {
    var instrucaoSql = "";
    if (dtInicio === "undefined" && dtFim === "undefined") { 
         instrucaoSql = `select  DATE_FORMAT(dataHora, '%d/%m') AS dia, count(id) as quantidade from Acesso
        GROUP BY  DATE_FORMAT(dataHora, '%d/%m');`;
      } else {
        instrucaoSql = `select  DATE_FORMAT(dataHora, '%d/%m') AS dia, count(id) as quantidade from Acesso
        WHERE dataHora >= '${dtInicio}' AND dataHora <='${dtFim}'
        GROUP BY  DATE_FORMAT(dataHora, '%d/%m');`;
      }


  
    return database.executar(instrucaoSql);
}

function listarUsuariosComMaisInteracoes(dtInicio, dtFim) {
    var instrucaoSql = "";
    if (dtInicio === "undefined" && dtFim === "undefined") {  
         instrucaoSql = `SELECT 
        u.id AS usuario_id, 
        u.nome AS usuario_nome,
        COUNT(DISTINCT a.id) AS quantidade_acessos,
        COUNT(DISTINCT c.id) AS quantidade_comentarios,
        COUNT(DISTINCT cu.id) AS quantidade_curtidas,
        COUNT(DISTINCT v.id) AS quantidade_visualizacoes,
        (COUNT(DISTINCT a.id) + COUNT(DISTINCT c.id) + COUNT(DISTINCT cu.id) + COUNT(DISTINCT v.id)) AS total_interacoes
    FROM 
        Usuario u
    LEFT JOIN 
        Acesso a ON a.fkUsuario = u.id
    LEFT JOIN 
        Comentario c ON c.fkUsuario = u.id
    LEFT JOIN 
        Curtida cu ON cu.fkUsuario = u.id
    LEFT JOIN 
        Visualizacao v ON v.fkUsuario = u.id
    GROUP BY 
        u.id
    ORDER BY 
        total_interacoes DESC;`
    } else {
        instrucaoSql = `SELECT 
    u.id AS usuario_id, 
    u.nome AS usuario_nome,
    IFNULL(COUNT(DISTINCT a.id), 0) AS quantidade_acessos,
    IFNULL(COUNT(DISTINCT c.id), 0) AS quantidade_comentarios,
    IFNULL(COUNT(DISTINCT cu.id), 0) AS quantidade_curtidas,
    IFNULL(COUNT(DISTINCT v.id), 0) AS quantidade_visualizacoes,
    IFNULL((
        COUNT(DISTINCT a.id) + 
        COUNT(DISTINCT c.id) + 
        COUNT(DISTINCT cu.id) + 
        COUNT(DISTINCT v.id)
    ), 0) AS total_interacoes
FROM 
    Usuario u
LEFT JOIN 
    Acesso a ON a.fkUsuario = u.id AND a.dataHora BETWEEN '${dtInicio}' AND '${dtFim}'
LEFT JOIN 
    Comentario c ON c.fkUsuario = u.id AND c.dataHora BETWEEN '${dtInicio}' AND '${dtFim}'
LEFT JOIN 
    Curtida cu ON cu.fkUsuario = u.id AND cu.dataHora BETWEEN '${dtInicio}' AND '${dtFim}'
LEFT JOIN 
    Visualizacao v ON v.fkUsuario = u.id AND v.dataHora BETWEEN '${dtInicio}' AND '${dtFim}'
GROUP BY 
    u.id
ORDER BY 
    total_interacoes DESC;`;
    }

    

return database.executar(instrucaoSql);
}




module.exports = {
    autenticar,
    cadastrar,
    verificarCadastroExistente,
    listarTodos,
    excluirUsuario,
    editar,
    listarUsuariosComMaisAcessos,
    listarTotalUsuarios,
    listarTotalAcessos,
    listarUsuariosInativos,
    listarFaixasEtarias,
    listarAcessosPorDia,
    listarUsuariosComMaisInteracoes
};