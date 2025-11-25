/* Schema v1*/
CREATE DATABASE swell;
USE swell;

CREATE TABLE administrador (
    id_admin INT PRIMARY KEY,
    nome VARCHAR(200) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    telefone VARCHAR(20),
    senha VARCHAR(300) NOT NULL
);

CREATE TABLE instrutor (
    id_instrutor INT PRIMARY KEY,
    nome VARCHAR(200) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    telefone VARCHAR(20),
    senha VARCHAR(300) NOT NULL
);

CREATE TABLE cliente (
    id_cli INT PRIMARY KEY,
    nome VARCHAR(200) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    telefone VARCHAR(20) /* não sei se vai usar */,
    senha VARCHAR(300) NOT NULL
);

CREATE TABLE produto (
    id_produto INT PRIMARY KEY,
    nome VARCHAR(200) NOT NULL,
    descricao VARCHAR(500) NOT NULL,
    preco DECIMAL(10,2) NOT NULL,
    imagem VARCHAR(300)
);

CREATE TABLE aula (
    id_aula INT PRIMARY KEY,
    nivel ENUM('iniciante','intermediario','avancado') NOT NULL,
    descricao VARCHAR(500) NOT NULL,
    preco DECIMAL(10,2) NOT NULL,
    fk_instrutor_id INT,
    FOREIGN KEY (fk_instrutor_id)
        REFERENCES instrutor(id_instrutor)
        ON DELETE SET NULL
);

CREATE TABLE venda (
    id_venda INT PRIMARY KEY,
    fk_cliente_id INT,
    total DECIMAL(10,2) NOT NULL,
    data_hora DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (fk_cliente_id)
        REFERENCES cliente(id_cli)
        ON DELETE SET NULL
);

CREATE TABLE venda_produto (
    id_venda_produto INT PRIMARY KEY,
    fk_produto_id INT NOT NULL,
    fk_venda_id INT NOT NULL,
    preco_unitario DECIMAL(10,2) NOT NULL,
    qtd INT NOT NULL,
    FOREIGN KEY (fk_produto_id)
        REFERENCES produto(id_produto)
        ON DELETE CASCADE,
    FOREIGN KEY (fk_venda_id)
        REFERENCES venda(id_venda)
        ON DELETE RESTRICT
);

CREATE TABLE agendamento (
    id_agendamento INT PRIMARY KEY,
    fk_aula_id INT,
    fk_cliente_id INT,
    data_hora DATETIME NOT NULL,
    status ENUM('realizado','confirmado','cancelado') NOT NULL,
    FOREIGN KEY (fk_aula_id)
        REFERENCES aula(id_aula)
        ON DELETE SET NULL,
    FOREIGN KEY (fk_cliente_id)
        REFERENCES cliente(id_cli)
        ON DELETE SET NULL
);
