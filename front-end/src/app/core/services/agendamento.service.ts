import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Agendamento } from '../types/types';

@Injectable({
  providedIn: 'root',
})
export class AgendamentoService {
  private readonly API = 'http://localhost:5010/agendamento';

  constructor(private http: HttpClient) {}

  private getAuthHeaders() {
    const token = localStorage.getItem('token');

    if (!token) {
      console.error('Token não encontrado. Usuário precisa fazer login.');
      return null;
    }

    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    };
  }

  criarAgendamento(dados: {
    nome_completo: string;
    nivel: string;
    instrutor_id: number;
    data_hora: string;
    cliente_id?: number;
  }): Observable<{ mensagem: string }> {
    const headers = this.getAuthHeaders();
    return this.http.post<{ mensagem: string }>(
      `${this.API}/criar`,
      dados,
      headers!
    );
  }

  listarAgendamentos(): Observable<Agendamento[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<Agendamento[]>(`${this.API}/listar`, headers!);
  }

  cancelarAgendamento(idAgendamento: number): Observable<{ mensagem: string }> {
    const headers = this.getAuthHeaders();
    return this.http.put<{ mensagem: string }>(
      `${this.API}/cancelar/${idAgendamento}`,
      {},
      headers!
    );
  }

  excluirAgendamento(idAgendamento: number): Observable<{ mensagem: string }> {
    const headers = this.getAuthHeaders();
    return this.http.delete<{ mensagem: string }>(
      `${this.API}/excluir/${idAgendamento}`,
      headers!
    );
  }
}
