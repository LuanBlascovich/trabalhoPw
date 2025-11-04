import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
 produtos = [
    { nome: 'Leash 6 pés injetável', img: 'assets/images/leash.jpg', descricao: 'Perfeito para o seu dia a dia, garante segurança e praticidade nas ondas.' },
    { nome: 'Prancha Iniciante', img: 'assets/images/prancha1.png', descricao: 'Leve e resistente, facilita o aprendizado e manobras para quem está começando.' },
    { nome: 'Deck Swell', img: 'assets/images/deck-swell.jpg', descricao: 'Alta aderência, resistência na colagem e muito conforto para dominar as ondas.' },
    { nome: 'Prancha Profissional', img: 'assets/images/prancha5.jpg', descricao: 'Desempenho superior e resistência avançada para surfistas experientes.' }
  ];
}
