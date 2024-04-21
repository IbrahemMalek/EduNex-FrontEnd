import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IExam } from 'src/app/Model/iexam';
import { DynamicDataService } from 'src/app/Services/dynamic-data.service';

@Component({
  selector: 'app-create-exam',
  templateUrl: './create-exam.component.html',
  styleUrls: ['./create-exam.component.css']
})
export class CreateExamComponent implements OnInit {
  examForm!: FormGroup;
  activeSection: string = 'questionSettings';
  questionIndex: number = 0;
  examID: number = 1;
  exam!: IExam;
  questions: any[] = [];

  get questionsControls(): FormArray {
    return this.examForm.get('questions') as FormArray;
  }

  constructor(private fb: FormBuilder, private activatedRoute: ActivatedRoute, private dynamicData: DynamicDataService) { }

  ngOnInit(): void {
    this.examForm = this.fb.group({
      examId: [this.questionIndex],
      title: ['', Validators.required],
      startDate: [new Date(), Validators.required],
      endDate: [new Date(), Validators.required],
      startTime: [0, Validators.required],
      endTime: [0, Validators.required],
      duration: [0, Validators.required],
      type: ['', Validators.required],
      points: [0, Validators.required],
      header: ['', Validators.required],
      questions: this.fb.array([]),
    });

    this.activatedRoute.queryParams.subscribe(params => {
      const startDate = params['startDate'] ? new Date(params['startDate']) : new Date();
      const endDate = params['endDate'] ? new Date(params['endDate']) : new Date();

      this.examForm.patchValue({
        title: params['title'] || '',
        startTime: params['startTime'] || '',
        endTime: params['endTime'] || '',
        startDate: startDate,
        endDate: endDate,
        duration: params['duration'] || ''
      });
    });

    this.getExamById();
  }


  getExamById() {
    this.dynamicData.getExamById(this.examID).subscribe(exam => {
      this.exam = exam;
      this.questions = exam.questions;
      this.setQuestionsFormArray();
    });
  }

  setQuestionsFormArray(): void {
    const questionsFormArray = this.examForm.get('questions') as FormArray;
    this.questions.forEach(question => {
      questionsFormArray.push(this.createQuestionFormGroup(question));
    });
  }

  createQuestionFormGroup(question: any): FormGroup {
    const answersArray = question.answers.map((answer: any) => this.createAnswerFormGroup(answer));
    return this.fb.group({
      questionId: [question?.questionId || 0],
      header: [question?.header || '', Validators.required],
      type: [question?.type || '', Validators.required],
      points: [question?.points || 0, Validators.required],
      answers: this.fb.array(answersArray)
    });
  }


  createAnswerFormGroup(answer: any): FormGroup {
    return this.fb.group({
      answerId: [answer?.answerId || 0],
      header: [answer?.header || '', Validators.required],
      isCorrect: [answer?.isCorrect || null]
    });
  }

  addQuestion(): void {
    const questionsFormArray = this.examForm.get('questions') as FormArray;
    questionsFormArray.push(this.createQuestionFormGroup({}));
  }

  removeQuestion(index: number): void {
    const questionsFormArray = this.examForm.get('questions') as FormArray;
    questionsFormArray.removeAt(index);
  }

  addAnswer(): void {
    const questionType = this.examForm.get('type')?.value;
    const answersLength = this.getAnswersControls()?.length || 0;

    const answerFormArray = this.getAnswersControls() || this.createAnswerFormArray();
    if (!answerFormArray) {
      console.error('Error: Answers FormArray is not initialized.');
      return;
    }

    if (
      (questionType === 'multipleChoice' || questionType === 'oneChoice') && answersLength < 4 ||
      (questionType === 'trueFalse' && answersLength < 1)
    ) {
      answerFormArray.push(this.createAnswerFormGroup({}));
    }
  }

  private createAnswerFormArray(): FormArray {
    return this.fb.array([]);
  }

  removeAnswer(answerIndex: number): void {
    const answerFormArray = this.getAnswersControls();
    answerFormArray?.removeAt(answerIndex);
  }

  getAnswersControls(): FormArray | undefined {
    if (this.questionIndex === -1) {
      console.error('No question selected.');
      return;
    }
    const questionsFormArray = this.examForm.get('questions') as FormArray;
    const questionControl = questionsFormArray.at(this.questionIndex);
    if (!questionControl) {
      // console.error(`Question index ${this.questionIndex} is out of bounds.`);
      return;
    }
    let answersArray = questionControl.get('answers') as FormArray;
    if (!answersArray) {
      answersArray = this.createAnswerFormArray();
      questionControl.patchValue({ answers: answersArray });
    }
    return answersArray;
  }

  getQuestionFormGroup(index: number): FormGroup {
    return this.questionsControls.at(index) as FormGroup;
  }


  onSubmit(): void {
    if (this.examForm.valid) {
      console.log(this.examForm.value);
    }
  }

  range(start: number, end: number): number[] {
    return Array.from({ length: end - start + 1 }, (_, index) => start + index);
  }

  handleAnswerSelection(selectedAnswerIndex: number, isTrueAnswer: boolean): void {
    const questionType = this.examForm.get('type')?.value;

    if (questionType === 'oneChoice') {
      const answerFormArray = this.getAnswersControls();
      if (!answerFormArray) {
        console.error('Error: Answers FormArray is not initialized.');
        return;
      }

      const answersLength = answerFormArray.length;
      for (let i = 0; i < answersLength; i++) {
        const answerFormGroup = answerFormArray.at(i) as FormGroup;
        const isCorrectControl = answerFormGroup.get('isCorrect');
        if (isCorrectControl && i === selectedAnswerIndex) {
          isCorrectControl.patchValue(isTrueAnswer);
        } else if (isCorrectControl) {
          if (isTrueAnswer) {
            isCorrectControl.patchValue(false);
          }
        }
      }
    }
  }

  handleQuestionIndexClicked(index: number): void {
    // console.log('Question index clicked:', index);
    this.questionIndex = index;
  }

  onAddQuestionClicked(): void {
    this.questions.push({});
  }

  onSaveClicked(): void {
    console.log(this.examForm.value.questions);
  }

}

