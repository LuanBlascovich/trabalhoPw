import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pedido } from '../types/types';

@Injectable({
  providedIn: 'root',
})
export class VendasService {
  private readonly API = 'http://localhost:5010/vendas';

  constructor(private http: HttpClient) {}

  listarVendas(token: string): Observable<Pedido[]> {
    const headers = new HttpHeaders({ 'x-access-token': token });
    return this.http.get<Pedido[]>(this.API, { headers });
  }

  pegarUltimaVenda(token: string): Observable<Pedido> {
    const headers = new HttpHeaders({ 'x-access-token': token });
    return this.http.get<Pedido>(`${this.API}/confirmacao`, { headers });
  }
}
