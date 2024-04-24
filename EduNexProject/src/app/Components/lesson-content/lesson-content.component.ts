import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ILesson } from 'src/app/Model/ilesson';
import { ILessonContent } from 'src/app/Model/ilesson-content';

@Component({
  selector: 'app-lesson-content',
  templateUrl: './lesson-content.component.html',
  styleUrls: ['./lesson-content.component.css']
})
export class LessonContentComponent implements OnInit {
  lesson!: ILesson;
  contentIndex: number = 0;
  panelOpenState = false;
  selected?: boolean;

  videoOptions: { label: string; selected: boolean; videoUrl: string; }[] = [];
  fileOptions: { label: string; pdfUrl: string; }[] = [];
  selectedVideoUrl: string = '';

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.lesson = history.state.lesson;
    // console.log(this.lesson);
    this.initOptions();
  }

  initOptions() {
    if (this.lesson && this.lesson.content) {
      this.lesson.content.forEach((content: ILessonContent, index: number) => {
        if (content.videoUrl) {
          const isSelected = index === 0;
          this.videoOptions.push({ label: content.title, selected: isSelected, videoUrl: content.videoUrl });
          if (isSelected) {
            this.selectedVideoUrl = content.videoUrl;
          }
        }
        if (content.pdfUrl) {
          this.fileOptions.push({ label: content.title, pdfUrl: content.pdfUrl });
        }
      });
    }
  }

  toggleOption(index: number) {
    this.videoOptions.forEach((videoOption, i) => {
      videoOption.selected = i === index;
    });
    this.selectedVideoUrl = this.videoOptions[index].videoUrl;
  }
}
