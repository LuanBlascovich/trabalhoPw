import { Router } from "express";
import * as repo from "../repository/agendamentoRepository.js";
import * as aulaRepo from "../repository/aulaRepository.js"; // para buscar a aula

import { getAuthentication } from "../utils/jwt.js";

const endpoints = Router();
const autenticar = getAuthentication();


endpoints.post("/agendamento/criar", async (req, res) => {
  try {
    const { cliente_id, instrutor_id, nome_completo, data_hora, nivel } = req.body;

    if (!cliente_id || !instrutor_id || !nome_completo || !data_hora || !nivel) {
      return res.status(400).send({ erro: "Campos obrigatórios faltando" });
    }

    let preco;
    switch (nivel) {
      case 'iniciante':
        preco = 160;
        break;
      case 'intermediario':
        preco = 180;
        break;
      case 'avancado':
        preco = 200;
        break;
      default:
        return res.status(400).send({ erro: "Nível inválido" });
    }

    // 🔹 Criar aula automaticamente
    const descricao = `Aula de ${nivel} agendada por ${nome_completo}`;
    const aula_id = await aulaRepo.criarAula({ descricao, nivel, preco, instrutor_id });

    // 🔹 Criar agendamento
    const agendamento_id = await repo.criarAgendamento({
      aula_id,
      cliente_id,
      instrutor_id,
      nome_completo,
      data_hora
    });

    return res.status(201).send({
      mensagem: "Agendamento criado com sucesso",
      id_agendamento: agendamento_id,
      aula_id
    });
  } catch (error) {
    console.error("Erro ao criar agendamento:", error);
    return res.status(500).send({ erro: "Erro interno do servidor" });
  }
});

// Listar agendamentos (cliente ou admin)
endpoints.get("/agendamento/listar", autenticar, async (req, res) => {
  try {
    const usuario = req.user;
    let resultado;

    // Admin vê todos os agendamentos
    if (usuario.tipo === "administrador") {
      resultado = await repo.listarTodosAgendamentos();
    } else {
      resultado = await repo.listarAgendamentosPorCliente(usuario.id_usuario);
    }

    return res.send(resultado);
  } catch (error) {
    console.error("Erro ao listar agendamentos:", error);
    return res.status(500).send({ erro: "Erro interno do servidor" });
  }
});


// Cancelar agendamento
endpoints.put("/agendamento/cancelar/:id", autenticar, async (req, res) => {
  try {
    const sucesso = await repo.cancelarAgendamento(req.params.id);

    if (!sucesso) return res.status(400).send({ erro: "Não foi possível cancelar" });

    return res.send({ mensagem: "Agendamento cancelado com sucesso" });
  } catch (error) {
    console.error("Erro ao cancelar agendamento:", error);
    return res.status(500).send({ erro: "Erro interno do servidor" });
  }
});

// Excluir agendamento (somente admin)
endpoints.delete("/agendamento/excluir/:id", autenticar, async (req, res) => {
  try {
    if (req.user.tipo !== "administrador") {
      return res.status(403).send({ erro: "Apenas admin pode excluir" });
    }

    const sucesso = await repo.excluirAgendamento(req.params.id);

    if (!sucesso) return res.status(400).send({ erro: "Não foi possível excluir" });

    return res.send({ mensagem: "Agendamento excluído com sucesso" });
  } catch (error) {
    console.error("Erro ao excluir agendamento:", error);
    return res.status(500).send({ erro: "Erro interno do servidor" });
  }
});

export default endpoints;