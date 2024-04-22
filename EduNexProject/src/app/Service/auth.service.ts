import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { IuserUdateFormData } from '../Models/IuserUdateFormData';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = 'http://localhost:5293';
  private tokenKey: string = 'auth_token';

  constructor(private httpClient: HttpClient,private router: Router) {}

  signUp(data: any): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/api/Student/register/student`, data);
  }

  login(data: any): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/api/Student/login/student`, data).pipe(
      tap((response: any) => {
        if (response && response.token) {
          // Save token 
          localStorage.setItem(this.tokenKey, response.token);
        
          // go to about
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
