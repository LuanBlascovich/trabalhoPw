import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Agendamento } from '../types/types';

@Injectable({
  providedIn: 'root',
})
export class AgendamentoService {
  private readonly API = 'http://localhost:5010/agendamento';

  constructor(private http: HttpClient) {}

  criarAgendamento(dados: {
    nome_completo: string;
    nivel: string;
    instrutor_id: number;
    data_hora: string;
    cliente_id?: number;
  }): Observable<{ mensagem: string }> {
    return this.http.post<{ mensagem: string }>(`${this.API}/criar`, dados);
  }

  listarAgendamentos(): Observable<Agendamento[]> {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<Agendamento[]>(`${this.API}/listar`, { headers });
  }

  cancelarAgendamento(idAgendamento: number): Observable<{ mensagem: string }> {
    const token = localStorage.getItem('token');

    return this.http.put<{ mensagem: string }>(
      `${this.API}/cancelar/${idAgendamento}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }

  excluirAgendamento(idAgendamento: number): Observable<{ mensagem: string }> {
    const token = localStorage.getItem('token');

    return this.http.delete<{ mensagem: string }>(
      `${this.API}/excluir/${idAgendamento}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }
}
