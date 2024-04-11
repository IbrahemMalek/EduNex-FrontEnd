// courses.component.ts
import { Component, OnInit } from '@angular/core';
import { ICourse } from 'src/app/Model/iCourse';
import { StaticDataService } from '../Services/static-data.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css'],
})
export class CoursesComponent implements OnInit {
  panelOpenState = false;

  courses: ICourse[] = [];

  constructor(private staticData: StaticDataService) { }

  ngOnInit(): void {
    this.courses = this.staticData.getAllCourses();
  }
}
