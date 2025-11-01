import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';



@Component({
  selector: 'app-confirmacao',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './confirmacao.component.html',
  styleUrl: './confirmacao.component.css',
})
export class ConfirmacaoComponent implements OnInit {
  dadosAgendamento = {
    nivel: 'Iniciante',
    data: 'Outubro 8, 2025 09:30',
    total: 'R$160,00',
    metodoPagamento: 'Cartão de crédito',
  };

  constructor(private router: Router) {}

  ngOnInit() {}

  voltarParaInicio() {
    this.router.navigate(['/agendamento']);
  }
}
