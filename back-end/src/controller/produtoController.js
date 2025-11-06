import { Router } from 'express';
import multer from 'multer';
import { getAuthentication } from '../utils/jwt.js';
import * as repo from '../repository/produtoRepository.js';

const input = multer({ dest: "./public/storage" });
const endpoints = Router();
const autenticar = getAuthentication();

endpoints.post('/produto/adicionar', autenticar, input.single("imagem"), async (req, resp) => {
    try {
        const usuarioLogado = req.user;
        if (usuarioLogado.tipo !== "administrador") {
            return resp.status(401).send({ erro: "Você não possui permissão para realizar essa ação" });
        }
        const produto = req.body;
        const imagem = req.file?.path;
        if (!produto.nome || !produto.preco || !produto.descricao || !imagem) {
            return resp.status(400).send({ erro: "Dados incompletos" });
        }
        const cadastrado = await repo.adicionarProduto(produto, imagem);
        if (!cadastrado) {
            return resp.status(400).send({ erro: "Erro ao tentar adicionar produto" });
        }
        return resp.status(201).send({ mensagem: "Produto adicionado com sucesso" });
    } catch (error) {
        console.error("Erro ao adicionar produto:", error);
        return resp.status(500).send({ erro: "Erro interno do servidor" });
    }
});

endpoints.put('/produto/editar/:id', autenticar, input.single("imagem"), async (req, resp) => {
    try {
        const usuarioLogado = req.user;
        if (usuarioLogado.tipo !== "administrador") {
            return resp.status(401).send({ erro: "Você não possui permissão para realizar essa ação" });
        }
        const id_produto = req.params.id;
        const produto = req.body;
        const imagem = req.file?.path;
        const sucesso = await repo.editar(id_produto, produto, imagem);
        if (!sucesso) {
            return resp.status(400).send({ erro: "Não foi possível editar esse produto" });
        }
        return resp.send({ mensagem: "Produto editado com sucesso" });
    } catch (error) {
        console.error("Erro ao editar produto:", error);
        return resp.status(500).send({ erro: "Erro interno do servidor" });
    }
});


endpoints.get('/produto/listar', async (req, resp) => {
    const produtos = await repo.listarProdutos();
    resp.send(produtos);
});

endpoints.get('/produto/buscar/:id', async (req, resp) => {
    try {
        const id_produto = req.params.id;
        const produto = await repo.buscarPorId(id_produto);
        if (!produto) {
            return resp.status(404).send({ erro: "Produto não encontrado" });
        }
        resp.send(produto);
    } catch (error) {
        console.error("Erro ao buscar produto:", error);
        resp.status(500).send({ erro: "Erro interno do servidor" });
    }
});

endpoints.delete('/produto/excluir/:id', autenticar, async (req, resp) => {
    try {
        const usuarioLogado = req.user;
        if (usuarioLogado.tipo !== "administrador") {
            return resp.status(401).send({ erro: "Você não possui permissão para realizar essa ação" });
        }
        const id_produto = req.params.id;
        const sucesso = await repo.excluir(id_produto);
        if (!sucesso) {
            return resp.status(400).send({ erro: "Erro ao excluir o produto" });
        }
        return resp.status(200).send({ mensagem: "Produto removido com sucesso" });
    } catch (error) {
        console.error("Erro ao excluir produto:", error);
        resp.status(500).send({ erro: "Erro interno do servidor" });
    }
});

export default endpoints;
