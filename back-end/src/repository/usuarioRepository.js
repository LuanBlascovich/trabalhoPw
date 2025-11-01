import { connection } from "./connection.js";

export async function verificarUsuarioCadastrado(usuario) {
    const comando = `SELECT id_usuario FROM usuario WHERE LOWER(email) = LOWER(?)`;
    const [info] = await connection.query(comando, [usuario.email]);
    return info.length > 0;
}

export async function cadastrar(usuario) {
    const comando = `INSERT INTO usuario(nome, email, senha, funcao) VALUES (?, ?, MD5(?), ?)`;
    const [info] = await connection.query(comando, [usuario.nome, usuario.email, usuario.senha, usuario.funcao]);
    return info.insertId ? true : false;
}