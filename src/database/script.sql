
create database if not exists projeto_pessoal;
use projeto_pessoal;

CREATE TABLE Usuario (
idUsuario INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(50),
email VARCHAR(100),
senha VARCHAR(100),
dtNasc DATE);

