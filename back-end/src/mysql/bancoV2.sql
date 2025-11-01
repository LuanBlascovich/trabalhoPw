/* Schema v2 */

CREATE DATABASE swell;
USE swell;

CREATE TABLE administrador (
    id_admin INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(200) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    data_criacao DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE usuario (
    id_usuario INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(200) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    funcao ENUM('instrutor','cliente') NOT NULL,
    data_criacao DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE produto (
    id_produto INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(200) NOT NULL,
    descricao VARCHAR(500),
    preco DECIMAL(10,2) NOT NULL,
    imagem VARCHAR(300)
);

CREATE TABLE aula (
    id_aula INT PRIMARY KEY AUTO_INCREMENT,
    descricao VARCHAR(500),
    nivel ENUM('iniciante','intermediario','avancado'),
    preco DECIMAL(10,2) NOT NULL,
    instrutor_id INT,
    FOREIGN KEY (instrutor_id) REFERENCES usuario(id_usuario) ON DELETE RESTRICT
);

CREATE TABLE venda (
    id_venda INT PRIMARY KEY AUTO_INCREMENT,
    cliente_id INT,
    total DECIMAL(10,2) NOT NULL,
    data_hora DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (cliente_id) REFERENCES usuario(id_usuario) ON DELETE CASCADE
);

CREATE TABLE venda_produto (
    id_venda_produto INT PRIMARY KEY AUTO_INCREMENT,
    venda_id INT,
    produto_id INT,
    preco_unitario DECIMAL(10,2) NOT NULL,
    qtd INT NOT NULL,
    FOREIGN KEY (venda_id) REFERENCES venda(id_venda) ON DELETE RESTRICT,
    FOREIGN KEY (produto_id) REFERENCES produto(id_produto) ON DELETE CASCADE
);

CREATE TABLE agendamento (
    id_agendamento INT PRIMARY KEY AUTO_INCREMENT,
    aula_id INT,
    cliente_id INT,
    data_hora DATETIME,
    status_agendamento ENUM('realizado','confirmado','cancelado'),
    FOREIGN KEY (aula_id) REFERENCES aula(id_aula) ON DELETE CASCADE,
    FOREIGN KEY (cliente_id) REFERENCES usuario(id_usuario) ON DELETE CASCADE
);