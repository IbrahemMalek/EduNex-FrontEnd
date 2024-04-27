import { NgModule, importProvidersFrom } from '@angular/core';
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
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CoursesComponent } from './Components/courses/courses.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSliderModule } from '@angular/material/slider';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { CustomPaginationComponent } from './Components/SharedComponents/custom-pagination/custom-pagination.component';
import { TeachersComponent } from './Components/teachers/teachers.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MainComponent } from './Components/Home/main/main.component';
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
import { ScrollAnimationDirective } from './Directive/scroll-animation.directive';
import { AppearFromLeftDirective } from './Directive/appear-from-left.directive';
import { AppearFromRightDirective } from './Directive/appear-from-right.directive';
import { ScrollToTopButtonComponent } from './Components/SharedComponents/scroll-to-top-button/scroll-to-top-button.component';
import { CourseDetailsComponent } from './Components/CourseDetails/course-details/course-details.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { LoadingBarModule } from '@ngx-loading-bar/core';
import { CourseDetailsCardComponent } from './Components/CourseDetails/course-details-card/course-details-card.component';
import { CourseDetailsHeaderComponent } from './Components/CourseDetails/course-details-header/course-details-header.component';
import { MatDialogModule } from '@angular/material/dialog';
import { SubscriptionDialogComponent } from './Components/CourseDetails/Dialog/subscription-dialog/subscription-dialog.component';
import { LessonDialogComponent } from './Components/CourseDetails/Dialog/lesson-dialog/lesson-dialog.component';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';
import { ContentDialogComponent } from './Components/CourseDetails/Dialog/content-dialog/content-dialog.component';
import { ConfirmationDialogComponent } from './Components/CourseDetails/Dialog/confirmation-dialog/confirmation-dialog.component';
import { HeroComponent } from './Components/Home/hero/hero.component';
import { CreateExamComponent } from './Components/Exam/create-exam/create-exam.component';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {MatRadioModule} from '@angular/material/radio';
import { HttpClientModule } from '@angular/common/http';
import { FooterComponent } from './Components/footer/footer.component';
import { DataTimePickerComponent } from './Components/Exam/data-time-picker/data-time-picker.component';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TeacherDashboardComponent } from './Components/teacher-dashboard/teacher-dashboard.component';
import { SignupTeacherComponent } from './Components/signup-teacher/signup-teacher.component';
import { AdminDashBoardComponent } from './Components/admin-dash-board/admin-dash-board.component';
import { MatTabsModule } from '@angular/material/tabs';
import { TeacherProfileComponent } from './Components/teacher-profile/teacher-profile.component';
import { CustomCloudNavbarComponent } from './Components/SharedComponents/custom-cloud-navbar/custom-cloud-navbar.component';


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
    DataTimePickerComponent,
    FooterComponent,
    TeacherDashboardComponent,
    SignupTeacherComponent,
    AdminDashBoardComponent,
    TeacherProfileComponent,
    CustomCloudNavbarComponent,
   
  ],
  imports: [
    BrowserModule,
    MatTabsModule,
    MatDatepickerModule,
    MatNativeDateModule,
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
    MatProgressBarModule,
    MatChipsModule,
    HttpClientModule,
    MatButtonToggleModule,
    LoadingBarModule,
    LoadingBarHttpClientModule,
    LoadingBarRouterModule,
    MatDialogModule,
    MatSelectModule,
    MatMenuModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatSnackBarModule,
  ],
  providers: [
    OverlayContainer,
    importProvidersFrom(LoadingBarHttpClientModule),
    MatNativeDateModule,
    HttpClientModule
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
