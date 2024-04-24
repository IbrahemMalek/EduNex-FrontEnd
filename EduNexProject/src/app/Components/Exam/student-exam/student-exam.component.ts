import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidatorFn, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ICourse } from 'src/app/Model/icourse';
import { IExam } from 'src/app/Model/iexam';
import { IQuestion } from 'src/app/Model/iquestion';
import { DynamicDataService } from 'src/app/Services/dynamic-data.service';

@Component({
  selector: 'app-student-exam',
  templateUrl: './student-exam.component.html',
  styleUrls: ['./student-exam.component.css']
})
export class StudentExamComponent implements OnInit {
  courseId!: number;
  lessonId!: number;
  exam!: IExam;
  course!: ICourse;
  questions!: IQuestion[];
  selectedQuestionIndex: number = 0;
  visitedQuestions: boolean[] = [];
  form: FormGroup;
  skippedQuestions: boolean[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private dynamicData: DynamicDataService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({});
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.courseId = params['courseId'];
      this.lessonId = params['lessonId'];
    });
    this.getCourseById(this.courseId);
    this.getExamById(1);
    this.visitedQuestions[0] = true;
  }

  getExamById(id: number) {
    this.dynamicData.getExamById(id).subscribe(exam => {
      this.exam = exam;
      this.questions = exam.questions;
      this.buildFormControls();
    });
  }

  getCourseById(id: number) {
    this.dynamicData.getCourseById(id).subscribe(course => {
      this.course = course;
    });
  }

  getLessonTitle(lessonId: number): string {
    if (this.course && this.course.lesson) {
      const lesson = this.course.lesson.find(lesson => lesson.id === lessonId);
      if (lesson) {
        return lesson.title;
      }
    }
    return '';
  }

  buildFormControls() {
    const formControls: { [key: string]: any } = {};
    this.exam.questions.forEach((question, i) => {
      const questionControls: { [key: string]: any } = {};
      question.answers.forEach((answer, j) => {
        questionControls['answer_' + i + '_' + j] = new FormControl(false);
      });
      formControls['question_' + i] = new FormGroup(questionControls);
      // Apply custom validator for each question
      formControls['question_' + i].setValidators(this.atLeastOneCheckboxChecked());
    });
    // Set the form group with form controls
    this.form = this.fb.group(formControls);
  }

  selectQuestion(index: number) {
    if (index === 0 || this.visitedQuestions[index]) {
      this.selectedQuestionIndex = index;
    }
  }


  navigateBack() {
    if (this.selectedQuestionIndex > 0) {
      this.selectedQuestionIndex--;
    }
  }

  navigateForward() {
    this.form.get('question_' + this.selectedQuestionIndex)?.markAllAsTouched();
    if (this.form.get('question_' + this.selectedQuestionIndex)?.invalid) {
      return;
    }

    this.visitedQuestions[this.selectedQuestionIndex] = true;

    if (!this.visitedQuestions[this.selectedQuestionIndex + 1] && !this.skippedQuestions[this.selectedQuestionIndex + 1]) {
      this.visitedQuestions[this.selectedQuestionIndex + 1] = true;
    }

    this.selectedQuestionIndex++;

    this.updateQuestionButtonClasses(this.selectedQuestionIndex - 1, 'solved', 'skipped');
  }

  skipQuestion() {
    this.visitedQuestions[this.selectedQuestionIndex + 1] = true;
    this.skippedQuestions[this.selectedQuestionIndex] = true;
    this.selectedQuestionIndex++;
  }

  updateQuestionButtonClasses(index: number, addClass: string, removeClass: string) {
    const buttons = document.querySelectorAll('.circle-button');
    buttons.forEach((button, i) => {
      if (i === index) {
        button.classList.add(addClass);
        button.classList.remove(removeClass);
      }
    });
  }

  atLeastOneCheckboxChecked(): ValidatorFn {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      let isAtLeastOneChecked = false;
      if (formGroup instanceof FormGroup) {
        Object.keys(formGroup.controls).forEach(key => {
          const control = formGroup.get(key);
          if (control instanceof FormControl && control.value === true) {
            isAtLeastOneChecked = true;
          }
        });
      }
      return isAtLeastOneChecked ? null : { 'atLeastOneCheckboxChecked': true };
    };
  }
}
