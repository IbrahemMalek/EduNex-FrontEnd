import { Component } from '@angular/core';
import { ITeacher } from 'src/app/Model/iTeacher';
import { StaticDataService } from '../../Services/static-data.service';

@Component({
  selector: 'app-about-teachers',
  templateUrl: './about-teachers.component.html',
  styleUrls: ['./about-teachers.component.css']
})
export class AboutTeachersComponent {
  teachers: ITeacher[] = [];

  constructor(private staticData: StaticDataService) { }

  ngOnInit(): void {
    this.teachers = this.staticData.getAllTeachers();
  }
}
