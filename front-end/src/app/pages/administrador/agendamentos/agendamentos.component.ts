import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AgendamentoService } from '../../../core/services/agendamento.service';

@Component({
  selector: 'app-agendamentos',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './agendamentos.component.html',
  styleUrl: './agendamentos.component.css'
})
export class AgendamentosComponent implements OnInit {
  agendamentos: any[] = [];
  agendamentoSelecionado: any = null;
  token: string | null = '';

  constructor(private agendamentoService: AgendamentoService) {}

  ngOnInit(): void {
    this.token = localStorage.getItem('token');

    if (!this.token) {
      alert('Você precisa estar logado para acessar esta página');
      return;
    }

    this.carregarAgendamentos();
  }

  carregarAgendamentos(): void {
    this.agendamentoService.listarAgendamentos().subscribe({
      next: (dados) => {
        this.agendamentos = dados.map((ag) => ({
          ...ag,
          nivel: ag.nivel,
          total: this.agendamentoService.calcularPreco(ag.nivel),
        }));
      },
      error: (err) => {
        console.error('Erro ao carregar agendamentos:', err);
        alert('Erro ao carregar agendamentos. Tente novamente mais tarde.');
      },
    });
  }

  verComprovante(ag: any): void {
    this.agendamentoSelecionado =
      this.agendamentoSelecionado === ag ? null : ag;
  }

  
cancelarAgendamento(agendamento: any) {
  if (confirm('Tem certeza que deseja cancelar este agendamento?')) {
    this.agendamentoService.cancelarAgendamento(agendamento.id_agendamento).subscribe({
      next: (res) => {
        // Atualiza status localmente
        agendamento.status_agendamento = 'Cancelado';
        alert(res.mensagem); // Mensagem vinda da API
      },
      error: (err) => {
        console.error(err);
        alert('Erro ao cancelar agendamento. Tente novamente.');
      }
    });
  }
}

}
