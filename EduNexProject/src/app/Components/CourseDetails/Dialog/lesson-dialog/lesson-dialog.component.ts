import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ICourse } from 'src/app/Model/icourse';
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
      const courseId = this.data.courseId;
      this.dynamicData.getCourseById(courseId).subscribe((course: ICourse) => {
        const updatedCourse: ICourse = { ...course };

        if (updatedCourse.lesson) {
          const lessonToUpdate = updatedCourse.lesson.find(lesson => lesson.id === this.data.initialLessonId);

          if (lessonToUpdate) {
            lessonToUpdate.title = this.lessonTitle;
          } else {
            console.error(`Lesson with ID ${this.data.initialLessonId} not found in course.`);
            return;
          }
        } else {
          console.error(`Lesson array not found in course with ID ${courseId}.`);
          return;
        }

        this.dynamicData.editCourse(courseId, updatedCourse).subscribe(
          () => {
            console.log(`Course with ID ${courseId} updated successfully`);
            window.location.reload();
          },
          (error) => {
            console.error(`Failed to update course with ID ${courseId}:`, error);
          }
        );
      });
    } else {
      const courseId = this.data.courseId;
      this.dynamicData.getCourseById(courseId).subscribe((course: ICourse) => {
        const updatedCourse: ICourse = { ...course };

        if (updatedCourse.lesson) {
          const newLessonId = this.generateUniqueId();

          const newLesson: any = {
            id: `${newLessonId}`,
            title: this.lessonTitle,
            content: []
          };

          updatedCourse.lesson.push(newLesson);

          this.dynamicData.editCourse(courseId, updatedCourse).subscribe(
            () => {
              console.log(`Course with ID ${courseId} updated successfully with new lesson.`);
              window.location.reload();
            },
            (error) => {
              console.error(`Failed to update course with ID ${courseId}:`, error);
            }
          );
        } else {
          console.error(`Lesson array not found in course with ID ${courseId}.`);
          return;
        }
      });
    }

  }
  private generateUniqueId(): number {
    return Math.floor(Math.random() * 1000000);
  }
}
