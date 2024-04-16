import { Component, OnInit } from '@angular/core';
import { ICourse } from 'src/app/Model/icourse';
import { trigger, style, transition, animate } from '@angular/animations';
import { DynamicDataService } from 'src/app/Services/dynamic-data.service';

@Component({
  selector: 'app-recent-courses',
  templateUrl: './recent-courses.component.html',
  styleUrls: ['./recent-courses.component.css'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(-200%)' }),
        animate('300ms', style({ opacity: 1, transform: 'translateX(0)' }))
      ]),
    ])
  ]
})
export class RecentCoursesComponent implements OnInit {
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

  constructor(private dynamicData: DynamicDataService) { }

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
      this.filteredCourses = this.courses.slice(8, 16);
    } else if (this.options[1].selected) {
      // Show courses related to 'المواد الفلسفية'
      this.filteredCourses = this.courses.slice(0, 8);
    } else if (this.options[2].selected) {
      // Show courses related to 'تعويضات السنتر'
      this.filteredCourses = this.courses.slice(8, 16);
    } else {
      // Show courses related to 'مادة الجغرافيا'
      this.filteredCourses = this.courses.slice(0, 8);
    }
  }

  getAll() {
    this.dynamicData.getAllCourses().subscribe(courses => {
      this.courses = courses;
      this.filterCourses();
    });
  }

  ngOnInit(): void {
    this.getAll();
  }
}
