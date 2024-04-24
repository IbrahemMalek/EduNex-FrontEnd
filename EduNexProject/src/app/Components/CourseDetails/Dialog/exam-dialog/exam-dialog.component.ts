import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-exam-dialog',
  templateUrl: './exam-dialog.component.html',
  styleUrls: ['./exam-dialog.component.css']
})
export class ExamDialogComponent {
  contentForm!: FormGroup;
  @Output() formDataSubmitted: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    public dialogRef: MatDialogRef<ExamDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.contentForm = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.pattern(/^[\u0600-\u06FF\u0750-\u077F\s0-9a-zA-Z]+$/)]),
      startTime: new FormControl('', Validators.required),
      endTime: new FormControl('', Validators.required),
      startDate: new FormControl('', Validators.required),
      endDate: new FormControl('', Validators.required),
      duration: new FormControl('', [Validators.required, Validators.min(5), Validators.max(180)]),
    });
  }

  // Separated validation functions
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

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onYesClick(event: Event): void {
    // event.preventDefault();

    if (this.contentForm.invalid) {
      this.displayErrorMessages();
      return;
    }

    if (this.isAnyValueMissing(this.contentForm)) {
      this.openSnackBar('الرجاء ملء جميع الحقول', 'حسناً');
      return;
    }

    if (this.isStartDateAfterEndDate(this.contentForm)) {
      this.openSnackBar('تاريخ البدء يجب أن يكون قبل تاريخ الانتهاء', 'حسناً');
      return;
    }

    if (this.isDurationValid(this.contentForm)) {
      this.openSnackBar('المدة يجب أن تكون أطول من مدة الامتحان', 'حسناً');
      return;
    }

    if (this.isStartDatePast(this.contentForm)) {
      this.openSnackBar('تاريخ البدء يجب أن يكون بعد تاريخ اليوم', 'حسناً');
      return;
    }

    const formData = this.contentForm.value;
    this.dialogRef.close();
    this.router.navigate(['/course', this.data.courseID, 'lesson', this.data.lessonId, 'create'], {
      queryParams: {
        type: this.data.examType,
        title: formData.title,
        startTime: formData.startTime,
        endTime: formData.endTime,
        startDate: formData.startDate,
        endDate: formData.endDate,
        duration: formData.duration,
        grade: this.data.grade,
        courseTitle: this.data.courseTitle,
        lessonTitle: this.data.lessonTitle,
      }
    });
  }

  displayErrorMessages(): void {
    Object.keys(this.contentForm.controls).forEach(controlName => {
      const control = this.contentForm.get(controlName);
      const errors = control?.errors;
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

  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 2000,
      verticalPosition: 'top',
      horizontalPosition: 'center'
    });
  }
}
