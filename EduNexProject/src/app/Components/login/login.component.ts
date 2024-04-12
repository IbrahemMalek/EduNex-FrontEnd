import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  isInputFocused: boolean = false;
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      studentPhoneNumber: ['',[Validators.required, Validators.pattern('^(010|015|011|012)\\d{8}$')]],
     
      password: ['', [Validators.required,Validators.minLength(8)]],
     
    });
  }
  
  get studentPhoneNumber()
  {
    return this.loginForm.get('studentPhoneNumber')
  }
 
  get password()
  {
    return this.loginForm.get('password')
  }
  
  

  // onInputFocus() {
  //   this.isInputFocused = true;
  // }

  // onInputBlur() {
  //   this.isInputFocused = false;
  // }

  onSubmit() {
    if (this.loginForm.valid) {
      // Save data in DB
      console.log(this.loginForm.value);
    } else {
      this.loginForm.markAllAsTouched();

    }
  }

}
