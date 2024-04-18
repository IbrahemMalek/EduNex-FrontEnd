import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IuserData } from '../Models/iuser-data';

@Injectable({
  providedIn: 'root'
})
export class AuthService{

  baseUrl:string='base Url';
  constructor(private httpClient:HttpClient)  {
   }

  signUp(data:IuserData):Observable<any>
  {
    return this.httpClient.post(`link signup`,data);
  }
  login(data:object):Observable<any>
  {
    return this.httpClient.post(`link signin`,data);
  }
}
