-- Tabela de Usuários (para gerenciar quem pode criar/editar eventos)
CREATE TABLE Usuarios (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Eventos
CREATE TABLE Eventos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL,
    descricao TEXT,
    data_inicio DATETIME NOT NULL,
    data_fim DATETIME,
    local VARCHAR(255) NOT NULL,
    endereco VARCHAR(255),
    capacidade INT,
    organizador_id INT,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (organizador_id) REFERENCES Usuarios(id)
);

-- Tabela de Categorias de Eventos (opcional, para classificar eventos)
CREATE TABLE Categorias (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) UNIQUE NOT NULL
);

-- Tabela de Eventos e Categorias (para permitir que um evento tenha várias categorias)
CREATE TABLE Evento_Categoria (
    evento_id INT,
    categoria_id INT,
    PRIMARY KEY (evento_id, categoria_id),
    FOREIGN KEY (evento_id) REFERENCES Eventos(id) ON DELETE CASCADE,
    FOREIGN KEY (categoria_id) REFERENCES Categorias(id) ON DELETE CASCADE
);

-- Tabela de Participantes (se você quiser gerenciar inscrições)
CREATE TABLE Participantes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    telefone VARCHAR(20),
    data_inscricao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Inscrições (relacionando participantes a eventos)
CREATE TABLE Inscricoes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    evento_id INT NOT NULL,
    participante_id INT NOT NULL,
    data_inscricao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (evento_id) REFERENCES Eventos(id) ON DELETE CASCADE,
    FOREIGN KEY (participante_id) REFERENCES Participantes(id) ON DELETE CASCADE,
    UNIQUE KEY (evento_id, participante_id) -- Impede a mesma pessoa de se inscrever no mesmo evento várias vezes
);
