import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProdutoCarrinho } from '../../core/types/types';
import { CarrinhoService } from '../../core/services/carrinho.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-carrinho',
  standalone: true,
  imports: [RouterModule, CommonModule, HttpClientModule],
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.css'],
})
export class CarrinhoComponent implements OnInit {
  carrinho: ProdutoCarrinho[] = [];
  total: number = 0;

  constructor(
    private router: Router,
    private carrinhoService: CarrinhoService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.carregarCarrinho();
  }

  carregarCarrinho() {
    this.carrinho = this.carrinhoService.getItens();
    this.calcularTotal();
  }

  aumentar(item: ProdutoCarrinho) {
    this.carrinhoService.aumentar(item.id_produto);
    this.carregarCarrinho();
  }

  diminuir(item: ProdutoCarrinho) {
    this.carrinhoService.diminuir(item.id_produto);
    this.carregarCarrinho();
  }

  remover(item: ProdutoCarrinho) {
    this.carrinhoService.remover(item.id_produto);
    this.carregarCarrinho();
  }

  calcularTotal() {
    this.total = this.carrinho.reduce(
      (acc, item) => acc + item.preco * item.quantidade,
      0
    );
  }

  finalizarCompra() {
    if (this.carrinho.length === 0) {
      alert('O carrinho está vazio!');
      return;
    }

    const payload = {
      itens: this.carrinho.map((p) => ({
        id_produto: p.id_produto!,
        preco: p.preco,
        quantidade: p.quantidade,
      })),
    };

    const token = localStorage.getItem('token');

    if (!token) {
      alert('Você precisa estar logado para finalizar a compra!');
      return;
    }

    console.log('Payload enviado:', payload);

    this.http
      .post(this.carrinhoService.API, payload, {
        headers: { 'x-access-token': token },
      })
      .subscribe({
        next: () => {
          this.carrinhoService.limpar();
          this.carregarCarrinho();
          this.router.navigate(['/compra-confirmacao']);
        },
        error: (err) => {
          console.error(err);
          alert('Não foi possível finalizar a compra.');
        },
      });
  }
}
