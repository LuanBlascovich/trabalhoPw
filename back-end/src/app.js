import 'dotenv/config';
import express from 'express';
import cors from 'cors';

import { adicionarRotas } from './rotas.js';

const api = express();
api.use(cors());
api.use(express.json());

adicionarRotas(api);

const azul = "\u001b[38;5;27m";
const reset = "\u001b[0m";
const PORT = process.env.PORT;

api.listen(PORT, ()=> console.log (`${azul}..: API subiu com sucesso na porta ${PORT} :..${reset}`));


