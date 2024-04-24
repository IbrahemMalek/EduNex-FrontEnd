import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { passwordMatched } from 'src/app/CustomFormValidation/CrossfiledValidation';
import { IuserUdateFormData } from 'src/app/Models/IuserUdateFormData';
import { AuthService } from 'src/app/Service/auth.service';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  isInputFocused: boolean = false;
  signupForm!: FormGroup;

  
  constructor(private fb: FormBuilder,private authService:AuthService,private router:Router,private _snackBar: MatSnackBar) {}

  ngOnInit() {
    this.signupForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.pattern('^(?!\d).{8,}$')]],
      lastName: ['', Validators.required],
      studentPhoneNumber: ['',[Validators.required, Validators.pattern('^(010|015|011|012)\\d{8}$')]],
      fatherPhoneNumber: ['',[Validators.required, Validators.pattern('^(010|015|011|012)\\d{8}$')]],
      religion: ['', Validators.required],
      birthday: ['', Validators.required],
      sex: ['', Validators.required],
      governorate: ['', Validators.required],
      education: ['', Validators.required],
      address: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8),this.passwordStrengthValidator]],
      confirmPassword: ['',],
      studentEmail: ['',[Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$')]],
      rebot: [false, Validators.required],
      rebot2: [false, Validators.required]
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
  get studentEmail()
  {
    return this.signupForm.get('studentEmail')
  }
  get fullName()
  {
    return this.signupForm.get('fullName')
  }
  get lastName()
  {
    return this.signupForm.get('lastName')
  }
  
  get studentPhoneNumber()
  {
    return this.signupForm.get('studentPhoneNumber')
  }
  get fatherPhoneNumber()
  {
    return this.signupForm.get('fatherPhoneNumber')
  }
  get religion()
  {
    return this.signupForm.get('religion')
  }
  get birthday()
  {
    return this.signupForm.get('birthday')
  }
  get sex()
  {
    return this.signupForm.get('sex')
  }
  get education()
  {
    return this.signupForm.get('education')
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
  get rebot()
  {
    return this.signupForm.get('rebot')
  }
  get rebot2()
  {
    return this.signupForm.get('rebot2')
  }
  

  errorMeg:string='';
  onSubmit() {
   
    if (this.signupForm.valid) {
      
      const defaultFormData: IuserUdateFormData = {
        City: this.signupForm.value.governorate,
        address: this.signupForm.value.address,
        confirmPassword: this.signupForm.value.confirmPassword, 
        dateOfBirth: this.signupForm.value.birthday,
        Email: this.signupForm.value.studentEmail,
        FirstName: this.signupForm.value.fullName,
        gender: this.signupForm.value.sex,
        lastName: this.signupForm.value.lastName,
        ParentPhoneNumber: this.signupForm.value.fatherPhoneNumber,
        Password: this.signupForm.value.password,
        PhoneNumber: this.signupForm.value.studentPhoneNumber,
        religion: this.signupForm.value.religion,
        levelId: this.signupForm.value.education,
      };
      
      // Save data in DB
     this.authService.signUp(defaultFormData).subscribe(
      {
        next:(data)=>{  console.log(data)
          if(data.token)
            {
              this.authService.signUp(this.signupForm.value);
              //go to login
              this.router.navigate(['/login'])
              this._snackBar.open('تم انشاء الحساب بنجاح', 'Close', {
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
    } else{

      Object.keys(this.signupForm.controls).forEach(controlName => {
        this.signupForm.get(controlName)?.markAsTouched();
    });

    }

      
    }
  }
    

