import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { AgendamentoService } from '../../core/services/agendamento.service';
import { UsuariosService } from '../../core/services/usuarios.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router'; // Adicione isso se não tiver

@Component({
  selector: 'app-agendamento',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './agendamento.component.html',
  styleUrls: ['./agendamento.component.css'],
})
export class AgendamentoComponent implements OnInit {
  agendamentoForm!: FormGroup;
  instrutores: any[] = [];
  niveis = ['iniciante', 'intermediario', 'avancado']; // ENUM

  constructor(
    private fb: FormBuilder,
    private agendamentoService: AgendamentoService,
    private usuariosService: UsuariosService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.agendamentoForm = this.fb.group({
      nome_completo: ['', Validators.required],
      nivel: ['', Validators.required],
      instrutor_id: ['', Validators.required],
      data_hora: ['', Validators.required],
    });

    this.carregarInstrutores();

    // 🔹 Prioriza dados do state (passados pelo login)
    const state = history.state; // Ou this.route.snapshot.data, mas history.state é mais direto para state
    if (state && state.agendamento) {
      this.agendamentoForm.patchValue(state.agendamento);
      alert(
        'Dados do agendamento recuperados após login! Você pode finalizar agora.'
      );
      return; // 🔹 Sai aqui para não sobrescrever com localStorage
    }
    // 🔹 Fallback: Recupera do localStorage (se acessado diretamente sem login)
    const agendamentoSalvo = localStorage.getItem('agendamentoTemp');
    if (agendamentoSalvo) {
      this.agendamentoForm.patchValue(JSON.parse(agendamentoSalvo));
      alert('Dados do agendamento recuperados! Faça login para finalizar.');
      // Não remove aqui, pois pode ser usado se o usuário sair e voltar
    }
  }

  carregarInstrutores() {
    this.usuariosService.listarInstrutores().subscribe({
      next: (res) => (this.instrutores = res),
      error: (err) => console.error('Erro ao carregar instrutores:', err),
    });
  }

  criarAgendamento() {
    if (this.agendamentoForm.invalid) return;

    const usuario = JSON.parse(localStorage.getItem('usuario') || 'null');
    console.log('Usuário do localStorage:', usuario); // 🔹 Log para ver o objeto completo
    console.log('ID do usuário:', usuario?.id_usuario); // 🔹 Log específico para id_usuario

    const dados = {
      nome_completo: this.agendamentoForm.value.nome_completo,
      nivel: this.agendamentoForm.value.nivel,
      instrutor_id: this.agendamentoForm.value.instrutor_id,
      data_hora: this.agendamentoForm.value.data_hora,
      cliente_id: usuario ? usuario.id_usuario : null,
    };

    console.log('Dados a serem enviados:', dados); // Já tem isso

    if (!usuario || !usuario.id_usuario) {
      // 🔹 Mude para verificar id_usuario
      // 🔹 Salva temporariamente e redireciona para login
      const dadosTemp = {
        nome_completo: this.agendamentoForm.value.nome_completo,
        nivel: this.agendamentoForm.value.nivel,
        instrutor_id: this.agendamentoForm.value.instrutor_id,
        data_hora: this.agendamentoForm.value.data_hora,
      };
      localStorage.setItem('agendamentoTemp', JSON.stringify(dadosTemp));
      alert('Você precisa estar logado para concluir o agendamento!');
      this.router.navigate(['/login']);
      return;
    }

    // 🔹 Só chega aqui se logado e com id_usuario válido
    this.agendamentoService.criarAgendamento(dados).subscribe({
      next: (res) => {
        alert(res.mensagem);
        this.router.navigate(['/confirmacao']);
      },
      error: (err) => {
        console.error('Erro ao criar agendamento:', err);
        alert(err.error?.erro || 'Erro ao criar agendamento');
      },
    });
  }
}
