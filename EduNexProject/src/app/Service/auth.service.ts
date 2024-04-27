import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable,BehaviorSubject, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { IuserUdateFormData } from '../Models/IuserUdateFormData';
import { Router } from '@angular/router';
import { jwtDecode } from "jwt-decode";
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomJwtPayload } from '../Models/CustomJwtPayload ';
import { Iteacherdata } from '../Models/Iteacherdata';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  

   baseUrl: string = 'http://localhost:5293';
   tokenKey: string = 'auth_token';
   teacherId:any='';
  constructor(private httpClient: HttpClient,private router: Router,private snackBar: MatSnackBar) {
    if(localStorage.getItem("tokenKey") !==null)
      {
        this.saveCurrentUserId() // to handle refresh
      }
  }

  
  signUp(data: IuserUdateFormData): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/api/Student/register/student`, data).pipe(
      map(response => {
        // If the response indicates success, return the response data
        return response;
      }),
      catchError(error => {
        // If an error occurs, handle it here
        // You can log the error or perform any other error handling tasks
        console.error('Error during sign up:', error);
        this.snackBar.open(`${error.error.Email[0]}`, 'Close', {
          duration: 5000, 
          verticalPosition: 'bottom',
        });
        
        // Return an observable that emits the error
        return throwError(error);
      })
    );
  }

  login(data: any): Observable<any> {

    console.log(data);

    return this.httpClient.post(`${this.baseUrl}/api/Auth/login`, data).pipe(
      tap((response: any) => {
        if (response && response.token) {
          // Save token 
          localStorage.setItem(this.tokenKey, response.token.result);

           this.saveCurrentUserId()

          this.snackBar.open('  تم تسجيل الدخول بنجاح ', 'Close', {
            duration: 2000, 
            verticalPosition: 'top',
            panelClass: ['green-snackbar']
          });
          
          // go to about
          this.router.navigate(['/teachers']);
        }
      }),
      catchError(error => {
             
        // this.snackBar.open(`${error.error.Email[0]}`, 'Close', {
        //   duration: 5000, 
        //   verticalPosition: 'bottom',
        // });
        
        // Return an observable that emits the error
        return throwError(error);
      })
    );
  }
  
  signUpTeacher(data: Iteacherdata): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/api/Teacher/register/teacher`, data).pipe(
      map((response: any) => {
        console.log(response);
        return response;
      }),
      catchError(error => {
        console.error('Error during sign up:', error);
        this.snackBar.open(`${error.error.Email[0]}`, 'Close', {
          duration: 5000, 
          verticalPosition: 'bottom',
        });
        return throwError(error);
      })
    );
  }
  

  getUserData(id:any):Observable<any>
  {
    return this.httpClient.get(`${this.baseUrl}/api/Student/Get-Student/${id}`)
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  removeToken(): void {
    localStorage.removeItem(this.tokenKey);
  }

  //have id of user
  currentUser:any=new BehaviorSubject(null) ;

  saveCurrentUserId(): any {
    const token = localStorage.getItem(this.tokenKey);
    if (token) {
      console.log('Token retrieved:', token);
      
      const decodedUser: CustomJwtPayload = jwtDecode(token);
      console.log('Decoded User:', decodedUser);
      return decodedUser.nameid;
    } else {
      console.log('No token found.');
    }
  }
}
