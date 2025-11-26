import { connection } from "./connection.js";

export async function listarVendas() {
    const comando = `SELECT id_venda, cliente_id, usuario.nome, total, data_hora 
    FROM venda INNER JOIN usuario ON venda.cliente_id = usuario.id_usuario`;
    const [info] = await connection.query(comando);
    return info;
}

export async function registrarVenda(cliente_id, produtos) {
    let total = 0;
    for (let i = 0; i < produtos.length; i++) {
        total += Number(produtos[i].preco) * Number(produtos[i].quantidade);
    }

    let comando = `INSERT INTO venda(cliente_id, total) VALUES (?, ?)`;
    const [info] = await connection.query(comando, [cliente_id, total]);

    comando = `INSERT INTO venda_produto(venda_id, produto_id, preco_unitario, qtd) VALUES (?, ?, ?, ?)`;
    for (let i = 0; i < produtos.length; i++) {
        let produto = produtos[i];
        await connection.query(comando, [info.insertId, produto.id_produto, produto.preco, produto.quantidade]);
    }
    return info.insertId;
}

export async function pegarUltimaCompra(cliente_id) {
    const comando = `
        SELECT id_venda, cliente_id, total, data_hora
        FROM venda
        WHERE cliente_id = ?
        ORDER BY data_hora DESC
        LIMIT 1;
    `;
    const [info] = await connection.query(comando, [cliente_id]);

    if (info.length > 0) {
        return info[0];
    } else {
        return null;
    }
}
