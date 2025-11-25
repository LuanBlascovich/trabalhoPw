import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProdutoService } from '../../core/services/produto.service';
import { CarrinhoService } from '../../core/services/carrinho.service';
import { Produto } from '../../core/types/types';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-produtos',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css'],
})
export class ProdutosComponent implements OnInit {
  produtos: Produto[] = [];

  constructor(
    private produtoService: ProdutoService,
    private carrinhoService: CarrinhoService
  ) {}

  ngOnInit(): void {
    this.listarProdutos();
  }

  listarProdutos(): void {
    this.produtoService.listar().subscribe({
      next: (produtos) => {
        this.produtos = produtos;
      },
      error: (erro) => {
        console.error('Erro ao listar produtos:', erro);
      },
    });
  }

  adicionarAoCarrinho(produto: Produto) {
    this.carrinhoService.adicionar(produto);
    alert(`${produto.nome} foi adicionado ao carrinho!`);
  }
}
