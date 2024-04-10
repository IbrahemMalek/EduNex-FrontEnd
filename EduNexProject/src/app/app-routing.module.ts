import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { SignUpComponent } from './Components/sign-up/sign-up.component';
import { CoursesComponent } from './Components/courses/courses.component';

const routes: Routes = [

  { path: "login", component: LoginComponent },
  { path: "signup", component: SignUpComponent },
  { path: "courses", component: CoursesComponent },
  { path: "", component: LoginComponent },
  { path: "**", component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
