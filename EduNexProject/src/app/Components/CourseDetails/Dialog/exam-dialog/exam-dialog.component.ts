import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DynamicDataService } from 'src/app/Services/dynamic-data.service';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';

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
    private dynamicData: DynamicDataService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.contentForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      startTime: new FormControl('', Validators.required),
      endTime: new FormControl('', Validators.required),
      startDate: new FormControl('', Validators.required),
      endDate: new FormControl('', Validators.required),
      duration: new FormControl('', Validators.required),
    });

    // this.contentForm.setValidators(this.dateValidator.bind(this));
  }

  dateValidator(control: AbstractControl) {
    const startDate = control.get('startDate')?.value;
    const startTime = control.get('startTime')?.value;
    const endDate = control.get('endDate')?.value;
    const endTime = control.get('endTime')?.value;
    const duration = control.get('duration')?.value;

    if (!startDate || !startTime || !endDate || !endTime || !duration) {
      return Promise.resolve(null);
    }

    const startDateTime = new Date(startDate + ' ' + startTime);
    const endDateTime = new Date(endDate + ' ' + endTime);

    if (startDateTime >= endDateTime) {
      return Promise.resolve({ dateMismatch: true });
    }

    const durationInMinutes = parseInt(duration);
    const differenceInMinutes = Math.floor((endDateTime.getTime() - startDateTime.getTime()) / (1000 * 60));

    if (durationInMinutes <= differenceInMinutes) {
      return Promise.resolve({ durationMismatch: true });
    }

    return Promise.resolve(null);
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onYesClick(): void {
    if (this.contentForm.valid) {
      const formData = this.contentForm.value;
      this.dialogRef.close();
      this.router.navigate(['/course', this.data.courseID, 'lesson', this.data.lessonId], {
        queryParams: {
          type: this.data.examType,
          title: formData.title,
          startTime: formData.startTime,
          endTime: formData.endTime,
          startDate: formData.startDate,
          endDate: formData.endDate,
          duration: formData.duration
        }
      });
    }
  }
}
