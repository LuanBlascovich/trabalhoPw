import express from 'express'
import { teste } from './repository/testeRepository.js'

export function adicionarRotas(api) {
  api.use(teste)
  api.use('/public/storage', express.static('public/storage'));
}


