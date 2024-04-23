import { Component, Input } from '@angular/core';
import { ICourse } from 'src/app/Model/iCourse';
import { MatDialog } from '@angular/material/dialog';
import { SubscriptionDialogComponent } from '../Dialog/subscription-dialog/subscription-dialog.component';

@Component({
  selector: 'app-course-details-card',
  templateUrl: './course-details-card.component.html',
  styleUrls: ['./course-details-card.component.css'],
})
export class CourseDetailsCardComponent {
  @Input() course: ICourse | null = null;

  constructor(public dialog: MatDialog) { }

  openDialog(): void {
    const dialogRef = this.dialog.open(SubscriptionDialogComponent, {
      height: '200px',
      width: '400px',
      panelClass: 'dialog-container',
      autoFocus: false,
      data: {
        title: 'هل أنت متأكد؟',
        message: 'سيتم الاشتراك الآن',
        buttonText: 'اشترك الآن',
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
