import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UsuariosService } from '../../core/services/usuarios.service';
import { Usuario } from '../../core/types/types';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [RouterModule, FormsModule, HttpClientModule],
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css'],
})
export class CadastroComponent {
  nome: string = '';
  sobrenome: string = '';
  email: string = '';
  senha: string = '';

  constructor(
    private router: Router,
    private usuariosService: UsuariosService
  ) {}

  cadastrar() {
    if (this.nome && this.sobrenome && this.email && this.senha) {
      const usuario: Usuario = {
        nome: this.nome,
        sobrenome: this.sobrenome,
        email: this.email,
        senha: this.senha,
      };
      this.usuariosService.cadastrar(usuario).subscribe({
        next: (res) => {
          alert(res.mensagem);
          this.router.navigate(['/login']);
        },
        error: (err) => {
          alert(err.error?.erro || 'Erro ao cadastrar usuário');
          console.error(err);
        },
      });
    } else {
      alert('Preencha todos os campos!');
    }
  }
}
