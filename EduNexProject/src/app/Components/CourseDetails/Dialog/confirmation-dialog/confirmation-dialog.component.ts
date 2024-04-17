import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DynamicDataService } from 'src/app/Services/dynamic-data.service';
import { ILesson } from 'src/app/Model/ilesson';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.css']
})
export class ConfirmationDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dynamicData: DynamicDataService
  ) { }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onYesClick(): void {
    this.dialogRef.close(true);
    if (this.data.contentId) {
      this.deleteContent(this.data.lessonId, this.data.contentId);
    } else {
      this.deleteLesson(this.data.lessonId);
    }
  }

  deleteLesson(lessonId: number): void {
    this.dynamicData.deleteLessonById(lessonId).subscribe(
      () => {
        console.log(`Lesson with ID ${lessonId} and its content deleted successfully`);
        this.dialogRef.close(true);
        window.location.reload();
      },
      (error) => {
        console.error(`Failed to delete lesson with ID ${lessonId} and its content:`, error);
        this.dialogRef.close(false);
      }
    );
  }

  deleteContent(lessonId: number, contentId: number): void {
    this.dynamicData.getLessonById(lessonId).subscribe((lesson: ILesson) => {
      const updatedLesson = { ...lesson };
      updatedLesson.content = updatedLesson.content.filter((content: { id: number; }) => content.id !== contentId);

      this.dynamicData.editLesson(lessonId, updatedLesson)
        .subscribe(
          () => {
            console.log(`Lesson content with ID ${contentId} removed successfully`);
            this.dialogRef.close(true);
            window.location.reload();
          },
          (error) => {
            console.error(`Failed to remove lesson content with ID ${contentId}:`, error);
            this.dialogRef.close(false);
          }
        );
    });
  }
}
