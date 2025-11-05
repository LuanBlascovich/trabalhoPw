import { connection } from "./connection.js";

export async function listarProdutos() {
    const comando = `SELECT id_produto, nome, descricao, preco, imagem FROM produto`;
    const [info] = await connection.query(comando);
    return info;
}

export async function adicionarProduto(produto, imagem) {
    const comando = `INSERT INTO produto(nome, descricao, preco, imagem) 
    VALUES (?, ?, ?, ?)`;
    const [info] = await connection.query(comando,
        [produto.nome, produto.descricao, produto.preco, imagem]);
    return info.insertId ? true : false;
}

export async function removerProduto(id) {
    const comando = `DELETE FROM produto WHERE id_produto = ?`;
    const [info] = await connection.query(comando, [id]);
    return info.affectedRows > 0 ? true : false;
}

export async function editarProduto(id, produto, imagem) {
    const comando =
        `UPDATE produto 
     SET nome = ?, descricao = ?, preco = ?, imagem = ?
     WHERE id_produto = ?`;
    const [info] = await connection.query(comando,
        [produto.nome, produto.descricao, produto.preco, imagem, id]);
    return info.affectedRows > 0 ? true : false;
}