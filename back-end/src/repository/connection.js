import mysql from 'mysql2/promise';

const connection = await mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PWD,
    database: process.env.MYSQL_DB
});

const azul = "\u001b[38;5;27m";
const reset = "\u001b[0m";

console.log(`${azul}..: Conexão estabelecida com sucesso :..${reset}`);

export {connection}