import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { SignUpComponent } from './Components/sign-up/sign-up.component';
import { CoursesComponent } from './Components/courses/courses.component';
import { TeachersComponent } from './Components/teachers/teachers.component';
import { MainComponent } from './Components/Home/main/main.component';
import { CourseDetailsComponent } from './Components/CourseDetails/course-details/course-details.component';
import { CreateExamComponent } from './Components/Exam/create-exam/create-exam.component';
import { TeacherDashboardComponent } from './Components/teacher-dashboard/teacher-dashboard.component';
import { SignupTeacherComponent } from './Components/signup-teacher/signup-teacher.component';
import { AdminDashBoardComponent } from './Components/admin-dash-board/admin-dash-board.component';
import { TeacherProfileComponent } from './Components/teacher-profile/teacher-profile.component';

const routes: Routes = [
  { path: "course/:id/lesson/:id/exam/:id", component: CreateExamComponent },
  { path: "login", component: LoginComponent },
  { path: "signup", component: SignUpComponent },
  { path: "courses", component: CoursesComponent },
  { path: "course/:id", component: CourseDetailsComponent },
  { path: "teachers", component: TeachersComponent },
  { path: "home", component: MainComponent },
  { path: "tdash", component: TeacherDashboardComponent },
  { path: "home", component: MainComponent },
  { path: "teacherSignup", component:SignupTeacherComponent },
  { path: "teacherprofile", component:TeacherProfileComponent },
  { path: "admindash", component:AdminDashBoardComponent },
  { path: "", component: LoginComponent },
  { path: "**", component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
