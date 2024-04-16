import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-lesson-dialog',
  templateUrl: './lesson-dialog.component.html',
  styleUrls: ['./lesson-dialog.component.css']
})
export class LessonDialogComponent {
  lessonTitle: string = '';

  constructor(
    public dialogRef: MatDialogRef<LessonDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
  onSubmit(): void {
    this.dialogRef.close(this.lessonTitle);
  }
}
