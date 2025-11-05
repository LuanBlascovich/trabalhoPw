import { Component } from '@angular/core';
import { ProdutoService } from '../../core/services/produto.service';
import { Produto } from '../../core/types/types';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cadastrar-produto',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './cadastrar-produto.component.html',
  styleUrls: ['./cadastrar-produto.component.css'],
})
export class CadastrarProdutoComponent {
  produto: Produto = { nome: '', descricao: '', preco: 0, imagem: '' };
  imagemPreview: string | ArrayBuffer | null = null;

  constructor(private produtoService: ProdutoService) {}

  onFileChange(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      this.imagemPreview = reader.result;
      this.produto.imagem = reader.result as string;
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  }

  cadastrar(): void {
    if (this.produto.nome && this.produto.preco) {
      this.produtoService.cadastrar(this.produto).subscribe({
        next: () => {
          alert('Produto cadastrado com sucesso!');
          this.produto = { nome: '', descricao: '', preco: 0, imagem: '' };
          this.imagemPreview = null;
        },
        error: (erro) => {
          console.error('Erro ao cadastrar produto:', erro);
          alert('Erro ao cadastrar produto!');
        },
      });
    } else {
      alert('Preencha todos os campos obrigatórios!');
    }
  }
}
