import { Injectable } from '@angular/core';
import { ICourse } from 'src/app/Model/iCourse';
import { courseData } from './courses.data';
import { ITeacher } from 'src/app/Model/iTeacher';
import { teacherData } from './teachers.data';

@Injectable({
  providedIn: 'root'
})
export class StaticDataService {
  courseList: ICourse[];
  teacherList: ITeacher[];
  constructor() {
    this.courseList = courseData;
    this.teacherList = teacherData;
  }
  getAllCourses(): ICourse[] {
    return this.courseList;
  }
  getAllTeachers(): ITeacher[] {
    return this.teacherList;
  }
}
