import { Component } from '@angular/core';
import { ICourse } from 'src/app/Model/iCourse';
import { StaticDataService } from '../../../Services/static-data.service';
import { trigger, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-recent-courses',
  templateUrl: './recent-courses.component.html',
  styleUrls: ['./recent-courses.component.css'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(-100%)' }),
        animate('300ms', style({ opacity: 1, transform: 'translateX(0)' }))
      ]),
    ])
  ]
})
export class RecentCoursesComponent {
  courses: ICourse[] = [];
  filteredCourses: ICourse[] = [];
  options = [
    { label: 'علمي', selected: true },
    { label: 'المواد الفلسفية', selected: false },
    { label: 'تعويضات السنتر', selected: false },
    { label: 'مادة الجغرافيا', selected: false },
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
      // Show latest courses
      this.filteredCourses = this.courses.slice(0, 16);
    } else if (this.options[1].selected) {
      // Show courses related to 'المواد الفلسفية'
      this.filteredCourses = this.courses.slice(3, 13);
    } else if (this.options[2].selected) {
      // Show courses related to 'تعويضات السنتر'
      this.filteredCourses = this.courses.slice(6, 16);
    } else {
      // Show courses related to 'مادة الجغرافيا'
      this.filteredCourses = this.courses.slice(8, 18);
    }
  }

  scrollCards(direction: number) {
    const container = document.querySelector('.scroll-section') as HTMLElement;
    if (container) {
      const scrollAmount = 600;
      const newPosition = container.scrollLeft + scrollAmount * direction;
      container.scrollTo({
        left: newPosition,
        behavior: 'smooth'
      });
    }
  }

  ngOnInit(): void {
    this.courses = this.staticData.getAllCourses();
    this.filterCourses();
  }
}
