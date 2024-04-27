import { Component } from '@angular/core';
import { ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/Service/auth.service';
import { TeacherService } from 'src/app/Service/teacher.service';

@Component({
  selector: 'app-teacher-profile',
  templateUrl: './teacher-profile.component.html',
  styleUrls: ['./teacher-profile.component.css']
})
export class TeacherProfileComponent {
  edittext: boolean = true;
  edittext1: boolean = true;
  edittext2: boolean = true;
  @ViewChild('uploadInput') uploadInput!: ElementRef<HTMLInputElement>;
  teacher: any;
  teacherHint:any='';
  constructor(private route: ActivatedRoute,private authService:AuthService,private teacherService:TeacherService) { }

  ngOnInit(): void {
    console.log('Teacher id:', this.authService.teacherId);
    this.teacherHint=this.teacherService.getTeacherAbout()
   
  }

  saveupdate(updateData: string | null) {
    if (updateData !== null) {
      const id = this.authService.teacherId; 
      const aboutTeacher = updateData.toString(); // Ensure aboutTeacher is a string
      this.teacherService.saveTeacherAbout(id, aboutTeacher).subscribe(
        (response) => {
          console.log('Update successful:', response);
        },
        (error) => {
          console.error('Update failed:', error);
        }
      );
    } else {
      console.error('Update data is null.');
    }
  }
  
  

  
  

  toggleEdit() {
    this.edittext = !this.edittext;

  }

  toggleEdit2() {
    this.edittext2 = !this.edittext2;
  }
  toggleEditp() {
    this.edittext1 = !this.edittext1;
  }
  selectedImage: string | ArrayBuffer | null = 'https://bootdey.com/img/Content/avatar/avatar7.png';

  previewImage(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      this.selectedImage = reader.result;
    };

    reader.readAsDataURL(file);
  }

  openFileInput() {
    this.uploadInput.nativeElement.click();
  }
  
}



