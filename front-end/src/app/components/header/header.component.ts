import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})

export class HeaderComponent implements OnInit {
  menuOpen = false;
  usuarioLogado = false;
  nomeUsuario = '';
  isHome = false;

  constructor(private router: Router) {}

  ngOnInit() {
    const usuario = localStorage.getItem('usuario');
    if (usuario) {
      this.usuarioLogado = true;
      this.nomeUsuario = JSON.parse(usuario).nome;
    }

    // Detecta a rota atual
    this.router.events.subscribe(() => {
      this.isHome = this.router.url === '/home';
    });
  }
  
  atualizarUsuario() {
    const usuario = localStorage.getItem('usuario');
    if (usuario) {
      this.usuarioLogado = true;
      this.nomeUsuario = JSON.parse(usuario).nome;
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

    // dispara evento para atualizar todos os componentes que escutam
    window.dispatchEvent(new Event('usuarioAtualizado'));

    // fecha dropdown
    const menu = document.getElementById('menu-usuario');
    if (menu) menu.classList.remove('ativo');

    this.router.navigate(['/home']);
  }
}