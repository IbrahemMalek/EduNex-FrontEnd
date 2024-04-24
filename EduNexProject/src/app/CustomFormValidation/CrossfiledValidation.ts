import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function passwordMatched(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (!password || !confirmPassword || !password.value || !confirmPassword.value) {
      return null;
    }

    if (password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ unMatchedPassword: true }); // Set error directly on the control
      return { 'unMatchedPassword': true };
    } else {
      return null;
    }
  };
}
