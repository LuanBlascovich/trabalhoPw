import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {

  private readonly API = 'http://localhost:5010/carrinho';

  constructor(private http: HttpClient) {
    
  }

}

