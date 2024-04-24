import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { passwordMatched } from 'src/app/CustomFormValidation/CrossfiledValidation';
import { IuserUdateFormData } from 'src/app/Models/IuserUdateFormData';
import { AuthService } from 'src/app/Service/auth.service';

@Component({
  selector: 'app-signup-teacher',
  templateUrl: './signup-teacher.component.html',
  styleUrls: ['./signup-teacher.component.css']
})
export class SignupTeacherComponent {

  isInputFocused: boolean = false;
  signupForm!: FormGroup;

  constructor(private fb: FormBuilder,private authService:AuthService,private router:Router,private _snackBar: MatSnackBar) {}

  ngOnInit() {
    this.signupForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.pattern('^(?!\d).{8,}$')]],
      lastName: ['', Validators.required],
      teacherPhoneNumber: ['',[Validators.required, Validators.pattern('^(010|015|011|012)\\d{8}$')]],
      birthday: ['', Validators.required],
      sex: ['', Validators.required],
      governorate: ['', Validators.required],
      address: ['', Validators.required],
      FacebookAccount: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8),this.passwordStrengthValidator]],
      confirmPassword: ['',],
      teacherEmail: ['',[Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$')]],
    },{validators: passwordMatched()}); // Apply custom validator here
   
  }
  passwordStrengthValidator(control: any) {
    // Password strength  
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (control.value && !regex.test(control.value)) {
      return { 'weakPassword': true };
    }

    return null;
  }
  get password()
  {
    return this.signupForm.get('password')
  }
    //check password is invalid
   isPasswordInvalid() {
    return this.password?.invalid && (this.password?.dirty || this.password?.touched);
  }
  get teacherEmail()
  {
    return this.signupForm.get('teacherEmail')
  }
  get fullName()
  {
    return this.signupForm.get('fullName')
  }
  get teacherPhoneNumber()
  {
    return this.signupForm.get('teacherPhoneNumber')
  }
  
  get FacebookAccount()
  {
    return this.signupForm.get('FacebookAccount')
  }
  get birthday()
  {
    return this.signupForm.get('birthday')
  }
  get sex()
  {
    return this.signupForm.get('sex')
  }

  get governorate()
  {
    return this.signupForm.get('governorate')
  }
  get address()
  {
    return this.signupForm.get('address')
  }
 
  get confirmPassword()
  {
    return this.signupForm.get('confirmPassword')
  }

  get lastName()
  {
    return this.signupForm.get('lastName')
  }
  

  errorMeg:string='';
  onSubmit() {
    if (this.signupForm.valid) {


      // const defaultFormData: IuserUdateFormData = {
        
      // };
      // Save data in DB
      console.log(this.signupForm.value);
     this.authService.signUp(this.signupForm.value).subscribe(
      {
        next:(data)=>{
          if(data.message==='success')
            {
              this.authService.signUp(this.signupForm.value);
              //go to login
              this.router.navigate(['/login'])
              this._snackBar.open('تم تسجيل الدخول بنجاح', 'Close', {
                duration: 5000, 
                verticalPosition: 'top',
              });
            }
        },
        error:(err)=>{
          this.errorMeg=err.error.errors.msg;
          console.log(err);
           }
        })
    }

    }
  }
