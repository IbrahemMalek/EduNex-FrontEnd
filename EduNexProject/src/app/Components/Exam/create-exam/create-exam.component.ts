import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-exam',
  templateUrl: './create-exam.component.html',
  styleUrls: ['./create-exam.component.css']
})
export class CreateExamComponent implements OnInit {
  examForm!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.examForm = this.fb.group({
      title: ['', Validators.required],
      startDateTime: ['', Validators.required],
      endDateTime: ['', Validators.required],
      duration: ['', Validators.required],
      type: ['', Validators.required],
      questionType: [''],
      questions: this.fb.array([
      ])
    });
  }

  createQuestion(questionType: string): FormGroup | void {
    if (questionType && questionType != null) {
      return this.fb.group({
        header: ['', Validators.required],
        questionType: [questionType, Validators.required],
        points: ['', Validators.required],
        answers: this.fb.array([
          this.createAnswer()
        ])
      });
    }
  }

  createAnswer(): FormGroup {
    return this.fb.group({
      header: [''],
      body: [''],
      isCorrect: [false]
    });
  }

  addQuestion(questionType: string): void {
    const newQuestion = this.createQuestion(questionType);
    this.questions.push(newQuestion);
  }


  removeQuestion(index: number): void {
    this.questions.removeAt(index);
  }

  addAnswer(questionIndex: number): void {
    const questionType = this.questions.at(questionIndex).get('questionType')?.value;
    if ((questionType === 'trueFalse' || questionType === 'essay') && this.answers(questionIndex).length > 0) {
      return;
    }
    const answerGroup = this.createAnswer();
    this.answers(questionIndex).push(answerGroup);
  }

  removeAnswer(questionIndex: number, answerIndex: number): void {
    this.answers(questionIndex).removeAt(answerIndex);
  }

  get questions(): FormArray {
    return this.examForm.get('questions') as FormArray;
  }

  answers(questionIndex: number): FormArray {
    return this.questions.at(questionIndex).get('answers') as FormArray;
  }

  onSubmit(): void {
    if (this.examForm.valid) {
      console.log(this.examForm.value);
    } else {
    }
  }

  isMultipleChoiceQuestion(questionIndex: number): boolean {
    return this.questions.at(questionIndex).get('questionType')?.value === 'multipleChoice';
  }

  isEssayQuestion(questionIndex: number): boolean {
    return this.questions.at(questionIndex).get('questionType')?.value === 'essay';
  }

  isTrueFalseQuestion(questionIndex: number): boolean {
    return this.questions.at(questionIndex).get('questionType')?.value === 'trueFalse';
  }

  onQuestionTypeChange(type: string, questionIndex: number): void {
    const question = this.questions.at(questionIndex);
    const answers = question.get('answers') as FormArray;
    if (type === 'multipleChoice') {
      answers.controls.forEach((answer) => {
        answer.get('body')?.setValidators([Validators.required]);
        answer.get('isCorrect')?.setValidators([Validators.required]);
      });
    } else if (type === 'essay') {
      answers.controls.forEach((answer) => {
        answer.get('body')?.clearValidators();
        answer.get('isCorrect')?.clearValidators();
      });
    }
    question.patchValue({ questionType: type });
  }

}
