
create database if not exists projeto_pessoal;
use projeto_pessoal;

CREATE TABLE IF NOT EXISTS Usuario (
  id INT NOT NULL AUTO_INCREMENT,
  nome VARCHAR(45),
  email VARCHAR(45),
  senha VARCHAR(45),
  dtNasc DATE,
  admin BIT,
  PRIMARY KEY (id));
  
  CREATE TABLE IF NOT EXISTS Acesso (
    id INT PRIMARY KEY AUTO_INCREMENT,
    dataHora DATETIME DEFAULT current_timestamp(),
    fkUsuario INT,
    CONSTRAINT fkUsuarioAcesso FOREIGN KEY (fkUsuario) REFERENCES Usuario (id)
);

CREATE TABLE IF NOT EXISTS Postagem (
id INT PRIMARY KEY AUTO_INCREMENT,
titulo VARCHAR(50),
corpo TEXT,
imagem TEXT,
fkUsuario INT,
CONSTRAINT fkCriadorPostagem FOREIGN KEY (fkUsuario) REFERENCES Usuario (id)
);

CREATE TABLE IF NOT EXISTS Curtida (
id INT PRIMARY KEY AUTO_INCREMENT,
dataHora DATETIME,
fkPostagem INT,
CONSTRAINT fkPostagemCurtida FOREIGN KEY (fkPostagem) REFERENCES Postagem (id)
);

CREATE TABLE IF NOT EXISTS Comentario (
id INT PRIMARY KEY AUTO_INCREMENT,
dataHora DATETIME, 
corpo TEXT,
fkPostagem INT,
CONSTRAINT fkPostagemComentario FOREIGN KEY (fkPostagem) REFERENCES Postagem (id),
fkUsuario INT,
CONSTRAINT fkCriadorComentario FOREIGN KEY (fkUsuario) REFERENCES Usuario (id)
);

insert into Usuario (email, senha) values (
"admin@admin",
"admin"
),
("admin",
"admin");


Insert into Postagem (titulo, corpo, imagem, fkUsuario) VALUES ('Entendendo Linux como um Detetive', 
'commodo suscipit scelerisque condimentum turpis. Vehicula gravida duis lectus malesuada conubia hac 
ligula nostra dictum. Tortor curae nisl praesent, dui ridiculus sit egestas urna platea. Hac nascetur ad 
accumsan; platea vehicula ipsum odio tristique vitae. Ipsum auctor finibus semper quam aliquam felis. 
Pretium class vulputate praesent tincidunt vitae tortor nisl hendrerit. Nam facilisi iaculis facilisi orci aliquet felis. 
Nostra luctus et per nascetur, feugiat morbi lobortis ac. Dapibus natoque sit sociosqu lobortis adipiscing. 
Parturient non himenaeos; vehicula eros dictum tellus praesent. Suspendisse consectetur litora penatibus mus aenean 
himenaeos ultrices. Elementum suspendisse mi amet lobortis rutrum ex convallis. Elit maecenas praesent facilisi cubilia erat integer.',
'https://e-tinet.com/wp-content/uploads/2017/02/MELHORES-DISTRIBUICOES-LINUX-RODAR-SERVIDORES-2.png', 
1);


