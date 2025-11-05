import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProdutoCarrinho } from '../../core/types/types';
import { CompraConfirmacaoComponent } from '../compra-confirmacao/compra-confirmacao.component';

@Component({
  selector: 'app-carrinho',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.css'], // corrigi aqui
})
export class CarrinhoComponent {
  constructor(private router: Router) {}

  produtos: ProdutoCarrinho[] = [
    {
      id: 1,
      nome: 'Prancha Surf',
      cor: 'Vermelha',
      preco: 1500,
      quantidade: 1,
      imagem: 'prancha.jpg',
    },
    {
      id: 2,
      nome: 'Roupão de Surf',
      cor: 'Preto',
      preco: 350,
      quantidade: 2,
      imagem: 'roupao.jpg',
    },
  ];

  calcularSubtotal(): number {
    return this.produtos.reduce(
      (acc, prod) => acc + prod.preco * (prod.quantidade ?? 1),
      0
    );
  }

  calcularTotal(): number {
    const envio = this.produtos.length > 0 ? 20 : 0;
    return this.calcularSubtotal() + envio;
  }

  removerProduto(index: number) {
    this.produtos.splice(index, 1);
  }

  aumentarQuantidade(prod: ProdutoCarrinho) {
    if (!prod.quantidade) prod.quantidade = 1;
    prod.quantidade++;
  }

  diminuirQuantidade(prod: ProdutoCarrinho) {
    if (prod.quantidade && prod.quantidade > 1) prod.quantidade--;
  }

  finalizarCompra() {
    this.router.navigate(['/compra-confirmacao']);
  }
}
