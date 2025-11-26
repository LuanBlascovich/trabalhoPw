import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router'; // 🔹 Import Router
import jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private logadoSubject = new BehaviorSubject<boolean>(false);
  logado$ = this.logadoSubject.asObservable();

  constructor(private router: Router) {
    // 🔹 Inject Router
    const token = localStorage.getItem('token');
    this.logadoSubject.next(!!token && this.isTokenValid(token)); // 🔹 Check validity on init
  }

  login(token: string, user?: any) {
    // 🔹 Optional: Pass user data if available
    localStorage.setItem('token', token);
    if (user) {
      localStorage.setItem('usuario', JSON.stringify(user)); // 🔹 Store user if provided
    }
    this.logadoSubject.next(true);
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario'); // 🔹 Also clear user data
    this.logadoSubject.next(false);
    this.router.navigate(['/login']); // 🔹 Now works with injected Router
  }

  isLoggedIn(): boolean {
    return this.logadoSubject.value;
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getCurrentUser() {
    const token = this.getToken();
    const user = JSON.parse(localStorage.getItem('usuario') || 'null');
    // 🔹 Check if token is valid AND user exists
    return user && token && this.isTokenValid(token) ? user : null;
  }

  private isTokenValid(token: string): boolean {
    try {
      const parts = token.split('.');
      if (parts.length !== 3) return false;
      const payload = JSON.parse(
        atob(parts[1].replace(/-/g, '+').replace(/_/g, '/'))
      );
      return payload.exp > Date.now() / 1000;
    } catch (error) {
      console.error('Erro ao validar token:', error);
      return false;
    }
  }
}
