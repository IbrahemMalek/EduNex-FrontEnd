import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatRadioModule } from '@angular/material/radio';
import { MatSliderModule } from '@angular/material/slider';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignUpComponent } from './Components/sign-up/sign-up.component';
import { LoginComponent } from './Components/login/login.component';
import { HeaderComponent } from './Components/SharedComponents/header/header.component';
import { CoursesComponent } from './Components/courses/courses.component';
import { CustomPaginationComponent } from './Components/SharedComponents/custom-pagination/custom-pagination.component';
import { TeachersComponent } from './Components/teachers/teachers.component';
import { MainComponent } from './Components/Home/main/main.component';
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
import { ScrollAnimationDirective } from './Directive/scroll-animation.directive';
import { AppearFromLeftDirective } from './Directive/appear-from-left.directive';
import { AppearFromRightDirective } from './Directive/appear-from-right.directive';
import { FooterComponent } from './Components/SharedComponents/footer/footer.component';
import { ScrollToTopButtonComponent } from './Components/SharedComponents/scroll-to-top-button/scroll-to-top-button.component';
import { CourseDetailsComponent } from './Components/CourseDetails/course-details/course-details.component';
import { CourseDetailsHeaderComponent } from './Components/CourseDetails/course-details-header/course-details-header.component';
import { CourseDetailsCardComponent } from './Components/CourseDetails/course-details-card/course-details-card.component';
import { SubscriptionDialogComponent } from './Components/CourseDetails/Dialog/subscription-dialog/subscription-dialog.component';
import { LessonDialogComponent } from './Components/CourseDetails/Dialog/lesson-dialog/lesson-dialog.component';
import { ContentDialogComponent } from './Components/CourseDetails/Dialog/content-dialog/content-dialog.component';
import { ConfirmationDialogComponent } from './Components/CourseDetails/Dialog/confirmation-dialog/confirmation-dialog.component';
import { HeroComponent } from './Components/Home/hero/hero.component';
import { CreateExamComponent } from './Components/Exam/create-exam/create-exam.component';
import { ExamDialogComponent } from './Components/CourseDetails/Dialog/exam-dialog/exam-dialog.component';
import { QuestionControllerComponent } from './Components/Exam/question-controller/question-controller.component';
import { ExamControllerComponent } from './Components/Exam/exam-controller/exam-controller.component';
import { LessonContentComponent } from './Components/lesson-content/lesson-content.component';
import { StudentExamComponent } from './Components/Exam/student-exam/student-exam.component';
import { LoadingBarModule } from '@ngx-loading-bar/core';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';

import { OverlayContainer } from '@angular/cdk/overlay';
import { TimerComponent } from './Components/Exam/timer/timer.component';

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
    ScrollAnimationDirective,
    AppearFromLeftDirective,
    AppearFromRightDirective,
    FooterComponent,
    ScrollToTopButtonComponent,
    CourseDetailsComponent,
    CourseDetailsHeaderComponent,
    CourseDetailsCardComponent,
    SubscriptionDialogComponent,
    LessonDialogComponent,
    ContentDialogComponent,
    ConfirmationDialogComponent,
    HeroComponent,
    CreateExamComponent,
    ExamDialogComponent,
    QuestionControllerComponent,
    ExamControllerComponent,
    LessonContentComponent,
    StudentExamComponent,
    TimerComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    RouterModule,
    HttpClientModule,
    MatSnackBarModule,
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
    MatProgressBarModule,
    MatChipsModule,
    MatButtonToggleModule,
    MatDialogModule,
    MatSelectModule,
    MatMenuModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatCheckboxModule,
    AppRoutingModule,
    LoadingBarModule,
    LoadingBarHttpClientModule,
    LoadingBarRouterModule,
  ],
  providers: [
    OverlayContainer,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
