import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { isAnyValueMissing, isDurationValid, isStartDateAfterEndDate, isStartDatePast } from 'src/app/Validator/exam-validators';



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
    }, {
      validators: [
        isAnyValueMissing,
        isStartDateAfterEndDate,
        isStartDatePast,
        isDurationValid,
      ]
    });
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onYesClick(event: Event): void {

    if (this.contentForm.invalid) {
      this.displayErrorMessages();
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
    const formErrors = this.contentForm.errors;

    if (formErrors) {
      if (formErrors['anyValueMissing']) {
        this.openSnackBar('يرجى ملء جميع الحقول', 'حسناً');
      }
      if (formErrors['startDateAfterEndDate']) {
        this.openSnackBar('تاريخ البداية يجب أن يكون قبل تاريخ الانتهاء', 'حسناً');
      }
      if (formErrors['durationInvalid']) {
        this.openSnackBar('المدة المحددة أطول من المدة الفعلية للامتحان', 'حسناً');
      }
      if (formErrors['startDatePast']) {
        this.openSnackBar('يجب أن يكون تاريخ البداية في المستقبل', 'حسناً');
      }
    } else {
      Object.keys(this.contentForm.controls).forEach(controlName => {
        const control = this.contentForm.get(controlName);
        if (control && control.errors) {
          if (control.errors?.['required']) {
            this.openSnackBar('هذا الحقل مطلوب', 'حسناً');
          }
        }
      });
    }
  }

  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 2000,
      verticalPosition: 'top',
      horizontalPosition: 'center'
    });
  }
}
