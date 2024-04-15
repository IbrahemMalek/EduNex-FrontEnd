import { Component } from '@angular/core';
import { ITeacher } from 'src/app/Model/iTeacher';
import { DynamicDataService } from 'src/app/Services/dynamic-data.service';

@Component({
  selector: 'app-about-teachers',
  templateUrl: './about-teachers.component.html',
  styleUrls: ['./about-teachers.component.css']
})
export class AboutTeachersComponent {
  teachers: ITeacher[] = [];

  constructor(private dynamicData: DynamicDataService) { }

  getAll() {
    this.dynamicData.getAllTeachers().subscribe(teachers => this.teachers = teachers);
  }
  ngOnInit(): void {
    this.getAll()
  }

}
