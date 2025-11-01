import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [RouterModule, FormsModule],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css',
})
export class CadastroComponent {
  nome: string = '';
  sobrenome: string = '';
  email: string = '';
  senha: string = '';

  constructor(private router: Router) {}

  cadastrar() {
 if (this.nome && this.sobrenome && this.email && this.senha) {
      // Salva os dados temporariamente no localStorage
      const usuario = {
        nome: this.nome,
        sobrenome: this.sobrenome,
        email: this.email,
        senha: this.senha,
      };
      localStorage.setItem('usuarioCadastro', JSON.stringify(usuario));

      // Redireciona para a página de login
      this.router.navigate(['/login']);
    } else {
      alert('Preencha todos os campos!');
    }
  }
}
