import { Component, OnInit } from '@angular/core';
import { ProdutoService } from '../../../core/services/produto.service';
import { Produto } from '../../../core/types/types';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cadastrar-produto',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './cadastrar-produto.component.html',
  styleUrls: ['./cadastrar-produto.component.css'],
})
export class CadastrarProdutoComponent implements OnInit {
  produto: Produto = { nome: '', descricao: '', preco: 0, imagem: '' };
  imagemPreview: string | ArrayBuffer | null = null;
  idProduto: number | null = null;
  imagemFile: File | null = null;

  constructor(
    private produtoService: ProdutoService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.idProduto = Number(this.route.snapshot.paramMap.get('id')) || null;
    if (this.idProduto) {
      // Se houver id, busca o produto
      this.produtoService.buscarPorId(this.idProduto).subscribe({
        next: (p) => {
          this.produto = p;
          this.imagemPreview = p.imagem
            ? `http://localhost:5010/${p.imagem}`
            : null;
        },
        error: (erro) => {
          console.error('Erro ao buscar produto:', erro);
          alert('Não foi possível carregar os dados do produto.');
        },
      });
    }
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.imagemFile = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.imagemPreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  salvar(): void {
    if (!this.produto.nome || !this.produto.preco) {
      alert('Preencha todos os campos obrigatórios!');
      return;
    }

    if (this.idProduto) {
      // Atualizar produto
      this.produtoService
        .atualizar(this.idProduto, this.produto, this.imagemFile || undefined)
        .subscribe({
          next: () => {
            alert('Produto atualizado com sucesso!');
            this.router.navigate(['/produtos']);
          },
          error: (erro) => {
            console.error('Erro ao atualizar produto:', erro);
            alert('Erro ao atualizar produto!');
          },
        });
    } else {
      // Cadastrar novo produto
      this.produtoService
        .cadastrar(this.produto, this.imagemFile || undefined)
        .subscribe({
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
    }
  }
}
