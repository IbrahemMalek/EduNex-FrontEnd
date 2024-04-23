import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { DynamicDataService } from 'src/app/Services/dynamic-data.service';
import { ICourse } from 'src/app/Model/iCourse';
import { ILesson } from 'src/app/Model/ilesson';
import { LessonDialogComponent } from '../Dialog/lesson-dialog/lesson-dialog.component';
import { ILessonContent } from 'src/app/Model/ilesson-content';
import { ContentDialogComponent } from '../Dialog/content-dialog/content-dialog.component';
import { ConfirmationDialogComponent } from '../Dialog/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css'],
  animations: [
    trigger('fadeInOut', [
      state('in', style({ opacity: 1 })),
      transition(':enter', [
        style({ opacity: 0 }),
        animate(300)
      ]),
      transition(':leave', [
        animate(300, style({ opacity: 0 }))
      ])
    ])
  ]
})
export class CourseDetailsComponent implements OnInit {
  someMethod() {
    throw new Error('Method not implemented.');
  }
  panelOpenState = false;
  course: ICourse | null = null;
  courseID: number = 0;
  showDetails: boolean = false;
  lessons: ILesson[] = [];
  lessonContact: ILessonContent[] = [];

  options = [
    { label: 'محتوي الكورس', selected: true },
    { label: 'عن المعلم', selected: false },
  ];

  someProperty: any;

  constructor(private activatedRoute: ActivatedRoute, private dynamicData: DynamicDataService, public dialog: MatDialog, private router: Router) {
    this.courseID = Number(this.activatedRoute.snapshot.paramMap.get('id'));

  }

  getCourseById() {
    this.dynamicData.getCourseById(this.courseID).subscribe(course => {
      this.course = course;
    });
  }

  ngOnInit(): void {
    this.getCourseById();
  }


  toggleOption(index: number) {
    this.options.forEach((option, i) => {
      option.selected = i === index;
    });
    this.showDetails = !this.showDetails;
  }

  //add lesson
  openLessonDialog(): void {
    this.dialog.open(LessonDialogComponent, {
      height: '300px',
      width: '400px',
      panelClass: 'dialog-container',
      autoFocus: false,
      data: {
        confirmButtonText: 'أضف الحصة',
        courseId: this.course?.id,
        name: this.course?.teacher,
      }
    });
  }

  //edit lesson
  editLessonDialog(lessonId?: number, initialLessonTitle?: string): void {
    this.dialog.open(LessonDialogComponent, {
      height: '300px',
      width: '400px',
      panelClass: 'dialog-container',
      autoFocus: false,
      data: {
        confirmButtonText: 'تعديل الأسم',
        courseId: this.course?.id,
        name: this.course?.teacher,
        initialLessonId: lessonId,
        initialLessonTitle: initialLessonTitle,
      }
    });
  }

  //delete lesson
  openDeleteConfirmationDialog(lessonId: number): void {
    this.dialog.open(ConfirmationDialogComponent, {
      height: '200px',
      width: '500px',
      data: {
        message: 'هل أنت متأكد أنك تريد مسح الحصة؟',
        confirmButtonText: 'أمسح الحصة',
        lessonId: lessonId,
      }
    });
  }

  //add content
  addContentDialog(contentTitle: string, lessonId: number): void {
    this.dialog.open(ContentDialogComponent, {
      height: '350px',
      width: '400px',
      panelClass: 'dialog-container',
      autoFocus: false,
      data: {
        confirmButtonText: 'أضف الملفات',
        operation: 'add',
        courseId: this.course?.id,
        contentTitle: contentTitle,
        name: this.course?.teacher,
        lessonId: lessonId,
      }
    });
  }

  //edit content
  editContentDialog(lessonId: number, content: ILessonContent): void {
    this.dialog.open(ContentDialogComponent, {
      height: '350px',
      width: '400px',
      panelClass: 'dialog-container',
      autoFocus: false,
      data: {
        confirmButtonText: 'تعديل الملفات',
        operation: 'edit',
        courseId: this.course?.id,
        name: this.course?.teacher,
        lessonId: lessonId,
        content: content,
        contentId: content.id,
        contentTitle: content.videoUrl ? 'video' : 'file',
        videoUrl: content.videoUrl,
        pdfUrl: content.pdfUrl,
      }
    });
  }

  //delete content
  openDeleteContentConfirmationDialog(lessonId: number, contentId: number): void {
    this.dialog.open(ConfirmationDialogComponent, {
      height: '200px',
      width: '600px',
      data: {
        message: 'هل أنت متأكد أنك تريد مسح هذا المحتوى؟',
        confirmButtonText: 'أمسح المحتوى',
        lessonId: lessonId,
        contentId: contentId,
      }
    });
  }
}
