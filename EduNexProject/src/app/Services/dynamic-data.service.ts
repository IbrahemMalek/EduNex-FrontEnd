import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ILesson } from '../Model/ilesson';
import { ICourse } from '../Model/icourse';

@Injectable({
  providedIn: 'root'
})
export class DynamicDataService {
  postLesson(newLesson: ILesson) {
    throw new Error('Method not implemented.');
  }

  constructor(private httpClient: HttpClient) {
  }

  getAllCourses(): Observable<ICourse[]> {
    return this.httpClient.get<ICourse[]>("http://localhost:2000/courses");
  }

  getCourseById(courseId: number): Observable<ICourse> {
    return this.httpClient.get<ICourse>(`http://localhost:2000/courses/${courseId}`);
  }

  deleteCourseById(courseId: number): Observable<void> {
    return this.httpClient.delete<void>(`http://localhost:2000/courses/${courseId}`);
  }

  addCourse(courseData: ICourse): Observable<ICourse> {
    return this.httpClient.post<ICourse>("http://localhost:2000/courses", courseData);
  }

  editCourse(courseId: number, updatedCourse: ICourse): Observable<void> {
    return this.httpClient.put<void>(`http://localhost:2000/courses/${courseId}`, updatedCourse);
  }


  getAllTeachers(): Observable<any> {
    return this.httpClient.get("http://localhost:2000/teachers");
  }

  getTeacherById(TID: number): Observable<any> {
    return this.httpClient.get(`http://localhost:2000/teachers/${TID}`);
  }

  deleteTeacherById(TID: number): Observable<void> {
    return this.httpClient.delete<void>(`http://localhost:2000/teachers/${TID}`);
  }

  addTeacher(teacherData: any): Observable<any> {
    return this.httpClient.post("http://localhost:2000/teachers", teacherData);
  }



  getAllLessons(): Observable<any> {
    return this.httpClient.get("http://localhost:2000/lessons");
  }

  getLessonById(TID: number): Observable<any> {
    return this.httpClient.get(`http://localhost:2000/lessons/${TID}`);
  }

  deleteLessonById(LID: number): Observable<void> {
    return this.httpClient.delete<void>(`http://localhost:2000/lessons/${LID}`);
  }

  addLesson(lessonData: any): Observable<any> {
    return this.httpClient.post("http://localhost:2000/lessons", lessonData);
  }

  editLesson(LID: number, updatedContent: ILesson): Observable<void> {
    return this.httpClient.put<void>(`http://localhost:2000/lessons/${LID}`, updatedContent);
  }

}
