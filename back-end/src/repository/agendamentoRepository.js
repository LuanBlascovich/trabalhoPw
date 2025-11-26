import { connection } from "./connection.js";

export async function criarAgendamento(agendamento) {
  const { aula_id, cliente_id, instrutor_id, nome_completo, data_hora } = agendamento;

  const comando = `
    INSERT INTO agendamento (aula_id, cliente_id, instrutor_id, nome_completo, data_hora, status_agendamento)
    VALUES (?, ?, ?, ?, ?, 'confirmado')
  `;

  const [result] = await connection.query(comando, [
    aula_id,
    cliente_id,
    instrutor_id,
    nome_completo,
    data_hora
  ]);

  return result.insertId;
}

export async function listarAgendamentosPorCliente(clienteId) {
  const comando = `
    SELECT id_agendamento, aula_id, cliente_id, instrutor_id, nome_completo, data_hora, status_agendamento
    FROM agendamento
    WHERE cliente_id = ?
    ORDER BY data_hora DESC
  `;
  const [linhas] = await connection.query(comando, [clienteId]);
  return linhas;
}

export async function listarTodosAgendamentos() {
  const comando = `
    SELECT id_agendamento, aula_id, cliente_id, instrutor_id, nome_completo, data_hora, status_agendamento
    FROM agendamento
    ORDER BY data_hora DESC
  `;
  const [linhas] = await connection.query(comando);
  return linhas;
}

export async function cancelarAgendamento(idAgendamento) {
  const comando = `
    UPDATE agendamento
    SET status_agendamento = 'cancelado'
    WHERE id_agendamento = ?
  `;
  const [info] = await connection.query(comando, [idAgendamento]);
  return info.affectedRows > 0;
}

export async function excluirAgendamento(idAgendamento) {
  const comando = `
    DELETE FROM agendamento
    WHERE id_agendamento = ?
  `;
  const [info] = await connection.query(comando, [idAgendamento]);
  return info.affectedRows > 0;
}
