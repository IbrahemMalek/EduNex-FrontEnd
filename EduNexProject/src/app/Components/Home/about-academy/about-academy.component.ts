import { Component } from '@angular/core';
import { ICourse } from 'src/app/Model/iCourse';
import { ITeacher } from 'src/app/Model/iTeacher';
import { trigger, style, transition, animate } from '@angular/animations';
import { DynamicDataService } from 'src/app/Services/dynamic-data.service';

@Component({
  selector: 'app-about-academy',
  templateUrl: './about-academy.component.html',
  styleUrls: ['./about-academy.component.css'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(-200%)' }),
        animate('300ms', style({ opacity: 1, transform: 'translateX(0)' }))
      ]),
    ])
  ]
})
export class AboutAcademyComponent {
  courses: ICourse[] = [];
  teachers: ITeacher[] = [];
  chosenCards: (ICourse | ITeacher)[] = [];

  options = [
    { label: 'أشهر الكورسات', selected: true },
    { label: 'أشهر المدسين', selected: false },
  ];

  currentIndex = 0;
  cardsToShow = 18;

  constructor(private dynamicData: DynamicDataService) { }

  isCourse(card: any): card is ICourse {
    return !card.hasOwnProperty('name')
  }

  isTeacher(card: any): card is ITeacher {
    return card.hasOwnProperty('name')
  }

  ngOnInit(): void {
    this.getAll();
  }

  toggleOption(index: number) {
    this.options.forEach((option, i) => {
      option.selected = i === index;
    });
    this.currentIndex = 0;
    this.filterCourses();
  }

  filterCourses() {
    if (this.options[0].selected) {
      this.chosenCards = this.courses;
    } else if (this.options[1].selected) {
      this.chosenCards = this.teachers;
    }
  }

  getAll() {
    this.dynamicData.getAllTeachers().subscribe(teachers => {
      this.teachers = teachers;
      this.filterCourses();
    });
    this.dynamicData.getAllCourses().subscribe(courses => {
      this.courses = courses;
      this.filterCourses();
    });
  }
}
