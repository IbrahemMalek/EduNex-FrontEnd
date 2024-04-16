import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ICourse } from 'src/app/Model/icourse';
import { DynamicDataService } from 'src/app/Services/dynamic-data.service';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { ITeacher } from 'src/app/Model/iteacher';
import { ILesson } from 'src/app/Model/ilesson';
import { LessonDialogComponent } from '../lesson-dialog/lesson-dialog.component';
import { MatDialog } from '@angular/material/dialog';

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

  options = [
    { label: 'محتوي الكورس', selected: true },
    { label: 'عن المعلم', selected: false },
  ];

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
        this.lessons.push({
          title: lessonTitle,
          url: '',
          teacher: this.teacher?.name ?? 'Unknown Teacher',
          subject: this.teacher?.subject ?? 'Unknown Subject',
        });

        const container = document.querySelector('.container');
        container?.scrollTo({ top: container.scrollHeight, behavior: 'smooth' });
      }
    });
  }

  addAccordion(): void {
    const newLesson: ILesson = {
      title: 'New Lesson',
      url: '',
      teacher: this.teacher?.name ?? 'Unknown Teacher',
      subject: this.teacher?.subject ?? 'Unknown Subject',
    };

    this.dynamicData.addLesson(newLesson).subscribe(
      (addedLesson: ILesson) => {
        console.log('Lesson added:', addedLesson);
        this.lessons.push(addedLesson);

        const container = document.querySelector('.container');
        container?.scrollTo({ top: container.scrollHeight, behavior: 'smooth' });
      },
      (error) => {
        console.error('Failed to add lesson:', error);
      }
    );
  }

}
