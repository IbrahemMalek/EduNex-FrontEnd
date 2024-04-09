import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  isInputFocused: boolean = false;
  signupForm!: FormGroup
  constructor(private fb: FormBuilder) { }
  onInputFocus() {
    this.isInputFocused = true;
  }

  onInputBlur() {
    this.isInputFocused = false;
  }


ngOnInit() {
  this.signupForm = this.fb.group({
    fullName: ['', Validators.required],
    studentPhoneNumber: ['', Validators.required],
    fatherPhoneNumber: ['', Validators.required],
    Religion: ['', Validators.required],
    birthday: ['', Validators.required],
    Sex: ['', Validators.required],
    Governorate: ['', Validators.required],
    education: ['', Validators.required],
    address: ['', Validators.required],
    password: ['', Validators.required],
    ConfirmPassword: ['', Validators.required]
  });
}
onSubmit() {
  if (this.signupForm.valid) {

  } else {
    this.onInputFocus();
    this.signupForm.markAllAsTouched();
  }
}

}
