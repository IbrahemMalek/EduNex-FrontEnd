import { Component, OnInit } from '@angular/core';
import { ITeacher } from 'src/app/Model/iTeacher';
import { AuthService } from 'src/app/Service/auth.service';
import { DynamicDataService } from 'src/app/Services/dynamic-data.service';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.css']
})
export class TeachersComponent implements OnInit {
  panelOpenState = false;

  teachers: ITeacher[] = [];

  constructor(private dynamicData: DynamicDataService,private authService:AuthService) { }

  getAll() {
    this.dynamicData.getAllTeachers().subscribe(teachers => this.teachers = teachers);
  }
  ngOnInit(): void {
    this.getAll()

    console.log(this.authService.getToken());

    console.log(this.authService.saveCurrentUserId())

   this.authService.getUserData(this.authService.saveCurrentUserId()).subscribe({
    next:(data)=>{
                      console.log(data)
    },
    error:(err)=>{
      console.log(err);
       }
   })


  }
}

 