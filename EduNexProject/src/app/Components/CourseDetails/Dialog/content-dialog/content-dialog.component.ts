import { Component, Inject, ViewChild, ElementRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DynamicDataService } from 'src/app/Services/dynamic-data.service';
import { ICourse } from 'src/app/Model/icourse';

@Component({
  selector: 'app-content-dialog',
  templateUrl: './content-dialog.component.html',
  styleUrls: ['./content-dialog.component.css']
})
export class ContentDialogComponent {
  videoFile: File | null = null;
  pdfFile: File | null = null;
  contentType: string = '';

  @ViewChild('videoInput') videoInput!: ElementRef<HTMLInputElement>;
  @ViewChild('pdfInput') pdfInput!: ElementRef<HTMLInputElement>;

  constructor(
    public dialogRef: MatDialogRef<ContentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dynamicData: DynamicDataService
  ) { }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onYesClick(): void {
    this.dialogRef.close(true);
    if (this.data.operation === 'edit') {
      this.editContent(this.data.lessonId, this.data.contentId);
    } else {
      this.addContent(this.data.lessonId);
    }
  }

  onVideoFileSelected(event: any): void {
    this.videoFile = event.target.files[0];
  }

  onPdfFileSelected(event: any): void {
    this.pdfFile = event.target.files[0];
  }

  private editContent(lessonId: number, contentId: number): void {
    this.dynamicData.getAllCourses().subscribe((courses: ICourse[]) => {
      const courseToUpdate = courses.find(course => course.lesson?.some(lesson => lesson.id === lessonId));
      if (courseToUpdate) {
        const lessonToUpdate = courseToUpdate.lesson?.find(lesson => lesson.id === lessonId);
        if (lessonToUpdate) {
          const contentToUpdate = lessonToUpdate.content?.find(content => content.id === contentId);
          if (contentToUpdate) {
            const updatedContent = { ...contentToUpdate };
            updatedContent.title = this.contentType;
            updatedContent.videoUrl = this.videoFile?.name ?? updatedContent.videoUrl;
            updatedContent.pdfUrl = this.pdfFile?.name ?? updatedContent.pdfUrl;

            const updatedLesson = {
              ...lessonToUpdate,
              content: lessonToUpdate.content?.map(content => (content.id === contentId ? updatedContent : content))
            };

            const updatedCourse = {
              ...courseToUpdate,
              lesson: courseToUpdate.lesson?.map(lesson => (lesson.id === lessonId ? updatedLesson : lesson))
            };

            this.dynamicData.editCourse(courseToUpdate.id, updatedCourse).subscribe(
              () => {
                console.log(`Lesson content with ID ${contentId} updated successfully`);
                window.location.reload();
              },
              (error) => {
                console.error(`Failed to update lesson content with ID ${contentId}:`, error);
              }
            );
          } else {
            console.error(`Content with ID ${contentId} not found.`);
          }
        } else {
          console.error(`Lesson with ID ${lessonId} not found.`);
        }
      } else {
        console.error(`Course containing lesson with ID ${lessonId} not found.`);
      }
    });
  }


  private addContent(lessonId: number): void {
    const newContentId = this.generateUniqueId();

    const newContent: any = {
      id: `${newContentId}`,
      title: this.contentType,
      videoUrl: this.videoFile ? this.videoFile.name : null,
      pdfUrl: this.pdfFile ? this.pdfFile.name : null
    };

    this.dynamicData.getAllCourses().subscribe((courses: ICourse[]) => {
      courses.forEach(course => {
        if (course.id === this.data.courseId) {
          const updatedCourse = { ...course };
          const lesson = updatedCourse.lesson?.find(lesson => lesson.id === lessonId);

          if (lesson) {
            lesson.content = lesson.content || [];
            lesson.content.push(newContent);

            this.dynamicData.editCourse(course.id, updatedCourse).subscribe(
              () => {
                console.log('New content added successfully');
                this.dialogRef.close(true);
                window.location.reload();
              },
              (error) => {
                console.error('Failed to add new content:', error);
                this.dialogRef.close(false);
              }
            );
          } else {
            console.error(`Lesson with ID ${lessonId} not found.`);
          }
        }
      });
    });
  }

  onSubmit(): void {
    if (this.data.operation === 'edit') {
      this.editContent(this.data.lessonId, this.data.contentId);
    } else {
      this.addContent(this.data.lessonId);
    }
  }

  private generateUniqueId(): number {
    return Math.floor(Math.random() * 1000000);
  }
}
