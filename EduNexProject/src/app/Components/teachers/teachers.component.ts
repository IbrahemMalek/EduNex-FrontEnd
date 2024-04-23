import { Component, OnInit } from '@angular/core';
import { ITeacher } from 'src/app/Model/iteacher';
import { DynamicDataService } from 'src/app/Services/dynamic-data.service';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.css']
})
export class TeachersComponent implements OnInit {
  panelOpenState = false;

  teachers: ITeacher[] = [];

  constructor(private dynamicData: DynamicDataService) { }

  getAll() {
    this.dynamicData.getAllTeachers().subscribe(teachers => this.teachers = teachers);
  }
  ngOnInit(): void {
    this.getAll()
  }
}
