import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  
})
export class LoginComponent {
  isInputFocused: boolean = false;
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder,private _snackBar: MatSnackBar) {}

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
    const defaultFormData: any = {
      email: "Mo22Salah.doe@example.com",
      password: "Pa$w$w0rd#",
    };
  
    if (this.loginForm.valid) {
      // use
      console.log(this.loginForm.value);
    } else {
      this.loginForm.markAllAsTouched();

    }
  }

}
