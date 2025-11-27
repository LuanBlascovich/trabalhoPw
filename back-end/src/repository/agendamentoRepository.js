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
    SELECT 
      a.id_agendamento,
      a.data_hora,
      a.status_agendamento,
      au.nivel AS nivel_aula,
      au.descricao AS descricao_aula,
      cli.nome AS nome_cliente,
      cli.sobrenome AS sobrenome_cliente,
      ins.nome AS nome_instrutor,
      ins.sobrenome AS sobrenome_instrutor
    FROM agendamento a
    LEFT JOIN aula au ON a.aula_id = au.id_aula
    LEFT JOIN usuario cli ON a.cliente_id = cli.id_usuario
    LEFT JOIN usuario ins ON a.instrutor_id = ins.id_usuario
    ORDER BY a.data_hora DESC
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

export async function listarAgendamentosDoInstrutor(instrutorId) {
  const comando = `
    SELECT 
      a.id_agendamento,
      a.data_hora,
      a.status_agendamento,
      au.nivel AS nivel_aula,
      au.descricao AS descricao_aula,
      cli.nome AS nome_cliente,
      cli.sobrenome AS sobrenome_cliente,
      ins.nome AS nome_instrutor,
      ins.sobrenome AS sobrenome_instrutor
    FROM agendamento a
    LEFT JOIN aula au ON a.aula_id = au.id_aula
    LEFT JOIN usuario cli ON a.cliente_id = cli.id_usuario
    LEFT JOIN usuario ins ON a.instrutor_id = ins.id_usuario
    WHERE a.instrutor_id = ?
    ORDER BY a.data_hora DESC
  `;

  const [linhas] = await connection.query(comando, [instrutorId]);
  return linhas;
}
