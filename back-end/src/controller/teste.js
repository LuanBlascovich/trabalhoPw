import { Router } from 'express';
import { getAuthentication } from '../utils/jwt.js';

import * as Repo from '../repository/testeRepository.js';

const endpoints = Router();
const autenticador = getAuthentication();


export default endpoints;