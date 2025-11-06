import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProdutoService } from '../../../core/services/produto.service';
import { Produto } from '../../../core/types/types';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-listar-produtos',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './listar-produtos.component.html',
  styleUrls: ['./listar-produtos.component.css'],
})
export class ListarProdutosComponent implements OnInit {
  produtos: Produto[] = [];

  constructor(private produtoService: ProdutoService) {}

  ngOnInit(): void {
    this.carregarProdutos();
  }

  private carregarProdutos(): void {
    this.produtoService.listar().subscribe({
      next: (data) => (this.produtos = data),
      error: (err) => console.error('Erro ao listar produtos:', err),
    });
  }

  excluirProduto(id?: number) {
    if (!id) return;
    if (!confirm('Deseja realmente excluir este produto?')) return;

    this.produtoService.excluir(id).subscribe({
      next: () => {
        alert('Produto excluído com sucesso');
        this.carregarProdutos();
      },
      error: (err) => {
        console.error(err);
        alert(err.error?.erro || 'Erro ao tentar excluir o produto');
      },
    });
  }
}
