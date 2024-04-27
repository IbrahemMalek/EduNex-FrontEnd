import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  baseUrl: string = 'http://localhost:5293';
  TeacherAbout: string = '';

  constructor(private httpClient:HttpClient) { }

 

  saveTeacherAbout(teacherId: string, aboutTeacher: string): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const body = JSON.stringify(aboutTeacher); // Stringify the data
    return this.httpClient.post(`${this.baseUrl}/api/Teacher/teacherInfo/${teacherId}`, body, { headers });
  }
  
  getAllTeacherPending():Observable<any>
  {
    return this.httpClient.get(`${this.baseUrl}/teachers/Pending`)
  }

  ApproveTeacherProfile(id: string): Observable<any> {
    const url = `${this.baseUrl}/teachers/approve/${id}`;
    console.log('URL:', url); 
    return this.httpClient.put(url, {});
  }
  
  RejectTeacherProfile(id:string):Observable<any>
  {
    return this.httpClient.put(`${this.baseUrl}/teachers/reject/${id}`,{});
  }
  
  
  
  
  
  
  getTeacherAbout():string
  {
    return this.TeacherAbout;
  }
}
