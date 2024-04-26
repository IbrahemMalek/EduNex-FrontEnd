import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidatorFn, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { ICourse } from 'src/app/Model/icourse';
import { IExam, IQuestion } from 'src/app/Model/iexam';

import { DynamicDataService } from 'src/app/Services/dynamic-data.service';
import { atLeastOneCheckboxChecked, atLeastOneRadioButtonChecked } from 'src/app/Validator/exam-validators';

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
    private fb: FormBuilder,
    private router: Router
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
        if (question.type === 'multipleChoice') {
          questionControls['answer_' + i + '_' + j] = new FormControl(false);
        } else {
          questionControls['answer_' + i] = new FormControl(null);
        }
      });
      formControls['question_' + i] = new FormGroup(questionControls);
      if (question.type === 'multipleChoice') {
        formControls['question_' + i].setValidators(atLeastOneCheckboxChecked());
      } else {
        formControls['question_' + i].setValidators(atLeastOneRadioButtonChecked());
      }
    });
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
    if (this.selectedQuestionIndex === this.exam.questions.length - 1) {
      const navigationExtras: NavigationExtras = {
        replaceUrl: true
      };
      this.router.navigate(['/course', this.courseId, 'lesson', this.lessonId, 'result'], navigationExtras);
      return;
    }

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

    if (this.selectedQuestionIndex === this.exam.questions.length) {
      const formData: { questionId: number, selectedAnswersIds: number[] }[] = [];
      this.exam.questions.forEach((question, i) => {
        const selectedAnswersIds: number[] = [];
        const questionFormGroup = this.form.get('question_' + i) as FormGroup;
        if (questionFormGroup) {
          Object.keys(questionFormGroup.controls).forEach(key => {
            const control = questionFormGroup.get(key);
            if (control?.value) {
              selectedAnswersIds.push(parseInt(key.split('_').pop() || '0'));
            }
          });
        }
        formData.push({
          questionId: i,
          selectedAnswersIds: selectedAnswersIds
        });
      });
      console.log('Formatted Form Data:', { answers: formData });
      this.router.navigate(['/course', this.courseId, 'lesson', this.lessonId, 'result'])
      // this.submitFormattedFormData({ answers: formData });
    }
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
}
