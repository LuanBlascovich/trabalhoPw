import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { CarrinhoService } from '../../core/services/carrinho.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  menuOpen = false;
  usuarioLogado = false;
  nomeUsuario = '';
  tipoUsuario = '';
  isHome = false;

  constructor(
    private router: Router,
    private carrinhoService: CarrinhoService,
    public authService: AuthService
  ) {}

  ngOnInit() {
    this.atualizarUsuario();
    this.isHome = this.router.url === '/home';
    window.addEventListener('usuarioAtualizado', () => {
      this.atualizarUsuario();
    });
  }

  atualizarUsuario() {
  const token = localStorage.getItem('token'); // 🔹 Verifica se há token

  const usuarioStr = localStorage.getItem('usuario');

  if (usuarioStr && token) {  // 🔹 Agora só deixa logado se existir token + usuário
    const usuario = JSON.parse(usuarioStr);
    this.usuarioLogado = true;
    this.nomeUsuario = usuario.nome;
    this.tipoUsuario = usuario.tipo;
  } else {
    this.usuarioLogado = false;
    this.nomeUsuario = '';
    this.tipoUsuario = '';
  }
}


  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
  fecharMenu() {
  this.menuOpen = false;
}


  abrirCarrinho() {
    this.router.navigate(['/carrinho']);
  }

  abrirUsuario() {
    if (!this.usuarioLogado) {
      this.router.navigate(['/login']);
      return;
    }
    document.getElementById('menu-usuario')?.classList.toggle('ativo');
  }

  sairDaConta() {
    localStorage.removeItem('usuario');
    this.carrinhoService.limpar();
    window.dispatchEvent(new Event('usuarioAtualizado'));
    document.getElementById('menu-usuario')?.classList.remove('ativo');
    this.router.navigate(['/home']);
    alert('Usuário deslogado com sucesso!');
  }

  scrollTo(sectionId: string) {
    const scroll = () =>
      document
        .getElementById(sectionId)
        ?.scrollIntoView({ behavior: 'smooth' });

    if (this.router.url === '/' || this.router.url === '/home') {
      scroll();
    } else {
      this.router.navigate(['/home']).then(() => setTimeout(scroll, 100));
    }
  }
}
