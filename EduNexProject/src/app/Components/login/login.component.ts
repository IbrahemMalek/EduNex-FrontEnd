import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/Service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  
})
export class LoginComponent {
  isInputFocused: boolean = false;
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder,private authService:AuthService,private router:Router) {}

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
  
  

 

  onSubmit() {
    const defaultFormData: any = {
      email: "MoSalah.doe@example.com",
      password: "Pa$w$w0rd#",
    };
  
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      this.authService.login(defaultFormData).subscribe({
        next: (data) => {
          // Handle success
          console.log(data)
        },
        error: (err) => {
          // Handle error
          console.log(err);
        }
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
  

}
