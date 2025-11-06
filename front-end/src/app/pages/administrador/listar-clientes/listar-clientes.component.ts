import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../../core/services/usuarios.service';
import { Usuario } from '../../../core/types/types';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-listar-clientes',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './listar-clientes.component.html',
  styleUrls: ['./listar-clientes.component.css'],
})
export class ListarClientesComponent implements OnInit {
  clientes: Usuario[] = [];

  constructor(private usuarioService: UsuariosService) {}

  ngOnInit(): void {
    this.carregarClientes();
  }

  carregarClientes(): void {
    this.usuarioService.listar().subscribe({
      next: (usuarios) => {
        this.clientes = usuarios;
      },
      error: (err) => console.error('Erro ao carregar clientes:', err),
    });
  }
}
