import { Injectable } from '@angular/core';
import { Produto, ProdutoCarrinho } from '../types/types';

@Injectable({
  providedIn: 'root',
})
export class CarrinhoService {
  private carrinho: ProdutoCarrinho[] = [];
  private readonly LOCAL_STORAGE_KEY = 'carrinho';
  public readonly API = 'http://localhost:5010/vendas';

  constructor() {
    const salvo = localStorage.getItem(this.LOCAL_STORAGE_KEY);
    if (salvo) {
      this.carrinho = JSON.parse(salvo);
    }
  }

  private salvar() {
    localStorage.setItem(this.LOCAL_STORAGE_KEY, JSON.stringify(this.carrinho));
  }

  getItens(): ProdutoCarrinho[] {
    return [...this.carrinho];
  }

  adicionar(produto: Produto) {
    const itemExistente = this.carrinho.find(
      (p) => p.id_produto === produto.id_produto
    );

    if (itemExistente) {
      itemExistente.quantidade++;
    } else {
      this.carrinho.push({
        id_produto: produto.id_produto!,
        nome: produto.nome,
        descricao: produto.descricao,
        preco: produto.preco,
        imagem: produto.imagem,
        quantidade: 1,
      });
    }

    this.salvar();
  }

  remover(id_produto: number) {
    this.carrinho = this.carrinho.filter((p) => p.id_produto !== id_produto);
    this.salvar();
  }

  aumentar(id_produto: number) {
    const item = this.carrinho.find((p) => p.id_produto === id_produto);
    if (item) {
      item.quantidade++;
      this.salvar();
    }
  }

  diminuir(id_produto: number) {
    const item = this.carrinho.find((p) => p.id_produto === id_produto);
    if (item && item.quantidade > 1) {
      item.quantidade--;
      this.salvar();
    }
  }

  limpar() {
    this.carrinho = [];
    this.salvar();
  }
}
