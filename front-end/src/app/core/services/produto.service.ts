import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Produto } from '../types/types';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProdutoService {
  private readonly API = 'http://localhost:5010/produto';

  constructor(private http: HttpClient) {}

  private criarHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'x-access-token': token || '',
    });
  }

  listar(): Observable<Produto[]> {
    return this.http.get<Produto[]>(`${this.API}/listar`);
  }

  cadastrar(produto: Produto, imagem?: File): Observable<Produto> {
    const formData = new FormData();
    formData.append('nome', produto.nome);
    formData.append('descricao', produto.descricao || '');
    formData.append('preco', produto.preco.toString());
    if (imagem) formData.append('imagem', imagem);

    return this.http.post<Produto>(`${this.API}/adicionar`, formData, {
      headers: this.criarHeaders(),
    });
  }

  atualizar(id: number, produto: Produto, imagem?: File): Observable<Produto> {
    const formData = new FormData();
    formData.append('nome', produto.nome);
    formData.append('descricao', produto.descricao || '');
    formData.append('preco', produto.preco.toString());
    if (imagem) formData.append('imagem', imagem);

    return this.http.put<Produto>(`${this.API}/editar/${id}`, formData, {
      headers: this.criarHeaders(),
    });
  }

  excluir(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API}/excluir/${id}`, {
      headers: this.criarHeaders(),
    });
  }

  buscarPorId(id: number): Observable<Produto> {
    return this.http.get<Produto>(`${this.API}/buscar/${id}`, {
      headers: this.criarHeaders(),
    });
  }
}
