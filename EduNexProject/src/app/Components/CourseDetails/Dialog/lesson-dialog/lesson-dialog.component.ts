import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DynamicDataService } from 'src/app/Services/dynamic-data.service';

@Component({
  selector: 'app-lesson-dialog',
  templateUrl: './lesson-dialog.component.html',
  styleUrls: ['./lesson-dialog.component.css']
})
export class LessonDialogComponent {
  lessonTitle: string = '';

  constructor(
    public dialogRef: MatDialogRef<LessonDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dynamicData: DynamicDataService
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    this.dialogRef.close(this.lessonTitle);

    if (this.data.initialLessonTitle) {
      const lessonId = this.data.initialLessonId;
      const updatedLesson: any = {
        id: lessonId,
        title: this.lessonTitle,
        teacher: this.data.name ?? 'Unknown Teacher',
        subject: this.data.subject ?? 'Unknown Subject',
        content: this.data.initialLessonContent ?? []
      };

      this.dynamicData.editLesson(lessonId, updatedLesson)
        .subscribe(
          () => {
            console.log(`Lesson with ID ${lessonId} updated successfully`);
            window.location.reload();
          },
          (error) => {
            console.error(`Failed to update lesson with ID ${lessonId}:`, error);
          }
        );
    } else {
      this.dynamicData.addLesson({
        title: this.lessonTitle,
        url: '',
        teacher: this.data.name ?? 'Unknown Teacher',
        subject: this.data.subject ?? 'Unknown Subject',
        content: [],
      }).subscribe(
        (addedLesson: any) => {
          console.log('Lesson added:', addedLesson);
          window.location.reload();
        },
        (error) => {
          console.error('Failed to add lesson:', error);
        }
      );
    }
  }
}
