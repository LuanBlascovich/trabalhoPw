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

endpoints.get('/produto/listar', async (req, resp) => {
    const produtos = await repo.listarProdutos();
    resp.send(produtos);
});

export default endpoints;
