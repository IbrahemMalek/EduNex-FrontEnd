import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-question-controller',
  templateUrl: './question-controller.component.html',
  styleUrls: ['./question-controller.component.css']
})
export class QuestionControllerComponent {

  @Input() questions: any[] = [];
  @Output() questionIndexClicked: EventEmitter<number> = new EventEmitter<number>();
  @Output() addQuestionClicked: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();

  questionIndex: number = 0;

  constructor(private fb: FormBuilder) { }

  onAddQuestionClick(): void {
    if (this.questions.length < 16) {
      this.addQuestionClicked.emit();
    }
  }

  sendIndexToParent(index: number): void {
    this.questionIndex = index;
    this.questionIndexClicked.emit(index);
  }
}
