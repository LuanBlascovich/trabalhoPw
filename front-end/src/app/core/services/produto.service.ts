import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Produto } from '../types/types';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProdutoService {
  private readonly API = 'http://localhost:5010/produto';

  constructor(private http: HttpClient) {}

  //Listar todos os produtos
  listar(): Observable<Produto[]> {
    return this.http.get<Produto[]>(`${this.API}/listar`);
  }

  //Cadastrar um novo produto
  cadastrar(produto: Produto): Observable<Produto> {
    return this.http.post<Produto>(`${this.API}/cadastrar`, produto);
  }

  //Buscar produto por id
  buscarPorId(id: number): Observable<Produto> {
    return this.http.get<Produto>(`${this.API}/${id}`);
  }

  //Atualizar produto
  atualizar(id: number, produto: Produto): Observable<Produto> {
    return this.http.put<Produto>(`${this.API}/atualizar/${id}`, produto);
  }

  // Excluir produto
  excluir(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API}/deletar/${id}`);
  }
}