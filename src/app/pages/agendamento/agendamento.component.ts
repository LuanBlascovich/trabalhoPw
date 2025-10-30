import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agendamento',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './agendamento.component.html',
  styleUrls: ['./agendamento.component.css'],
})
export class AgendamentoComponent {
  agendamento = {
    nome: '',
    nivel: '',
    dataHora: '',
  };

  constructor(private router: Router) {}

  onSubmit() {
    console.log('Agendamento:', this.agendamento);

    this.router.navigate(['/confirmacao']);
  }
}
