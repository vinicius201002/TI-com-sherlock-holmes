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

module.exports = {
    autenticar,
    cadastrar,
    verificarCadastroExistente,
    listarTodos, 
    excluirUsuario,
    editar
};