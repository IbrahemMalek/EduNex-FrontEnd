import { Component, OnInit } from '@angular/core';
import { ICourse } from 'src/app/Model/iCourse';
import { trigger, style, transition, animate } from '@angular/animations';
import { DynamicDataService } from 'src/app/Services/dynamic-data.service';

@Component({
  selector: 'app-recent-classes',
  templateUrl: './recent-classes.component.html',
  styleUrls: ['./recent-classes.component.css'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(-100%)' }),
        animate('300ms', style({ opacity: 1, transform: 'translateX(0)' }))
      ]),
    ])
  ]
})
export class RecentClassesComponent implements OnInit {
  courses: ICourse[] = [];
  filteredCourses: ICourse[] = [];
  options = [
    { label: 'أحدث الحصص', selected: true },
    { label: 'أشهر الحصص', selected: false },
  ];

  constructor(private dynamicData: DynamicDataService) { }

  toggleOption(index: number) {
    this.options.forEach((option, i) => {
      option.selected = i === index;
    });
    this.filterCourses();
  }

  filterCourses() {
    if (this.options[0].selected) {
      // Show latest courses
      this.filteredCourses = this.courses.slice(0, 2);
    } else {
      // Show most popular courses
      this.filteredCourses = this.courses.slice(2, 4);
    }
  }

  getAll() {
    this.dynamicData.getAllCourses().subscribe(courses => this.courses = courses);
  }

  ngOnInit(): void {
    this.getAll();
    this.filterCourses();
  }
}
