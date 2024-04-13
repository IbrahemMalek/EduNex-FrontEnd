import { Component } from '@angular/core';
import { ICourse } from 'src/app/Model/iCourse';
import { ITeacher } from 'src/app/Model/iTeacher';
import { StaticDataService } from 'src/app/Components/Services/static-data.service';
import { trigger, style, transition, animate } from '@angular/animations';

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

  constructor(private staticData: StaticDataService) { }

  toggleOption(index: number) {
    this.options.forEach((option, i) => {
      option.selected = i === index;
    });
    this.currentIndex = 0;
    this.filterCourses();
  }

  filterCourses() {
    if (this.options[0].selected) {
      // Show courses
      this.chosenCards = this.courses;
    } else if (this.options[1].selected) {
      // Show teachers
      this.chosenCards = this.teachers;
    }
  }

  isCourse(card: any): card is ICourse {
    return !card.hasOwnProperty('name')
  }

  isTeacher(card: any): card is ITeacher {
    return card.hasOwnProperty('name')
  }

  ngOnInit(): void {
    this.courses = this.staticData.getAllCourses();
    this.teachers = this.staticData.getAllTeachers();
    this.chosenCards = this.courses;
    this.filterCourses();
  }
}
