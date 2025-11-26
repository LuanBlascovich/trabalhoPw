import { Injectable } from '@angular/core';
import { Usuario } from '../types/types';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  private readonly API = 'http://localhost:5010/usuario';

  constructor(private http: HttpClient) {}

  cadastrar(usuario: Usuario): Observable<any> {
    return this.http.post(this.API + '/cadastrar', usuario);
  }

  fazerLogin(usuario: Usuario): Observable<any> {
    return this.http.post(this.API + '/login', usuario);
  }

  listar(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.API + '/listar');
  }

  listarInstrutores(): Observable<any> {
    return this.http.get(this.API+'/instrutores');
  }
}
