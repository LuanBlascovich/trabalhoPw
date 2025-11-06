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

export async function excluir(id) {
    const comando = `DELETE FROM produto WHERE id_produto = ?`;
    const [info] = await connection.query(comando, [id]);
    return info.affectedRows > 0 ? true : false;
}

export async function editar(id, produto, imagem) {
    let comando;
    let parametros;

    if (imagem) {
        comando = `
            UPDATE produto
            SET nome = ?, descricao = ?, preco = ?, imagem = ?
            WHERE id_produto = ?
        `;
        parametros = [produto.nome, produto.descricao, produto.preco, imagem, id];
    } else {
        comando = `
            UPDATE produto
            SET nome = ?, descricao = ?, preco = ?
            WHERE id_produto = ?
        `;
        parametros = [produto.nome, produto.descricao, produto.preco, id];
    }
    const [info] = await connection.query(comando, parametros);
    return info.affectedRows > 0;
}

export async function buscarPorId(id) {
    const comando = `
        SELECT id_produto, nome, descricao, preco, imagem
        FROM produto
        WHERE id_produto = ?
    `;
    const [info] = await connection.query(comando, [id]);
    return info.length > 0 ? info[0] : null;
}