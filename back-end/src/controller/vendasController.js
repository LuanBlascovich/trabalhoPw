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
        console.error("Erro ao listar vendas:", err);
        return resp.status(500).json({ erro: "Erro ao listar vendas, tente novamente mais tarde." });
    }
});

endpoints.get("/vendas/confirmacao", autenticar, async (req, resp) => {
    try {
        const id_usuario = req.user.id_usuario;
        if (!id_usuario) {
            return resp.status(400).json({ erro: "Usuário não encontrado ou não autenticado." });
        }

        const ultimaCompra = await repo.pegarUltimaCompra(id_usuario);
        if (!ultimaCompra) {
            return resp.status(404).json({ erro: "Nenhuma compra realizada encontrada." });
        }
        return resp.status(200).send(ultimaCompra);
    } catch (err) {
        console.error("Erro ao pegar a última compra:", err);
        return resp.status(500).json({ erro: "Erro ao tentar recuperar a última compra, tente novamente mais tarde." });
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
        if (!novoId) {
            return resp.status(500).json({ erro: "Erro ao registrar a venda. Tente novamente." });
        }

        return resp.status(201).json({ id_venda: novoId });
    } catch (err) {
        console.error("Erro ao registrar a venda:", err);
        return resp.status(500).json({ erro: "Não foi possível realizar a compra. Tente novamente mais tarde." });
    }
});

export default endpoints;
