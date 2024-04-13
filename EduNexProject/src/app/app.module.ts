import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { SignUpComponent } from './Components/sign-up/sign-up.component';
import { LoginComponent } from './Components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './Components/SharedComponents/header/header.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { OverlayContainer } from '@angular/cdk/overlay';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CoursesComponent } from './Components/courses/courses.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatRadioModule } from '@angular/material/radio';
import { MatSliderModule } from '@angular/material/slider';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { CustomPaginationComponent } from './Components/custom-pagination/custom-pagination.component';
import { TeachersComponent } from './Components/teachers/teachers.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MainComponent } from './Components/Home/main/main.component';
import { RecentClassesComponent } from './Components/Home/recent-classes/recent-classes.component';
import { MatChipsModule } from '@angular/material/chips';
import { CourseCardComponent } from './Components/SharedComponents/course-card/course-card.component';
import { TeacherCardComponent } from './Components/SharedComponents/teacher-card/teacher-card.component';
import { RecentCoursesComponent } from './Components/Home/recent-courses/recent-courses.component';
import { AboutAcademyComponent } from './Components/Home/about-academy/about-academy.component';
import { AboutTeachersComponent } from './Components/Home/about-teachers/about-teachers.component';
import { SideScrollButtonsComponent } from './Components/SharedComponents/side-scroll-buttons/side-scroll-buttons.component';
import { AboutUsComponent } from './Components/Home/about-us/about-us.component';
import { ClassRankComponent } from './Components/Home/class-rank/class-rank.component';
import { QuestionsComponent } from './Components/Home/questions/questions.component';
import { TargetCounterComponent } from './Components/Home/target-counter/target-counter.component';

@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    LoginComponent,
    HeaderComponent,
    CoursesComponent,
    CustomPaginationComponent,
    TeachersComponent,
    MainComponent,
    RecentClassesComponent,
    CourseCardComponent,
    TeacherCardComponent,
    RecentCoursesComponent,
    AboutAcademyComponent,
    AboutTeachersComponent,
    SideScrollButtonsComponent,
    AboutUsComponent,
    ClassRankComponent,
    QuestionsComponent,
    TargetCounterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSlideToggleModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatExpansionModule,
    MatRadioModule,
    MatSliderModule,
    MatPaginatorModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatChipsModule,
  ],
  providers: [
    OverlayContainer,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
