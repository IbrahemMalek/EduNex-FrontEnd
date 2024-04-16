import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { DynamicDataService } from 'src/app/Services/dynamic-data.service';
import { ICourse } from 'src/app/Model/icourse';
import { ITeacher } from 'src/app/Model/iteacher';
import { ILesson } from 'src/app/Model/ilesson';
import { LessonDialogComponent } from '../lesson-dialog/lesson-dialog.component';
import { ILessonContent } from 'src/app/Model/ilesson-content';

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
  panelOpenState = false;
  course: ICourse | null = null;
  teacher: ITeacher | null = null;
  teachers: ITeacher[] = [];
  courseID: number = 0;
  showDetails: boolean = false;
  lessons: ILesson[] = [];
  lessonContact: ILessonContent[] = [];
  private lessonIdCounter: number = 1;

  options = [
    { label: 'محتوي الكورس', selected: true },
    { label: 'عن المعلم', selected: false },
  ];

  lessonsOptions = [
    { title: 'المقدمة' },
    { title: 'الشرح' },
    { title: 'الحل' },
  ];

  constructor(private activatedRoute: ActivatedRoute, private dynamicData: DynamicDataService, public dialog: MatDialog) {
    this.courseID = Number(this.activatedRoute.snapshot.paramMap.get('id'));
  }

  getCourseById() {
    this.dynamicData.getCourseById(this.courseID).subscribe(course => {
      this.course = course;
      this.getTeacherByName();
      this.getLessonsByTeacher();
    });
  }

  getTeacherByName() {
    this.dynamicData.getAllTeachers().subscribe((teachers: ITeacher[]) => {
      this.teacher = teachers.find((teacher: ITeacher) => teacher.name === this.course?.teacher) ?? null;
    });
  }

  getLessonsByTeacher() {
    this.dynamicData.getAllLessons().subscribe((lessons: ILesson[]) => {
      this.lessons = lessons.filter((lesson: ILesson) => lesson.teacher === this.teacher?.name);
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

  openDialog(): void {
    const dialogRef = this.dialog.open(LessonDialogComponent, {
      height: '300px',
      width: '400px',
      panelClass: 'dialog-container',
      autoFocus: false,
      data: {
        name: this.teacher?.name,
      }
    });

    dialogRef.afterClosed().subscribe((lessonTitle: string) => {
      if (lessonTitle) {
        this.addLessonWithContent(lessonTitle);
      }
    });
  }

  addLessonWithContent(lessonTitle: string): void {
    const newLesson: ILesson = {
      id: this.generateLessonId(),
      title: lessonTitle,
      url: '',
      teacher: this.teacher?.name ?? 'Unknown Teacher',
      subject: this.teacher?.subject ?? 'Unknown Subject',
    };

    // Add the lesson to the server
    this.dynamicData.addLesson(newLesson).subscribe(
      (addedLesson: ILesson) => {
        console.log('Lesson added:', addedLesson);
        this.lessons.push(addedLesson);

        // Call addAccordion with the lesson ID and title
        this.addAccordion(addedLesson.id, lessonTitle);

        const container = document.querySelector('.container');
        container?.scrollTo({ top: container.scrollHeight, behavior: 'smooth' });
      },
      (error) => {
        console.error('Failed to add lesson:', error);
      }
    );
  }


  addAccordion(lessonId: number, lessonTitle: string): void {
    const newLessonContent: any = {
      lessonId: lessonId,
      title: lessonTitle,
    };

    // Add the lesson content to the server
    this.dynamicData.addLessonContent(newLessonContent).subscribe(
      (addedContent: any) => {
        console.log('Lesson content added:', addedContent);
        // You can perform further actions if needed
      },
      (error) => {
        console.error('Failed to add lesson content:', error);
      }
    );
  }


  addLessonContent(lessonId: number, title: string): void {
    const newLessonContent: any = {
      lessonId: lessonId,
      title: title,
    };

    this.dynamicData.addLessonContent(newLessonContent).subscribe(
      (addedContent: any) => {
        console.log('Lesson content added:', addedContent);
      },
      (error) => {
        console.error('Failed to add lesson content:', error);
      }
    );
  }


  private generateLessonId(): number {
    return this.lessonIdCounter++;
  }

  deleteLesson(lessonId: number): void {
    this.lessons = this.lessons.filter((lesson: ILesson) => lesson.id !== lessonId);

    this.dynamicData.deleteLessonById(lessonId).subscribe(
      () => {
        console.log(`Lesson with ID ${lessonId} deleted successfully`);
      },
      (error) => {
        console.error(`Failed to delete lesson with ID ${lessonId}:`, error);
      }
    );
  }


}
