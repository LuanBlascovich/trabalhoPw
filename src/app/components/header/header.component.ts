import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  menuItems = [
    { label: 'HOME', route: '/home' },
    { label: 'AULA', route: '/aula' },
    { label: 'PRODUTOS', route: '/produtos' },
    { label: 'SOBRE', route: '/sobre' },
  ];
}
