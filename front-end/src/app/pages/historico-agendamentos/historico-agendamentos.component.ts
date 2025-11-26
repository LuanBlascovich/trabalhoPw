// historico-agendamentos.component.ts
import { Component, OnInit } from '@angular/core';
import { AgendamentoService } from '../../core/services/agendamento.service';
import { Agendamento } from '../../core/types/types';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';  // Add Router

@Component({
  selector: 'app-historico-agendamentos',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './historico-agendamentos.component.html',
  styleUrls: ['./historico-agendamentos.component.css']
})
export class HistoricoAgendamentosComponent implements OnInit {
  agendamentos: Agendamento[] = [];
  agendamentoSelecionado: Agendamento | null = null;

  constructor(private agendamentoService: AgendamentoService, private router: Router) {}  // Inject Router

  ngOnInit(): void {
    this.agendamentoService.listarAgendamentos().subscribe({
      next: (dados) => this.agendamentos = dados,
      error: (err) => {
        console.error('Erro ao carregar agendamentos', err);
        if (err.status === 401) {
          // Redirect to login on unauthorized
          this.router.navigate(['/login']);  // Adjust route as needed
        }
      }
    });
  }

  verComprovante(agendamento: Agendamento) {
    this.agendamentoSelecionado =
      this.agendamentoSelecionado === agendamento ? null : agendamento;
  }
}