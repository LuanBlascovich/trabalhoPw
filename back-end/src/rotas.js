import express from 'express';
import usuarioController from './controller/usuarioController.js';

export function adicionarRotas(api) {
  api.use(usuarioController);
  api.use('/public/storage', express.static('public/storage'));
}
