import * as repo from "../repository/vendasRespository.js";
import { getAuthentication } from '../utils/jwt.js';
import { Router } from "express";

const autenticar = getAuthentication();
const endpoints = Router();

endpoints.get("/vendas", autenticar, async (req, resp) => {
    try {
        const vendas = await repo.listarVendas();
        if (!vendas || vendas.length === 0) {
            return resp.status(404).json({ erro: "Nenhuma venda encontrada" });
        }
        return resp.status(200).json(vendas);
    } catch (err) {
        console.error(err);
        return resp.status(500).json({ erro: "Erro ao listar vendas" });
    }
});

endpoints.post("/vendas", autenticar, async (req, resp) => {
    try {
        const cliente_id = req.user.id_usuario;
        const produtos = req.body.itens;
        if (!produtos || produtos.length === 0) {
            return resp.status(400).json({ erro: "Carrinho vazio" });
        }
        for (let i = 0; i < produtos.length; i++) {
            if (!produtos[i].id_produto || !produtos[i].quantidade || produtos[i].quantidade <= 0) {
                return resp.status(400).json({ erro: "Produto inválido no carrinho" });
            }
        }
        const novoId = await repo.registrarVenda(cliente_id, produtos);
        return resp.status(201).json({ id_venda: novoId });
    } catch (err) {
        console.error(err);
        return resp.status(500).json({ erro: "Não foi possível realizar a compra" });
    }
});

export default endpoints;
