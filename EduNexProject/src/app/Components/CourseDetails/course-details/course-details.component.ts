import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DynamicDataService } from 'src/app/Services/dynamic-data.service';
import { ICourse } from 'src/app/Model/icourse';
import { ILesson, ILessonContent } from 'src/app/Model/ilesson';
import { LessonDialogComponent } from '../Dialog/lesson-dialog/lesson-dialog.component';
import { ContentDialogComponent } from '../Dialog/content-dialog/content-dialog.component';
import { ConfirmationDialogComponent } from '../Dialog/confirmation-dialog/confirmation-dialog.component';
import { ExamDialogComponent } from '../Dialog/exam-dialog/exam-dialog.component';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css'],
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
  role: string = '';

  options = [
    { label: 'محتوي الكورس', selected: true },
    { label: 'عن المعلم', selected: false },
  ];

  constructor(private activatedRoute: ActivatedRoute, private dynamicData: DynamicDataService, public dialog: MatDialog, private router: Router) {
    this.courseID = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.role = 'teacher';
  }

  ngOnInit(): void {
    this.getCourseById();
  }

  getCourseById() {
    this.dynamicData.getCourseById(this.courseID).subscribe(course => {
      this.course = course;
    });
  }

  isTeacher(): boolean {
    return this.role === 'teacher';
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
      width: '500px',
      data: {
        message: 'هل أنت متأكد أنك تريد حذف الحصة؟',
        confirmButtonText: 'حذف الحصة',
        lessonId: lessonId,
      }
    });
  }

  //add content
  addContentDialog(contentTitle: string, lessonId: number): void {
    this.dialog.open(ContentDialogComponent, {
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
      width: '600px',
      data: {
        message: 'هل أنت متأكد أنك تريد حذف هذا المحتوى؟',
        confirmButtonText: 'حذف المحتوى',
        lessonId: lessonId,
        contentId: contentId,
      }
    });
  }

  //addExam / homeWork
  openExamDialog(examType: string, course: ICourse, lesson: ILesson, contentId: number): void {
    this.dialog.open(ExamDialogComponent, {
      width: '600px',
      data: {
        header: examType == 'exam' ? 'بيانات الامتحان' : 'بيانات الواجب',
        confirmButtonText: examType == 'exam' ? 'أضف الامتحان' : 'أضف لاواجب',
        lessonId: lesson.id,
        lessonTitle: lesson.title,
        contentId: contentId,
        courseID: course.id,
        courseTitle: course.description,
        grade: course.grade,
        examType: examType,
      }
    });
  }

  passLesson(lesson: any): void {
    const queryParams = { courseId: this.course?.id };

    this.router.navigate(['/lesson', lesson.id], {
      state: { lesson: lesson, courseId: this.course?.id },
      queryParams: queryParams
    });
  }

}
