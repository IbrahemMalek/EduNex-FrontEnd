import { Component, Inject, ViewChild, ElementRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ILesson } from 'src/app/Model/ilesson';
import { DynamicDataService } from 'src/app/Services/dynamic-data.service';

@Component({
  selector: 'app-content-dialog',
  templateUrl: './content-dialog.component.html',
  styleUrls: ['./content-dialog.component.css']
})
export class ContentDialogComponent {
  videoFile: File | null = null;
  pdfFile: File | null = null;

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
    this.dynamicData.getLessonById(lessonId).subscribe((lesson: ILesson) => {
      const contentToUpdateIndex = lesson.content.findIndex(content => content.id === contentId);

      if (contentToUpdateIndex !== -1) {
        const updatedLesson: ILesson = JSON.parse(JSON.stringify(lesson));

        if (this.videoFile) {
          updatedLesson.content[contentToUpdateIndex].videoUrl = this.videoFile.name;
        }
        if (this.pdfFile) {
          updatedLesson.content[contentToUpdateIndex].pdfUrl = this.pdfFile.name;
        }

        this.dynamicData.editLesson(lessonId, updatedLesson).subscribe(
          () => {
            console.log(`Lesson content with ID ${contentId} updated successfully`);
            window.location.reload();
          },
          (error) => {
            console.error(`Failed to update lesson content with ID ${contentId}:`, error);
          }
        );
      } else {
        console.error(`Lesson content with ID ${contentId} not found.`);
      }
    });
  }



  private addContent(lessonId: number): void {
    const newContentId = this.generateUniqueId();

    const newContent: any = {
      id: `${newContentId}`,
      title: this.data.contentTitle,
      videoUrl: this.videoFile ? this.videoFile.name : null,
      pdfUrl: this.pdfFile ? this.pdfFile.name : null
    };

    this.dynamicData.getLessonById(lessonId).subscribe(
      (lesson: ILesson) => {
        lesson.content = lesson.content || [];
        lesson.content.push(newContent);

        this.dynamicData.editLesson(lessonId, lesson).subscribe(
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
      },
      (error) => {
        console.error('Failed to fetch lesson by ID:', error);
        this.dialogRef.close(false);
      }
    );
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
