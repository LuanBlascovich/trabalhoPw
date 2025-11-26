import { Router } from "express";
import * as repo from "../repository/aulaRepository.js";
import { getAuthentication } from "../utils/jwt.js";

const endpoints = Router();
const autenticar = getAuthentication();

// Criar aula (ADMIN ou INSTRUTOR)
endpoints.post("/aula/criar", autenticar, async (req, res) => {
  try {
    const { descricao, nivel, preco } = req.body;

    if (!descricao || !nivel || !preco) {
      return res.status(400).send({ erro: "Dados incompletos" });
    }

    const id = await repo.criarAula({
      descricao,
      nivel,
      preco,
    });

    return res.status(201).send({
      mensagem: "Aula cadastrada com sucesso",
      id_aula: id,
    });
  } catch (error) {
    console.error("Erro ao cadastrar aula:", error);
    return res.status(500).send({ erro: "Erro interno do servidor" });
  }
});

// Listar todas as aulas
endpoints.get("/aula/listar", async (req, res) => {
  try {
    const aulas = await repo.listarAulas();
    return res.send(aulas);
  } catch (error) {
    console.error("Erro ao listar aulas:", error);
    return res.status(500).send({ erro: "Erro interno do servidor" });
  }
});

export default endpoints;
