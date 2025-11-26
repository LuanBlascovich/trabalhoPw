import { connection } from "./connection.js";

export async function criarAula(aula) {
  const { descricao, nivel, preco, instrutor_id } = aula;

  const comando = `
    INSERT INTO aula (descricao, nivel, preco, instrutor_id)
    VALUES (?, ?, ?, ?)
  `;

  const [result] = await connection.query(comando, [
    descricao,
    nivel,
    preco,
    instrutor_id,
  ]);

  return result.insertId;
}
export async function listarAulasPorNivel(nivel) {
  const comando = `
  SELECT id_aula, 
         descricao, 
         preco 
    FROM aula 
   WHERE nivel = ?
  `;
  const [linhas] = await connection.query(comando, [nivel]);
  return linhas;
}

export async function listarAulas() {
  const comando = `
    SELECT id_aula, descricao, nivel, preco, instrutor_id
    FROM aula
    ORDER BY id_aula DESC
  `;

  const [linhas] = await connection.query(comando);
  return linhas;
}
