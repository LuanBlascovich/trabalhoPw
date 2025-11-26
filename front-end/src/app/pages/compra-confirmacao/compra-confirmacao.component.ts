import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { VendasService } from '../../core/services/vendas.service';
import { Pedido } from '../../core/types/types';

@Component({
  selector: 'app-compra-confirmacao',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './compra-confirmacao.component.html',
  styleUrls: ['./compra-confirmacao.component.css'],
})
export class CompraConfirmacaoComponent implements OnInit {
  pedido: Pedido | null = null;
  token: string | null = '';

  constructor(private vendasService: VendasService, private router: Router) {}

  ngOnInit(): void {
    this.token = localStorage.getItem('token');

    if (!this.token) {
      alert('Você precisa estar logado para acessar esta página');
      this.router.navigate(['/login']);
      return;
    }

    this.carregarUltimaVenda();
  }

  carregarUltimaVenda(): void {
    if (!this.token) return;

    this.vendasService.pegarUltimaVenda(this.token).subscribe({
      next: (venda: any) => {
        if (venda) {
          this.pedido = {
            id_venda: venda.id_venda,
            data: venda.data_hora,
            total: venda.total,
            cliente_id: venda.cliente_id,
            cliente_nome: venda.cliente_nome,
          };
        } else {
          alert('Nenhuma venda encontrada.');
        }
      },
      error: (err) => {
        console.error('Erro ao carregar a última venda:', err);
        alert('Erro ao carregar a última venda. Tente novamente mais tarde.');
      },
    });
  }
}
