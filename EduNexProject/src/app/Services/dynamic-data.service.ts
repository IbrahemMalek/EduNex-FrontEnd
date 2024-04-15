import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DynamicDataService {

  constructor(private httpClient: HttpClient) {
  }
  getAllCourses(): Observable<any> {
    return this.httpClient.get("http://localhost:2000/courses");
  }

  getCourseById(CID: number): Observable<any> {
    return this.httpClient.get(`http://localhost:2000/courses/${CID}`);
  }

  DeleteCourseById(CID: number): Observable<void> {
    let res = this.httpClient.delete<void>(`http://localhost:2000/courses/${CID}`);
    return res;
  }

  getAllTeachers(): Observable<any> {
    return this.httpClient.get("http://localhost:2000/teachers");
  }

  getTeacherById(TID: number): Observable<any> {
    return this.httpClient.get(`http://localhost:2000/teachers/${TID}`);
  }

  DeleteTeacherById(TID: number): Observable<void> {
    let res = this.httpClient.delete<void>(`http://localhost:2000/teachers/${TID}`);
    return res;
  }
}
