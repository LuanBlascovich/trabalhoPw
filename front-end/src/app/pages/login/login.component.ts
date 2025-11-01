import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  email: string = '';
  senha: string = '';
  lembrar: boolean = false;

  constructor(private router: Router) {}

  login() {
    const usuarioCadastrado = localStorage.getItem('usuarioCadastro');
    if (!usuarioCadastrado) {
      alert('Nenhum usuário cadastrado!');
      return;
    }

    const usuario = JSON.parse(usuarioCadastrado);

    if (this.email === usuario.email && this.senha === usuario.senha) {
      localStorage.setItem('usuario', JSON.stringify(usuario));

      // dispara evento para atualizar header
      window.dispatchEvent(new Event('usuarioAtualizado'));

      this.router.navigate(['/home']);
    } else {
      alert('E-mail ou senha inválidos!');
    }
  }
}
