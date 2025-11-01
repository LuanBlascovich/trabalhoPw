import { connection } from "./connection.js";

export async function fazerLogin(login) {
    const comando =
        `SELECT id_usuario, nome, email, funcao 
        FROM usuario 
        WHERE email = ? AND senha = MD5(?)`;
    const [info] = await connection.query(comando,
        [login.email, login.senha])
    return info[0];
}