import { Component, OnInit } from '@angular/core';
import { VendasService } from '../../../core/services/vendas.service';
import { Pedido } from '../../../core/types/types';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-listar-pedidos',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './listar-pedidos.component.html',
  styleUrls: ['./listar-pedidos.component.css'],
})
export class ListarPedidosComponent implements OnInit {
  vendas: Pedido[] = [];

  constructor(private vendasService: VendasService) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (!token) return alert('Você precisa estar logado para ver os pedidos!');
    this.vendasService.listarVendas(token).subscribe({
      next: (dados) =>
        (this.vendas = dados.map((v) => ({
          id_venda: v.id_venda,
          cliente_id: (v as any).cliente_id,
          cliente_nome: (v as any).nome,
          total: v.total,
          data: (v as any).data_hora || v.data,
        }))),
      error: () => alert('Não foi possível carregar os pedidos.'),
    });
  }
}
