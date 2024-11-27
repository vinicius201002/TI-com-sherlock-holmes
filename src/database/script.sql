
create database if not exists projeto_pessoal;
use projeto_pessoal;

CREATE TABLE IF NOT EXISTS Usuario (
  id INT NOT NULL AUTO_INCREMENT,
  nome VARCHAR(45),
  email VARCHAR(45),
  senha VARCHAR(45),
  dtNasc DATETIME DEFAULT CURRENT_TIMESTAMP,
  admin BIT DEFAULT 0,
  dtCriacao DATETIME DEFAULT CURRENT_TIMESTAMP
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


INSERT INTO Usuario (nome, email, senha, dtNasc, admin) VALUES 
('John Doe', 'johndoe@example.com', 'senha123', '1990-05-15', 0),
('Jane Smith', 'janesmith@example.com', 'senha456', '1992-08-20', 0),
('Carlos Silva', 'carlos.silva@example.com', 'senha789', '1985-03-10', 0),
('Alice Souza', 'alice.souza@example.com', 'senha321', '2000-12-05', 0),
('Admin User', 'admin@admin.com', 'admin', '1980-01-01', 1),
('Bruno Almeida', 'bruno.almeida@example.com', 'bruno123', '1993-04-15', 0),
('Carla Mendes', 'carla.mendes@example.com', 'carla456', '1995-07-22', 0),
('Diego Costa', 'diego.costa@example.com', 'diego789', '1990-11-08', 0),
('Fernanda Oliveira', 'fernanda.oliveira@example.com', 'fernanda321', '1988-03-19', 0),
('Gabriel Santos', 'gabriel.santos@example.com', 'gabriel654', '1999-05-30', 0),
('Helena Rocha', 'helena.rocha@example.com', 'helena987', '2001-01-12', 0),
('Igor Pereira', 'igor.pereira@example.com', 'igor111', '1992-06-24', 0),
('Juliana Ramos', 'juliana.ramos@example.com', 'juliana222', '1996-09-17', 0),
('Lucas Martins', 'lucas.martins@example.com', 'lucas333', '1991-12-05', 0),
('Mariana Lima', 'mariana.lima@example.com', 'mariana444', '1987-08-14', 0),
('Nicolas Silva', 'nicolas.silva@example.com', 'nicolas555', '2000-02-28', 0),
('Olivia Carvalho', 'olivia.carvalho@example.com', 'olivia666', '1994-10-09', 0),
('Pedro Henrique', 'pedro.henrique@example.com', 'pedro777', '1998-04-22', 0),
('Renata Souza', 'renata.souza@example.com', 'renata888', '1993-07-13', 0),
('Thiago Ribeiro', 'thiago.ribeiro@example.com', 'thiago999', '1989-01-16', 0),
('Vanessa Borges', 'vanessa.borges@example.com', 'vanessa123', '1997-11-03', 0),
('Wesley Duarte', 'wesley.duarte@example.com', 'wesley456', '1992-05-07', 0),
('Yasmin Nogueira', 'yasmin.nogueira@example.com', 'yasmin789', '1995-03-25', 0),
('Zeca Melo', 'zeca.melo@example.com', 'zeca321', '1986-12-19', 0),
('Luana Cruz', 'luana.cruz@example.com', 'luana654', '2002-08-15', 0);

INSERT INTO Postagem (titulo, corpo, imagem, fkUsuario) VALUES 
('Como usar MySQL de forma eficiente', 
 'Uma introdução prática ao uso do MySQL para otimizar consultas e gerenciar bancos de dados.', 
 'https://example.com/mysql.png', 
 1),
('Os segredos do frontend moderno', 
 'Descubra como criar interfaces responsivas usando as melhores ferramentas disponíveis.', 
 'https://example.com/frontend.png', 
 2),
('Introdução ao Machine Learning', 
 'Entenda os conceitos básicos de aprendizado de máquina e como começar a aplicar.', 
 'https://example.com/ml.png', 
 3),
('Segurança digital para iniciantes', 
 'Proteja seus dados e sua privacidade na internet com estas dicas práticas.', 
 'https://example.com/security.png', 
 4);



INSERT INTO Comentario (dataHora, corpo, fkPostagem, fkUsuario) VALUES 
(CURRENT_TIMESTAMP, 'Ótimo artigo, muito bem explicado!', 1, 2),
(CURRENT_TIMESTAMP, 'Gostei das dicas, vou aplicar nos meus projetos.', 2, 3),
(CURRENT_TIMESTAMP, 'Machine Learning é um tema fascinante!', 3, 1),
(CURRENT_TIMESTAMP, 'Segurança é essencial, obrigado pelo conteúdo.', 4, 4);


INSERT INTO Visualizacao (dataHora, fkUsuario, fkPostagem) VALUES 
(CURRENT_TIMESTAMP, 1, 1),
(CURRENT_TIMESTAMP, 2, 2),
(CURRENT_TIMESTAMP, 3, 3),
(CURRENT_TIMESTAMP, 4, 4),
(CURRENT_TIMESTAMP, 2, 1);


INSERT INTO Acesso (dataHora, fkUsuario) VALUES 
(CURRENT_TIMESTAMP, 1),
(CURRENT_TIMESTAMP, 2),
(CURRENT_TIMESTAMP, 3),
(CURRENT_TIMESTAMP, 4),
(CURRENT_TIMESTAMP, 1);


INSERT INTO Curtida (dataHora, fkPostagem, fkUsuario) VALUES 
(CURRENT_TIMESTAMP, 1, 2),
(CURRENT_TIMESTAMP, 1, 3),
(CURRENT_TIMESTAMP, 2, 1),
(CURRENT_TIMESTAMP, 3, 4);









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

