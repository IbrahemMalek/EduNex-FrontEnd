import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ILesson } from '../Model/ilesson';
import { ICourse } from '../Model/icourse';
import { IExam } from '../Model/iexam';
import { IExamResult } from '../Model/iexam-result';

@Injectable({
  providedIn: 'root'
})
export class DynamicDataService {
  postLesson(newLesson: ILesson) {
    throw new Error('Method not implemented.');
  }

  constructor(private httpClient: HttpClient) {
  }

  // course
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

  // teacher
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


  // exam
  getAllExams(): Observable<IExam[]> {
    return this.httpClient.get<IExam[]>("http://localhost:2000/exams");
  }

  getExamById(examId: number): Observable<IExam> {
    return this.httpClient.get<IExam>(`http://localhost:2000/exams/${examId}`);
  }

  deleteExamById(examId: number): Observable<void> {
    return this.httpClient.delete<void>(`http://localhost:2000/exams/${examId}`);
  }

  addExam(courseData: IExam): Observable<IExam> {
    return this.httpClient.post<IExam>("http://localhost:2000/exams", courseData);
  }

  editExam(examId: number, updatedExam: IExam): Observable<void> {
    return this.httpClient.put<void>(`http://localhost:2000/exams/${examId}`, updatedExam);
  }


  // exam
  getExamResult(): Observable<IExamResult> {
    return this.httpClient.get<IExamResult>("http://localhost:2000/examResult");
  }

}
