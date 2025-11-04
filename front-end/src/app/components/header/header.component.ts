import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

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
  isHome = false;

  constructor(private router: Router) {}

  ngOnInit() {
    this.atualizarUsuario();
    this.router.events.subscribe(() => {
      this.isHome = this.router.url === '/home';
    });

    window.addEventListener('usuarioAtualizado', () => this.atualizarUsuario());
  }

  atualizarUsuario() {
    const usuarioStr = localStorage.getItem('usuario');
    if (usuarioStr) {
      const usuario = JSON.parse(usuarioStr);
      this.usuarioLogado = true;
      this.nomeUsuario = usuario.nome;
    } else {
      this.usuarioLogado = false;
      this.nomeUsuario = '';
    }
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  abrirCarrinho() {
    this.router.navigate(['/carrinho']);
  }

  abrirUsuario() {
    if (!this.usuarioLogado) {
      this.router.navigate(['/login']);
    } else {
      const menu = document.getElementById('menu-usuario');
      if (menu) menu.classList.toggle('ativo');
    }
  }

  sairDaConta() {
    localStorage.removeItem('usuario');
    window.dispatchEvent(new Event('usuarioAtualizado'));
    const menu = document.getElementById('menu-usuario');
    if (menu) menu.classList.remove('ativo');
    this.router.navigate(['/home']);
  }


  //direcionamento para a sessao sobre
  scrollTo(sectionId: string) {
    // Se já estamos na Home
    if (this.router.url === '/home' || this.router.url === '/') {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Se estiver em outra rota, vai pra Home e depois faz o scroll
      this.router.navigate(['/home']).then(() => {
        setTimeout(() => {
          const el = document.getElementById(sectionId);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      });
    }
  }

}
