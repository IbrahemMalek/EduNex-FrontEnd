import { Component, Input } from '@angular/core';
import { ICourse } from 'src/app/Model/icourse';

@Component({
  selector: 'app-course-details-header',
  templateUrl: './course-details-header.component.html',
  styleUrls: ['./course-details-header.component.css']
})
export class CourseDetailsHeaderComponent {
  @Input() course: ICourse | null = null;
}
