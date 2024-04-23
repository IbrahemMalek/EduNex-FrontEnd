import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router'; // Import Router

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl: string = 'base Url';
  tokenKey: string = 'token'; // Added tokenKey property

  constructor(private httpClient: HttpClient, private router: Router) {} // Combined constructor

  signUp(data: any): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/api/Student/register/student`, data).pipe(
      tap((response: any) => {
        if (response && response.token) {
          // Remove token 
          localStorage.removeItem(this.tokenKey);
        }
      })
    );
  }

  login(data: any): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/api/Student/login/student`, data).pipe(
      tap((response: any) => {
        if (response && response.token) {
          // Save token 
          localStorage.setItem(this.tokenKey, response.token);
        
          // Navigate to about
          this.router.navigate(['/about']);
        }
      })
    );
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  removeToken(): void {
    localStorage.removeItem(this.tokenKey);
  }
}
