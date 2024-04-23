import { Component } from '@angular/core';

@Component({
  selector: 'app-teacher-dashboard',
  templateUrl: './teacher-dashboard.component.html',
  styleUrls: ['./teacher-dashboard.component.css']
})
export class TeacherDashboardComponent {
 
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
