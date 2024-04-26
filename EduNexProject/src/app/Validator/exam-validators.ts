import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

//Create Exam Validators
export function isAnyValueMissing(control: AbstractControl): { [key: string]: any } | null {
  const startDate = control.get('startDate')?.value;
  const startTime = control.get('startTime')?.value;
  const endDate = control.get('endDate')?.value;
  const endTime = control.get('endTime')?.value;
  const duration = control.get('duration')?.value;

  if (!startDate || !startTime || !endDate || !endTime || !duration) {
    return { 'anyValueMissing': { message: 'your message here' } };
  }

  return null;
}

export function isStartDateAfterEndDate(control: AbstractControl): { [key: string]: any } | null {
  const startDate = new Date(control.get('startDate')?.value);
  const endDate = new Date(control.get('endDate')?.value);

  if (startDate > endDate) {
    return { 'startDateAfterEndDate': { message: 'your message here' } };
  }

  return null;
}

export function isDurationValid(control: AbstractControl): { [key: string]: any } | null {
  const startDateValue = control.get('startDate')?.value;
  const startTimeValue = control.get('startTime')?.value;
  const endDateValue = control.get('endDate')?.value;
  const endTimeValue = control.get('endTime')?.value;

  if (!startDateValue || !startTimeValue || !endDateValue || !endTimeValue) {
    return null;
  }

  const startDateString = startDateValue.toISOString().split('T')[0];
  const endDateString = endDateValue.toISOString().split('T')[0];

  const startDateTime = new Date(`${startDateString}T${startTimeValue}:00.000Z`);
  const endDateTime = new Date(`${endDateString}T${endTimeValue}:00.000Z`);

  const durationInMinutes = parseInt(control.get('duration')?.value);
  const differenceInMinutes = Math.floor((endDateTime.getTime() - startDateTime.getTime()) / (1000 * 60));

  if (durationInMinutes > differenceInMinutes) {
    return { 'durationInvalid': { message: 'your message here' } };
  }

  return null;
}

export function isStartDatePast(control: AbstractControl): { [key: string]: any } | null {
  const startDate = new Date(control.get('startDate')?.value);
  const today = new Date();

  if (startDate <= today) {
    return { 'startDatePast': { message: 'your message here' } };
  }

  return null;
}


//Student Exam Validators
export function atLeastOneCheckboxChecked(): ValidatorFn {
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
    return isAtLeastOneChecked ? null : { 'atLeastOneCheckboxChecked': { message: 'your message here' } };
  };
}

export function atLeastOneRadioButtonChecked(): ValidatorFn {
  return (formGroup: AbstractControl): ValidationErrors | null => {
    let isAtLeastOneChecked = false;
    if (formGroup instanceof FormGroup) {
      Object.keys(formGroup.controls).forEach(key => {
        const control = formGroup.get(key);
        if (control instanceof FormControl && control.value !== null && control.value !== undefined) {
          isAtLeastOneChecked = true;
        }
      });
    }
    return isAtLeastOneChecked ? null : { 'atLeastOneRadioButtonChecked': { message: 'your message here' } };
  };
}
