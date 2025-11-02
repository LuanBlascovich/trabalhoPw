import { Router } from 'express';
import { generateToken } from '../utils/jwt.js';
import * as repo from '../repository/usuarioRepository.js';

const endpoints = Router();

endpoints.post('/usuario/cadastrar', async (req, resp) => {
    try {
        const usuario = req.body;
        if (!usuario.nome || !usuario.email || !usuario.sobrenome || !usuario.senha) {
            return resp.status(400).send({ erro: "Preencha todos os campos obrigatórios" });
        }
        const verificacao = await repo.verificarUsuarioCadastrado(usuario);
        if (verificacao) {
            return resp.status(400).send({ erro: "Usuário já cadastrado" });
        }
        const cadastro = await repo.cadastrar(usuario);
        if (!cadastro) {
            return resp.status(500).send({ erro: "Erro ao tentar cadastrar o usuário" });
        }
        return resp.status(201).send({ mensagem: "Usuário cadastrado com sucesso" });
    } catch (error) {
        console.error("Erro no endpoint /usuario/cadastrar:", error);
        return resp.status(500).send({ erro: "Erro interno do servidor" });
    }
});

endpoints.post("/usuario/login", async (req, resp) => {
    try {
        const login = req.body;
        if (!login.email || !login.senha) {
            return resp.status(400).send({ erro: "Preencha e-mail e senha" });
        }
        const credenciais = await repo.fazerLogin(login);
        if (!credenciais) {
            return resp.status(401).send({ erro: "E-mail ou senha inválidos" });
        }
        const token = await generateToken(credenciais);
        return resp.send({ token: token });
    } catch (error) {
        console.error("Erro no endpoint /usuario/login:", error);
        return resp.status(500).send({ erro: "Erro interno do servidor" });
    }
});

export default endpoints;
