import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ICourse } from 'src/app/Model/iCourse';
import { DynamicDataService } from 'src/app/Services/dynamic-data.service';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { ITeacher } from 'src/app/Model/iTeacher';

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

  constructor(private activatedRoute: ActivatedRoute, private dynamicData: DynamicDataService) {
    this.courseID = Number(this.activatedRoute.snapshot.paramMap.get('id'));
  }

  getCourseById() {
    this.dynamicData.getCourseById(this.courseID).subscribe(course => this.course = course);
  }

  getTeacherByName() {
    this.dynamicData.getAllTeachers().subscribe(teachers => {
      this.teachers = teachers;
      this.teacher = teachers.find((teacher: { name: string | undefined; }) => teacher.name === this.course?.teacher) ?? null;
    });
  }

  ngOnInit(): void {
    this.getCourseById();
    this.getTeacherByName();
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
}
