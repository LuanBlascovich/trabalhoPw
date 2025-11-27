// pages/administrador/listar-agendamentos/listar-agendamentos.component.ts
import { Component, OnInit } from '@angular/core';
import { AgendamentoService } from '../../../core/services/agendamento.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-listar-agendamentos',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './listar-agendamentos.component.html',
  styleUrls: ['./listar-agendamentos.component.css']
})
export class ListarAgendamentosComponent implements OnInit {

  agendamentos: any[] = [];

  constructor(private agendamentoService: AgendamentoService) {}

  ngOnInit(): void {
    this.carregarAgendamentos();
  }

  carregarAgendamentos(): void {
    this.agendamentoService.listarAgendamentos().subscribe({
      next: (dados) => {
        console.log('Agendamentos recebidos:', dados);
        this.agendamentos = dados;
      },
      error: (erro) => {
        console.error('Erro ao carregar agendamentos:', erro);
      }
    });
  }
}
