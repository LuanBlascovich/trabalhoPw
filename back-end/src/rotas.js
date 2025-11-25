import express from 'express';
import usuarioController from './controller/usuarioController.js';
import produtoController from './controller/produtoController.js';
import vendasController from './controller/vendasController.js';

export function adicionarRotas(api) {
  api.use(usuarioController);
  api.use(produtoController);
  api.use(vendasController);
  api.use('/public/storage', express.static('public/storage'));
}
