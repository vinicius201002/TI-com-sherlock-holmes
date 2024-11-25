
create database if not exists projeto_pessoal;
use projeto_pessoal;

CREATE TABLE IF NOT EXISTS Usuario (
  id INT NOT NULL AUTO_INCREMENT,
  nome VARCHAR(45),
  email VARCHAR(45),
  senha VARCHAR(45),
  dtNasc DATETIME DEFAULT CURRENT_TIMESTAMP,
  admin BIT DEFAULT 0,
  PRIMARY KEY (id));
  
  ALTER TABLE Usuario MODIFY COLUMN   dtNasc DATETIME DEFAULT CURRENT_TIMESTAMP;
  
  ALTER TABLE Usuario MODIFY COLUMN admin bit default 0;
  select * from usuario;
  
  CREATE TABLE IF NOT EXISTS Acesso (
    id INT PRIMARY KEY AUTO_INCREMENT,
    dataHora DATETIME DEFAULT current_timestamp(),
    fkUsuario INT,
    CONSTRAINT fkUsuarioAcesso FOREIGN KEY (fkUsuario) REFERENCES Usuario (id)
    ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Postagem (
id INT PRIMARY KEY AUTO_INCREMENT,
titulo VARCHAR(50),
corpo TEXT,
imagem TEXT,
dtCriacao DATETIME DEFAULT current_timestamp,
fkUsuario INT,
CONSTRAINT fkCriadorPostagem FOREIGN KEY (fkUsuario) REFERENCES Usuario (id)
ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Curtida (
id INT PRIMARY KEY AUTO_INCREMENT,
dataHora DATETIME,
fkPostagem INT,
fkUsuario INT,
CONSTRAINT fkPostagemUsuario FOREIGN KEY (fkUsuario) REFERENCES Usuario (id),
CONSTRAINT fkPostagemCurtida FOREIGN KEY (fkPostagem) REFERENCES Postagem (id)
ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Comentario (
id INT PRIMARY KEY AUTO_INCREMENT,
dataHora DATETIME DEFAULT CURRENT_TIMESTAMP, 
corpo TEXT,
fkPostagem INT,
CONSTRAINT fkPostagemComentario FOREIGN KEY (fkPostagem) REFERENCES Postagem (id)
ON DELETE CASCADE,
fkUsuario INT,
CONSTRAINT fkCriadorComentario FOREIGN KEY (fkUsuario) REFERENCES Usuario (id)
ON DELETE CASCADE
);


CREATE TABLE IF NOT EXISTS Visualizacao (
   id INT PRIMARY KEY AUTO_INCREMENT,
    dataHora DATETIME DEFAULT current_timestamp(),
    fkUsuario INT,
    CONSTRAINT fkUsuarioVisualizacao FOREIGN KEY (fkUsuario) REFERENCES Usuario (id)
    ON DELETE CASCADE,
    fkPostagem INT,
    CONSTRAINT fkPostagemVisualizacao FOREIGN KEY (fkPostagem) REFERENCES Postagem (id)
    ON DELETE CASCADE
);

insert into Usuario (email, senha, admin) values (
"admin@admin",
"admin",
1
),
("admin",
"admin",
1);









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

