import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { DynamicDataService } from 'src/app/Services/dynamic-data.service';
@Component({
  selector: 'app-create-exam',
  templateUrl: './create-exam.component.html',
  styleUrls: ['./create-exam.component.css']
})
export class CreateExamComponent implements OnInit {
  examForm!: FormGroup;
  activeSection: string = 'questionSettings';
  activeQuestions: boolean[] = [];
  activeQuestionIndex: number = 0;
  questionIndex: number = 0;
  questions: any[] = [];
  selectedValue: number = 10;
  courseTitle!: string;
  lessonTitle!: string;
  questionsControls!: FormArray;

  formSubmitted: boolean = false;
  // @Output() formSubmit: EventEmitter<void> = new EventEmitter<void>();

  constructor(private fb: FormBuilder, private activatedRoute: ActivatedRoute, private dynamicData: DynamicDataService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.examForm = this.fb.group({
      examId: [this.questionIndex],
      title: ['', [Validators.required, Validators.pattern(/^[\u0600-\u06FF\u0750-\u077F\s0-9a-zA-Z]+$/)]],
      startDate: [new Date(), Validators.required],
      endDate: [new Date(), Validators.required],
      startTime: [0, Validators.required],
      endTime: [0, Validators.required],
      duration: [0, [Validators.required, Validators.min(5), Validators.max(180)]],
      questions: this.fb.array([]),
    });

    this.examForm.get('questionIndex')?.valueChanges.subscribe((index: number) => {
      this.activeQuestionIndex = index;
      this.updateAnswersControls();
    });

    this.questionsControls = this.examForm.get('questions') as FormArray;
    for (let i = 0; i < this.questionsControls.length; i++) {
      this.activeQuestions.push(false);
    }

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

      this.courseTitle = params['courseTitle'] || '';
      this.lessonTitle = params['lessonTitle'] || '';
    });
  }


  get questionFormGroup(): FormGroup {
    if (this.questionIndex >= 0 && this.questionIndex < this.questionsControls.length) {
      return this.questionsControls.at(this.questionIndex) as FormGroup;
    } else {
      return this.fb.group({});
    }
  }

  updateAnswersControls(): void {
    const activeQuestionFormGroup = this.getQuestionFormGroup(this.activeQuestionIndex);
    if (!activeQuestionFormGroup) {
      console.error('Active question form group not found.');
      return;
    }

    const answersFormArray = activeQuestionFormGroup.get('answers') as FormArray;
    if (!answersFormArray) {
      console.error('Answers form array not found.');
      return;
    }

    // const answersControls = answersFormArray.controls;
    // console.log(answersControls);
  }


  handleQuestionIndexClicked(index: number): void {
    if (index != this.activeQuestionIndex) {
      this.activeQuestions[index] = !this.activeQuestions[index];
      this.activeQuestionIndex = this.activeQuestionIndex === index ? -1 : index;
    }
  }

  getAnswersForActiveQuestion(): FormArray | undefined {
    if (this.activeQuestionIndex === -1) {
      console.error('No active question selected.');
      return;
    }
    const activeQuestionFormGroup = this.getQuestionFormGroup(this.activeQuestionIndex);
    if (!activeQuestionFormGroup) {
      console.error('Active question form group not found.');
      return;
    }
    return activeQuestionFormGroup.get('answers') as FormArray;
  }

  isQuestionInvalid(index: number): boolean {
    const questionFormGroup = this.questionsControls.at(index) as FormGroup;
    return questionFormGroup.invalid;
  }

  getFormArrayControls(control: AbstractControl | null): AbstractControl[] {
    if (control instanceof FormArray) {
      return control.controls;
    }
    return [];
  }

  createQuestionFormGroup(): FormGroup {
    return this.fb.group({
      points: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
      header: ['', [Validators.required, Validators.pattern(/^[\u0600-\u06FF\u0750-\u077F\s0-9a-zA-Z]+$/)]],
      type: ['', Validators.required],
      answers: this.fb.array([])
    });
  }

  createAnswerFormGroup(answer: any, questionType: string, index: number): FormGroup {
    let headerValue = '';
    if (questionType === 'trueFalse') {
      headerValue = index === 0 ? 'صح' : 'خطأ';
    }

    return this.fb.group({
      answerId: [answer?.answerId || 0],
      header: [headerValue, Validators.required],
      isCorrect: [answer?.isCorrect || null, Validators.required]
    }) as FormGroup;
  }

  addQuestion(): void {
    const questionFormGroup = this.createQuestionFormGroup();
    this.questionsControls.push(questionFormGroup);
  }

  removeQuestion(index: number): void {
    this.questionsControls.removeAt(index);
    this.activeQuestions.splice(index, 1);
  }

  addAnswer(questionIndex: number): void {
    const activeQuestionFormGroup = this.getQuestionFormGroup(questionIndex);

    if (!activeQuestionFormGroup) {
      console.error('Active question form group not found.');
      return;
    }

    const questionType = activeQuestionFormGroup.get('type')?.value;

    if (!questionType) {
      console.error('Question type not found.');
      return;
    }

    const answersFormArray = activeQuestionFormGroup.get('answers') as FormArray;

    if (!answersFormArray) {
      console.error('Answers form array not found.');
      return;
    }

    if (!this.isAnswersLimitReached(questionIndex)) {
      answersFormArray.push(this.createAnswerFormGroup({}, questionType, answersFormArray.length));
    } else {
      console.error('Maximum number of answers reached.');
      return;
    }
  }


  isAnswersLimitReached(questionIndex: number): boolean {
    const questionFormGroup = this.getQuestionFormGroup(questionIndex);
    if (!questionFormGroup) {
      return false;
    }

    const questionType = questionFormGroup.get('type')?.value;
    const answersLength = (questionFormGroup.get('answers') as FormArray)?.length ?? 0;

    return (
      (questionType === 'multipleChoice' || questionType === 'oneChoice') && answersLength >= 4 ||
      (questionType === 'trueFalse' && answersLength >= 2)
    );
  }

  private createAnswerFormArray(): FormArray {
    return this.fb.array([]);
  }

  removeAnswer(questionIndex: number, answerIndex: number): void {
    const activeQuestionFormGroup = this.getQuestionFormGroup(questionIndex);
    const answersFormArray = activeQuestionFormGroup.get('answers') as FormArray;

    if (!answersFormArray) {
      console.error('Answers form array not found.');
      return;
    }

    answersFormArray.removeAt(answerIndex);
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

  getAnswerFormGroup(questionIndex: number, answerIndex: number): FormGroup {
    const questionFormGroup = this.getQuestionFormGroup(questionIndex);
    if (!questionFormGroup) {
      console.error('Question form group not found.');
      return this.fb.group({});
    }

    const answersFormArray = questionFormGroup.get('answers') as FormArray;
    if (!answersFormArray) {
      console.error('Answers form array not found.');
      return this.fb.group({});
    }

    if (answerIndex >= 0 && answerIndex < answersFormArray.length) {
      return answersFormArray.at(answerIndex) as FormGroup;
    } else {
      console.error('Answer form group not found.');
      return this.fb.group({});
    }
  }

  handleAnswerSelection(questionIndex: number, selectedAnswerIndex: number, isTrueAnswer: boolean): void {
    const questionFormGroup = this.getQuestionFormGroup(questionIndex);
    if (questionFormGroup) {
      const questionType = questionFormGroup.get('type')?.value;
      if ((questionType === 'oneChoice' || questionType === 'trueFalse') && isTrueAnswer) {
        const answersFormArray = questionFormGroup.get('answers') as FormArray;
        if (answersFormArray) {
          for (let i = 0; i < answersFormArray.length; i++) {
            if (i !== selectedAnswerIndex) {
              const answerFormGroup = answersFormArray.at(i) as FormGroup;
              const isCorrectControl = answerFormGroup.get('isCorrect');
              if (isCorrectControl) {
                isCorrectControl.setValue(false);
              }
            }
          }
        }
      }
      const answerFormGroup = this.getAnswerFormGroup(questionIndex, selectedAnswerIndex);
      if (answerFormGroup) {
        const isCorrectControl = answerFormGroup.get('isCorrect');
        if (isCorrectControl) {
          isCorrectControl.setValue(isTrueAnswer);
        }
      }
    }

    // Check if at least one answer is marked as correct
    const answersArray = this.getAnswersForActiveQuestion();
    if (answersArray && !answersArray.controls.some(control => control.get('isCorrect')?.value === true)) {
      const questionFormGroup = this.getQuestionFormGroup(questionIndex);
      if (questionFormGroup) {
        const answersFormArray = questionFormGroup.get('answers') as FormArray;
        if (answersFormArray) {
          const errorMessageControl = answersFormArray.controls[selectedAnswerIndex].get('isCorrect');
          if (errorMessageControl) {
            errorMessageControl.setErrors({ 'atLeastOneTrueFalseRequired': true });
          }
        }
      }
    } else {
      const questionFormGroup = this.getQuestionFormGroup(questionIndex);
      if (questionFormGroup) {
        const answersFormArray = questionFormGroup.get('answers') as FormArray;
        if (answersFormArray) {
          const errorMessageControl = answersFormArray.controls[selectedAnswerIndex].get('isCorrect');
          if (errorMessageControl) {
            errorMessageControl.setErrors(null);
          }
        }
      }
    }
  }


  onAddQuestionClicked(): void {
    const questionsFormArray = this.examForm.get('questions') as FormArray;
    questionsFormArray.push(this.createQuestionFormGroup());
    this.examForm.markAsDirty();
  }

  onSaveClicked(): void {
    console.log(this.examForm.value);

    this.examForm.markAllAsTouched();
    this.formSubmitted = true;

    if (this.isAnyValueMissing(this.examForm)) {
      this.openSnackBar('الرجاء ملء جميع الحقول', 'حسناً');
      return;
    }

    if (this.isStartDateAfterEndDate(this.examForm)) {
      this.openSnackBar('تاريخ البدء يجب أن يكون قبل تاريخ الانتهاء', 'حسناً');
      return;
    }

    if (this.isDurationValid(this.examForm)) {
      this.openSnackBar('المدة يجب أن تكون أطول من مدة الامتحان', 'حسناً');
      return;
    }

    if (this.isStartDatePast(this.examForm)) {
      this.openSnackBar('تاريخ البدء يجب أن يكون بعد تاريخ اليوم', 'حسناً');
      return;
    }

    if (this.examForm.valid) {
      console.log('Form submitted successfully!');
    } else {
      console.log('Form validation failed.');
      this.displayErrorMessages();
    }
  }

  //SnackBar
  displayErrorMessages(): void {
    Object.keys(this.examForm.controls).forEach(controlName => {
      const control = this.examForm.get(controlName);
      const errors = control?.errors;
      // console.log(`Control Name: ${controlName}`);
      // console.log(`Control Value: ${control?.value}`);
      // console.log(`Errors: ${errors}`);
      if (errors) {
        Object.keys(errors).forEach(errorName => {
          let errorMessage = '';
          switch (errorName) {
            case 'required':
              errorMessage = 'هذا الحقل مطلوب';
              break;
            default:
              errorMessage = 'خطأ غير معروف';
          }
          this.openSnackBar(errorMessage, 'حسناً');
        });
      }
    });
  }

  isAnyValueMissing(control: AbstractControl): boolean {
    return !control.get('startDate')?.value || !control.get('startTime')?.value ||
      !control.get('endDate')?.value || !control.get('endTime')?.value ||
      !control.get('duration')?.value;
  }

  isStartDateAfterEndDate(control: AbstractControl): boolean {
    const startDate = new Date(control.get('startDate')?.value);
    const endDate = new Date(control.get('endDate')?.value);
    return startDate > endDate;
  }

  isDurationValid(control: AbstractControl): boolean {
    const startDate = new Date(control.get('startDate')?.value);
    const startTime = control.get('startTime')?.value;
    const endDate = new Date(control.get('endDate')?.value);
    const endTime = control.get('endTime')?.value;

    const startDateString = startDate.toISOString().split('T')[0];
    const endDateString = endDate.toISOString().split('T')[0];

    const startDateTime = new Date(`${startDateString}T${startTime}:00.000Z`);
    const endDateTime = new Date(`${endDateString}T${endTime}:00.000Z`);

    const durationInMinutes = parseInt(control.get('duration')?.value);
    const differenceInMinutes = Math.floor((endDateTime.getTime() - startDateTime.getTime()) / (1000 * 60));

    return durationInMinutes > differenceInMinutes;
  }

  isStartDatePast(control: AbstractControl): boolean {
    const startDate = new Date(control.get('startDate')?.value);
    const today = new Date();
    return startDate <= today;
  }

  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 2000,
      verticalPosition: 'top',
      horizontalPosition: 'center'
    });
  }
}

