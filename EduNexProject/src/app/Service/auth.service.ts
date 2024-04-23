import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable,BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { IuserUdateFormData } from '../Models/IuserUdateFormData';
import { Router } from '@angular/router';
import { jwtDecode } from "jwt-decode";
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  

   baseUrl: string = 'http://localhost:5293';
   tokenKey: string = 'auth_token';

  constructor(private httpClient: HttpClient,private router: Router,private snackBar: MatSnackBar) {
    if(localStorage.getItem("tokenKey") !==null)
      {
        this.saveCurrentUserData() // to handle refresh
      }
  }

  signUp(data: any): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/api/Student/register/student`, data);
  }

  login(data: any): Observable<any> {

    console.log(data);

    return this.httpClient.post(`${this.baseUrl}/api/Student/login/student`, data).pipe(
      tap((response: any) => {
        if (response && response.token) {
          // Save token 
          localStorage.setItem(this.tokenKey, response.token.result);

           this.saveCurrentUserData()

          this.snackBar.open('  تم تسجيل الدخول بنجاح ', 'Close', {
            duration: 2000, 
            verticalPosition: 'top',
            panelClass: ['green-snackbar']
          });
          
          // go to about
          this.router.navigate(['/teachers']);
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

  
  currentUser:any=new BehaviorSubject(null) ;

  saveCurrentUserData(): void {
    const token = localStorage.getItem(this.tokenKey);
    if (token) {
      const decode = jwtDecode(token);
      console.log(decode);
      this.currentUser.next(decode);
    }
  }
}
