-- criação do banco de dados (caso não exista)
create database if not exists projeto_pessoal;
use projeto_pessoal;

CREATE TABLE IF NOT EXISTS usuario (
  id INT NOT NULL AUTO_INCREMENT,
  nome VARCHAR(100),
  email VARCHAR(100),
  senha VARCHAR(100),
  dtNasc DATETIME DEFAULT CURRENT_TIMESTAMP,
  admin BIT DEFAULT 0,
  dtCriacao DATETIME DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id));

  CREATE TABLE IF NOT EXISTS acesso (
    id INT PRIMARY KEY AUTO_INCREMENT,
    dataHora DATETIME DEFAULT current_timestamp(),
    fkUsuario INT,
    CONSTRAINT fkUsuarioAcesso FOREIGN KEY (fkUsuario) REFERENCES usuario (id)
    -- o DELETE CASCADE indica que, caso o id referenciado nessa fk seja excluído, por cascata, o acesso associado à esse fk também seja excluído automaticamente
    ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS postagem (
id INT PRIMARY KEY AUTO_INCREMENT,
titulo VARCHAR(100),
-- os campos TEXT armazenam até 64kb de caracteres
corpo TEXT,
imagem TEXT,
dtCriacao DATETIME DEFAULT current_timestamp,
fkUsuario INT,
CONSTRAINT fkCriadorPostagem FOREIGN KEY (fkUsuario) REFERENCES usuario (id)
ON DELETE CASCADE
);


CREATE TABLE IF NOT EXISTS curtida (
id INT PRIMARY KEY AUTO_INCREMENT,
dataHora DATETIME DEFAULT current_timestamp,
fkPostagem INT,
fkUsuario INT,
CONSTRAINT fkPostagemUsuario FOREIGN KEY (fkUsuario) REFERENCES usuario (id)
ON DELETE CASCADE,
CONSTRAINT fkPostagemCurtida FOREIGN KEY (fkPostagem) REFERENCES postagem (id)
ON DELETE CASCADE
);


CREATE TABLE IF NOT EXISTS comentario (
id INT PRIMARY KEY AUTO_INCREMENT,
dataHora DATETIME DEFAULT CURRENT_TIMESTAMP, 
corpo TEXT,
fkPostagem INT,
CONSTRAINT fkPostagemComentario FOREIGN KEY (fkPostagem) REFERENCES postagem (id)
ON DELETE CASCADE,
fkUsuario INT,
CONSTRAINT fkCriadorComentario FOREIGN KEY (fkUsuario) REFERENCES usuario (id)
ON DELETE CASCADE
);


CREATE TABLE IF NOT EXISTS visualizacao (
   id INT PRIMARY KEY AUTO_INCREMENT,
    dataHora DATETIME DEFAULT current_timestamp(),
    fkUsuario INT,
    CONSTRAINT fkUsuarioVisualizacao FOREIGN KEY (fkUsuario) REFERENCES usuario (id)
    ON DELETE CASCADE,
    fkPostagem INT,
    CONSTRAINT fkPostagemVisualizacao FOREIGN KEY (fkPostagem) REFERENCES postagem (id)
    ON DELETE CASCADE
);


INSERT INTO usuario (nome, email, senha, dtNasc, admin) VALUES 
('João Luz', 'joaoluz@email.com', 'senha123', '1990-05-15', 0),
('Joelma Mattos', 'joelmamattos@email.com', 'senha456', '1992-08-20', 0),
('Carlos Silva', 'carlos.silva@email.com', 'senha789', '1985-03-10', 0),
('Alice Souza', 'alice.souza@email.com', 'senha321', '2000-12-05', 0),
('Admin User', 'admin@admin.com', 'admin', '1980-01-01', 1),
('Bruno Almeida', 'bruno.almeida@email.com', 'bruno123', '1993-04-15', 0),
('Carla Mendes', 'carla.mendes@email.com', 'carla456', '1995-07-22', 0),
('Diego Costa', 'diego.costa@email.com', 'diego789', '1990-11-08', 0);

INSERT INTO postagem (titulo, corpo, imagem, fkUsuario) VALUES 
('A Dedução da Verdade: Um Estudo sobre MySQL', 
 'O MySQL, assim como a arte da dedução, é uma ferramenta poderosa para organizar o caos e revelar padrões escondidos. Elementar, meu caro leitor, ao adentrarmos o universo da tecnologia, encontramos os bancos de dados como repositórios organizados de conhecimento digital. Entre eles, o MySQL se destaca por sua simplicidade elegante e funcionalidade robusta. Assim como um detetive coleta pistas para resolver mistérios, o MySQL organiza, interroga e revela informações ocultas em conjuntos de dados desordenados. Desenvolvido em 1995 por Michael Widenius, David Axmark e Allan Larsson, ele se tornou a espinha dorsal de aplicações web e corporativas, sendo usado por gigantes como Facebook e Netflix.

Assim como qualquer mistério, o MySQL apresenta componentes essenciais que tornam sua investigação compreensível e útil. Tabelas são a base do banco de dados, onde os dados são organizados em linhas e colunas. Chaves primárias e estrangeiras conectam informações, revelando relações que, à primeira vista, poderiam passar despercebidas. Consultas, por sua vez, são os interrogatórios feitos ao banco, enquanto índices aceleram a recuperação das respostas. Transações garantem a consistência e integridade das operações, refletindo o mesmo rigor que aplico ao investigar os enigmas mais intricados.

No mundo do MySQL, SQL é a linguagem da dedução. Consultas como SELECT permitem buscar informações precisas, enquanto comandos como INSERT, UPDATE e DELETE gerenciam os dados armazenados. Assim como perguntas imprecisas podem levar um detetive a pistas falsas, consultas mal formuladas podem resultar em informações incorretas ou ineficiência no sistema. É preciso raciocínio lógico para que os dados sejam interrogados de maneira eficiente e precisa.

O MySQL encontra aplicação em diversos cenários intrigantes. Sistemas de gerenciamento de conteúdo, como WordPress e Joomla, utilizam-no para organizar e servir conteúdo de forma dinâmica. Plataformas de e-commerce, como Magento e WooCommerce, dependem dele para gerenciar produtos, pedidos e clientes. Já na análise de dados, o MySQL processa grandes volumes de informações para auxiliar na tomada de decisões. Se eu fosse contratado para resolver um mistério de dados, não hesitaria em recorrer ao MySQL, dada sua capacidade de estruturar e relacionar informações complexas.

Contudo, nem tudo são flores no mundo do MySQL. Assim como todo mistério apresenta seus desafios, os bancos de dados enfrentam problemas como concorrência, onde múltiplos acessos simultâneos podem causar conflitos; segurança, que exige vigilância constante para proteger dados confidenciais; e otimização, já que consultas mal projetadas podem comprometer a performance do sistema. Aqui, a lógica dedutiva é essencial. Ferramentas como EXPLAIN ajudam a identificar gargalos, enquanto estratégias como a normalização e a indexação aprimoram o desempenho.

Por fim, o MySQL é mais do que um banco de dados; é uma manifestação da lógica aplicada. Ele transforma caos em ordem, ruído em significado. Assim como eu desvendo mistérios aparentemente insolúveis, o MySQL permite que desenvolvedores e analistas solucionem os enigmas mais complexos escondidos em dados. Em sua essência, o MySQL é o detetive incansável do mundo da tecnologia, pronto para buscar a verdade, desde que questionado corretamente. Afinal, dados, como mistérios, são inúteis até que sejam investigados.', 
 'https://s2-techtudo.glbimg.com/79pd1VgUsjdDVho5YURl1kEaT3Y=/0x0:300x155/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_08fbf48bc0524877943fe86e43087e7a/internal_photos/bs/2021/y/M/W5GFw3Qh2YwD5XkhUM2Q/2012-04-17-mysql-logos.gif', 
 5),
('HTTP: O Detetive Invisível da Web', 
 'O protocolo HTTP (Hypertext Transfer Protocol) é, por assim dizer, o mensageiro da web. Ele define como as informações são solicitadas e entregues entre um cliente (como seu navegador) e um servidor. Imagine-o como um detetive diligente, transmitindo perguntas e respostas para solucionar o mistério do que você deseja acessar.

Funcionando no modelo de requisição e resposta, o cliente envia um pedido HTTP ao servidor, que processa a solicitação e retorna o resultado, seja uma página HTML, uma imagem ou outro recurso. Os métodos HTTP, como GET (para buscar informações), POST (para enviar dados), PUT (para atualizar) e DELETE (para remover), são como ferramentas específicas em uma investigação, cada uma com sua função.

HTTP é um protocolo sem estado, ou seja, cada interação é independente, como se os participantes esquecessem as interações anteriores. Isso garante simplicidade, mas pode exigir o uso de cookies e sessões para rastrear atividades.

Com a evolução da tecnologia, o HTTP foi aprimorado para garantir maior eficiência e segurança. O HTTP/2 introduziu melhorias como a multiplexação, enquanto o HTTPS (HTTP sobre SSL/TLS) protege a comunicação com criptografia, essencial em tempos de ciberameaças.

Em suma, o HTTP é o mecanismo essencial que conecta usuários e informações, viabilizando a navegação na web de maneira fluida e estruturada. Ele é, literalmente, o caminho que permite explorar o vasto universo digital.', 
 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAJRhP_g75z8RqnhlbPoVkssbnQtsTLkAXXA&s', 
 5),
('Java: A Linguagem Universal da Programação', 
 'Java é uma linguagem de programação conhecida por sua versatilidade e robustez, sendo uma das mais usadas no desenvolvimento de aplicativos, sistemas corporativos e até mesmo dispositivos móveis. Seu princípio fundamental, "Write Once, Run Anywhere", significa que o código escrito em Java pode ser executado em qualquer plataforma que tenha a Máquina Virtual Java (JVM), sem necessidade de reescrever ou modificar o código.

Como um detetive que deve lidar com diversos casos, Java permite que programadores criem aplicações que funcionam em diferentes ambientes e sistemas operacionais. Sua sintaxe, baseada em C, é simples e poderosa, favorecendo tanto iniciantes quanto desenvolvedores experientes. Java é orientada a objetos, o que significa que os dados e comportamentos são organizados em "objetos", permitindo melhor organização e reutilização do código.

Além disso, a vastidão de bibliotecas e frameworks, como Spring e Hibernate, tornam o Java uma escolha popular para grandes sistemas e aplicações web escaláveis. Em resumo, Java continua a ser uma ferramenta essencial para programadores em busca de uma linguagem confiável, flexível e capaz de atender a múltiplos desafios no desenvolvimento de software.', 
 'https://www.jrebel.com/sites/default/files/image/2020-05/image-blog-revel-top-java-tools.jpg', 
 5),
('Linux: O Sistema Operacional da Liberdade e Poder', 
 'Linux é um sistema operacional que se destaca por sua flexibilidade, estabilidade e segurança, sendo a escolha preferida de desenvolvedores, administradores de sistemas e empresas que buscam um ambiente controlado e personalizável. Criado por Linus Torvalds em 1991, o Linux é um software livre, o que significa que seu código-fonte pode ser acessado, modificado e distribuído livremente, algo que torna o sistema ideal para aqueles que buscam liberdade e controle absoluto sobre sua máquina.

Como um detetive que adapta suas estratégias de investigação, Linux pode ser configurado para atender a diferentes necessidades, desde servidores de grande porte até dispositivos móveis e sistemas embarcados. Sua estrutura modular permite que o usuário escolha e adicione apenas os componentes necessários, tornando o sistema leve e eficiente. Além disso, a segurança do Linux, com permissões e controles rigorosos, é um de seus maiores trunfos, garantindo a proteção contra ameaças.

Utilizado em servidores, supercomputadores e até mesmo em dispositivos pessoais com distribuições como Ubuntu e Fedora, Linux continua a ser uma ferramenta essencial no mundo da tecnologia, sempre evoluindo com a colaboração de uma comunidade global de desenvolvedores. Em suma, Linux é o sistema operacional que oferece liberdade, poder e segurança para quem está disposto a explorá-lo em suas infinitas possibilidades.', 
 'https://img.odcdn.com.br/wp-content/uploads/2024/10/imagem_2024-10-15_123948937-1.png', 
 5);
 


INSERT INTO comentario (dataHora, corpo, fkPostagem, fkUsuario) VALUES
('2024-11-25 09:15:00', 'Excelente artigo! Nunca havia pensado em MySQL como uma ferramenta de investigação, mas agora tudo faz sentido. A analogia com Sherlock Holmes é muito interessante.', 1, 1),
('2024-11-24 10:10:00', 'Eu adoro MySQL, mas sempre fico perdido nas transações. A explicação sobre como elas garantem a integridade foi muito útil. Vou aplicar isso em meu projeto!', 1, 2),
('2024-11-23 11:05:00', 'A comparação com a lógica dedutiva foi brilhante! Realmente, o MySQL permite que a gente busque respostas precisas, assim como Holmes.', 1, 3),
('2024-11-22 12:20:00', 'Fico sempre impressionado com a flexibilidade do MySQL. Apesar de ser uma ferramenta tão simples, pode ser muito poderosa dependendo da aplicação.', 1, 4),
('2024-11-21 13:30:00', 'Minha dúvida sobre o MySQL é sobre o uso de índices. Quando vale a pena criar um índice extra? Será que isso não compromete a performance?', 1, 5),
('2024-11-20 09:40:00', 'Gostei muito dessa comparação entre HTTP e um detetive. A explicação sobre os métodos HTTP foi bem clara e facilitou meu entendimento.', 2, 1),
('2024-11-19 10:55:00', 'O artigo trouxe uma visão interessante do HTTP. Acho que o HTTPS, com a criptografia, é fundamental para a segurança na web hoje em dia.', 2, 2),
('2024-11-18 11:50:00', 'A explicação sobre como o HTTP funciona sem estado foi útil para mim. Isso realmente torna o processo de comunicação mais simples entre cliente e servidor.', 2, 3),
('2024-11-25 12:40:00', 'Eu não sabia que o HTTP/2 já trazia melhorias tão grandes. Agora me sinto mais preparado para utilizar essas vantagens em meus projetos.', 2, 4),
('2024-11-24 14:10:00', 'Agora entendi melhor como as requisições funcionam. Isso me ajudou muito em um projeto web no qual estou trabalhando. Muito bom o artigo!', 2, 5),
('2024-11-23 08:50:00', 'A linguagem Java sempre foi minha favorita pela sua portabilidade. Concordo com o ponto sobre a JVM ser um dos maiores diferenciais do Java.', 3, 1),
('2024-11-22 09:25:00', 'A capacidade de rodar em diferentes plataformas é o que mais me atrai no Java. Ótima explicação sobre como a JVM funciona por trás disso.', 3, 2),
('2024-11-21 11:00:00', 'Sou iniciante em Java, e esse artigo me ajudou a entender melhor o conceito de orientação a objetos. Já estou começando a aplicar o que aprendi.', 3, 3),
('2024-11-20 12:05:00', 'Java é uma excelente linguagem para desenvolvedores que querem criar aplicações robustas e escaláveis. Concordo totalmente com as vantagens citadas no artigo.', 3, 4),
('2024-11-19 13:00:00', 'Estou começando a usar o Java em um novo projeto e a explicação sobre as bibliotecas e frameworks foi essencial para acelerar meu aprendizado.', 3, 5),
('2024-11-20 08:30:00', 'Linux realmente oferece uma liberdade que outros sistemas operacionais não conseguem. Sou fã da personalização que ele permite.', 4, 1),
('2024-11-19 09:50:00', 'O Linux tem uma curva de aprendizado, mas vale muito a pena. Com a ajuda da comunidade, qualquer problema é resolvido rapidamente.', 4, 2),
('2024-11-20 11:10:00', 'Uso Linux há anos e não troco por nenhum outro sistema. Ele é mais seguro e eficiente, especialmente para servidores e desenvolvimento de software.', 4, 3),
('2024-11-21 12:30:00', 'Adorei a explicação sobre a modularidade do Linux. Para quem está começando, uma distribuição como Ubuntu é perfeita!', 4, 4),
('2024-11-21 13:40:00', 'O Linux é sem dúvida o melhor sistema operacional para quem deseja mais controle sobre o computador. A comunidade é muito ativa e sempre pronta para ajudar.', 4, 5);




INSERT INTO visualizacao (dataHora, fkUsuario, fkPostagem) VALUES
('2024-11-21 09:00:00', 1, 1),
('2024-11-20 09:55:00', 2, 1),
('2024-11-20 10:50:00', 3, 1),
('2024-11-19 12:00:00', 4, 1),
('2024-11-20 13:00:00', 5, 1),
('2024-11-19 09:30:00', 1, 2),
('2024-11-24 10:40:00', 2, 2),
('2024-11-23 11:45:00', 3, 2),
('2024-11-22 12:30:00', 4, 2),
('2024-11-21 14:00:00', 5, 2),
('2024-11-20 08:40:00', 1, 3),
('2024-11-21 09:15:00', 2, 3),
('2024-11-22 10:30:00', 3, 3),
('2024-11-21 11:50:00', 4, 3),
('2024-11-20 12:30:00', 5, 3),
('2024-11-19 08:00:00', 1, 4),
('2024-11-18 09:10:00', 2, 4),
('2024-11-17 10:25:00', 3, 4),
('2024-11-23 12:00:00', 4, 4),
('2024-11-22 13:20:00', 5, 4);

INSERT INTO acesso (dataHora, fkUsuario) VALUES 
(CURRENT_TIMESTAMP, 1),
(CURRENT_TIMESTAMP, 2),
(CURRENT_TIMESTAMP, 3),
(CURRENT_TIMESTAMP, 4),
(CURRENT_TIMESTAMP, 1);


INSERT INTO curtida (dataHora, fkPostagem, fkUsuario) VALUES 
(CURRENT_TIMESTAMP, 1, 2),
(CURRENT_TIMESTAMP, 1, 3),
(CURRENT_TIMESTAMP, 2, 1),
(CURRENT_TIMESTAMP, 3, 4);







