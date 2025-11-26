import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Aula } from '../types/types';

@Injectable({
  providedIn: 'root'
})
export class AulaService {

  private readonly API = 'http://localhost:5010/aula';

  constructor(private http: HttpClient) {}

  listarAulas(): Observable<Aula[]> {
    return this.http.get<Aula[]>(`${this.API}/listar`);
  }
}