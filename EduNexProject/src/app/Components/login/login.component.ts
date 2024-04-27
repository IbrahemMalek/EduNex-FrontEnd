import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/Service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  
})
export class LoginComponent {
  isInputFocused: boolean = false;
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder,private authService:AuthService,private router:Router,private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      studentEmail: ['',[Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$')]],
     
      password: ['', [Validators.required,Validators.minLength(8)]],
     
    });
  }
  
  get studentEmail()
  {
    return this.loginForm.get('studentEmail')
  }
 
  get password()
  {
    return this.loginForm.get('password')
  }
  
  

 

  onSubmit() {
    type DefaultFormData = {
      email: string;
      password: string;
    };
    const defaultFormData: DefaultFormData = {
      email: this.loginForm.value.studentEmail,
      password: this.loginForm.value.password,
    };
     
    if (this.loginForm.valid) {
      this.authService.login(defaultFormData).subscribe({
        next: (data) => {
          // Handle success
          console.log(data)
        },
        error: (err) => {
          // Handle error
          
          if(err.error.errorMessage=="Your account is pending approval. Please wait for admin approval.")
            {
              // console.log(err.error)
              this.authService.teacherId=err.error.teacher;//send id
              this.router.navigate(['/teacherprofile']);

            }
            else if(err.error['']){
           this.snackBar.open(err.error[''], 'Close', {
            duration: 3000, 
            verticalPosition: 'bottom',
            panelClass: ['red-snackbar']
          });
         }
        }
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
  

}
