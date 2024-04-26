import { Component } from '@angular/core';

@Component({
  selector: 'app-profile-course',
  templateUrl: './profile-course.component.html',
  styleUrls: ['./profile-course.component.css']
})
export class ProfileCourseComponent {
  displayedColumns: string[] = ['Course', 'Price', 'PurchaseDate', 'Level', 'Actions'];
  dataSource = ELEMENT_DATA;
}

export interface PeriodicElement {
  date: string;
  price: number;
  course: string;
  level: string;
  image: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { date: '2024-04-15 06:47:10', price: 100, course: 'الرياضيات', level: 'راسب', image: 'https://via.placeholder.com/75' },
  { date: '2024-04-15 06:47:10', price: 120, course: 'الفيزياء', level: 'ناجح', image: 'https://via.placeholder.com/75' },
  { date: '2024-04-15 06:47:10', price: 150, course: 'الكيمياء', level: 'راسب', image: 'https://via.placeholder.com/75' },
  { date: '2024-04-15 06:47:10', price: 200, course: 'علم الأحياء', level: 'ناجح', image: 'https://via.placeholder.com/75' }
];
