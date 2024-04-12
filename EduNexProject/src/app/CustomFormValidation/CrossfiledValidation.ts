import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function passwordMatched(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    let password = control.get('password');
    let confirmPassword = control.get('ConfirmPassword');

    if (!password || !confirmPassword || !password.value || !confirmPassword.value) {
      return null;
    }

    return password.value === confirmPassword.value ? null : { 'unMatchedPassword': { 'pass': password.value, 'confirm': confirmPassword.value } };
  };
}
