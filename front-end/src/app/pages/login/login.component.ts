import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UsuariosService } from '../../core/services/usuarios.service';
import { Usuario } from '../../core/types/types';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: string = '';
  senha: string = '';
  lembrar: boolean = false;

  constructor(
    private router: Router,
    private usuariosService: UsuariosService
  ) {}

  login() {
    const usuario: Partial<Usuario> = {
      email: this.email,
      senha: this.senha,
    };

    this.usuariosService.fazerLogin(usuario as Usuario).subscribe({
      next: (res) => {
        if (res.usuario) {
          localStorage.setItem('usuario', JSON.stringify(res.usuario));
          localStorage.setItem('token', res.token);
          window.dispatchEvent(new Event('usuarioAtualizado'));
          alert(`Bem-vindo, ${res.usuario.nome}!`);
          this.router.navigate(['/home']);
        } else {
          alert('E-mail ou senha inválidos!');
        }
      },
      error: (err) => {
        console.error(err);
        alert(err.error?.erro || 'Erro ao tentar logar');
      },
    });
  }
}
