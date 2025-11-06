import { connection } from "./connection.js";

export async function verificarUsuarioCadastrado(usuario) {
    const comando = `SELECT id_usuario FROM usuario WHERE LOWER(email) = LOWER(?)`;
    const [info] = await connection.query(comando, [usuario.email]);
    return info.length > 0;
}

export async function cadastrar(usuario) {
    const comando = `INSERT INTO usuario(nome, sobrenome, email, senha, tipo) VALUES (?, ?, ?, MD5(?), "cliente")`;
    const [info] = await connection.query(comando, [usuario.nome, usuario.sobrenome, usuario.email, usuario.senha]);
    return info.insertId ? true : false;
}

export async function fazerLogin(login) {
    const comando =
        `SELECT id_usuario, nome, sobrenome, email, tipo FROM usuario 
        WHERE email = ? AND senha = MD5(?)`;
    const [info] = await connection.query(comando,
        [login.email, login.senha])
    return info[0];
}

export async function listar() {
    const comando =
        `SELECT id_usuario, nome, sobrenome, email, data_criacao 
        FROM usuario WHERE tipo = 'cliente'`;
    const [info] = await connection.query(comando);
    return info;
}