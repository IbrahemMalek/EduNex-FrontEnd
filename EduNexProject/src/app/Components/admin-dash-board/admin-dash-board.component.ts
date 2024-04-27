import { Component } from '@angular/core';
import { AuthService } from 'src/app/Service/auth.service';
import { TeacherService } from 'src/app/Service/teacher.service';

@Component({
  selector: 'app-admin-dash-board',
  templateUrl: './admin-dash-board.component.html',
  styleUrls: ['./admin-dash-board.component.css']
})
export class AdminDashBoardComponent {
teacherPendingData: any[] = [];
 constructor(private authService:AuthService,private teacherService:TeacherService){}
 
 ngOnInit(): void {
  console.log(this.teacherService.getAllTeacherPending().subscribe({
    next:(response)=>
      { console.log(response)
        this.teacherPendingData=response
      },
      error:(err)=>
        {
          console.log(`error:${err}`)
        }
  }))
 }


 Approve(id:string)
 {
  this.teacherService.ApproveTeacherProfile(id).subscribe({
    next:(respon)=>{
      console.log(respon);
    },
    error:(err)=>
      {
        console.log(err);
      }
  })
 }
 Reject(id:string)
 {
  this.teacherService.RejectTeacherProfile(id).subscribe({
    next:(respon)=>{
      console.log(respon);
    },
    error:(err)=>
      {
        console.log(err);
      }

  })

 }






  toCreate:boolean=true;
  toGetAll:boolean=false;
  toUpdate:boolean=false;
  toDelete:boolean=false;

  create() {
    // Logic for creating a new item
    this.toCreate=true;
    this.toGetAll=false;
    this.toUpdate=false;
    this.toDelete=false;
  }

  getAll() {
    // Logic for reading items
    this.toGetAll=true;
    this.toCreate=false;
    this.toUpdate=false;
    this.toDelete=false;
  }

  update() {
    // Logic for updating an item
    this.toUpdate=true;
    this.toCreate=false;
    this.toGetAll=false;
    this.toDelete=false;
  }

  delete() {
    // Logic for deleting an item
    this.toDelete=true;
    this.toUpdate=false;
    this.toCreate=false;
    this.toGetAll=false;
  }
  
}
