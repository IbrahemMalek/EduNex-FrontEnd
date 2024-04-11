import { Component, OnInit } from '@angular/core';
import { ITeacher } from 'src/app/Model/iTeacher';
import { StaticDataService } from '../../Services/static-data.service';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.css']
})
export class TeachersComponent implements OnInit {
  panelOpenState = false;

  teachers: ITeacher[] = [];

  constructor(private staticData: StaticDataService) { }

  ngOnInit(): void {
    this.teachers = this.staticData.getAllTeachers();
  }
}
