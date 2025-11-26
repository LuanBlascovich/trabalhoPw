import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Pedido } from '../../core/types/types';

@Component({
  selector: 'app-compra-confirmacao',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './compra-confirmacao.component.html',
  styleUrl: './compra-confirmacao.component.css',
})
export class CompraConfirmacaoComponent implements OnInit {
  /*
  pedido: Pedido = {
    codigo: '#0123_45678',
    data: new Date(2025, 9, 19), // Outubro (lembrando: meses começam em 0)
    total: 3110,
    pagamento: 'Cartão de crédito'
  };
*/
  ngOnInit() {
    // No futuro, esses dados podem vir do backend ou do localStorage
  }
}
