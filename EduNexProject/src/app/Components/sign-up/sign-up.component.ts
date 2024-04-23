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
      studentPhoneNumber: ['',[Validators.required, Validators.pattern('^(010|015|011|012)\\d{8}$')]],
      fatherPhoneNumber: ['',[Validators.required, Validators.pattern('^(010|015|011|012)\\d{8}$')]],
      Religion: ['', Validators.required],
      birthday: ['', Validators.required],
      Sex: ['', Validators.required],
      Governorate: ['', Validators.required],
      education: ['', Validators.required],
      address: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
      ConfirmPassword: ['',],
      Rebot: [false, Validators.required],
      Rebot2: [false, Validators.required]
    },{validators: passwordMatched()}); // Apply custom validator here
  }
  
  get fullName()
  {
    return this.signupForm.get('fullName')
  }
  get studentPhoneNumber()
  {
    return this.signupForm.get('studentPhoneNumber')
  }
  get fatherPhoneNumber()
  {
    return this.signupForm.get('fatherPhoneNumber')
  }
  get Religion()
  {
    return this.signupForm.get('Religion')
  }
  get birthday()
  {
    return this.signupForm.get('birthday')
  }
  get Sex()
  {
    return this.signupForm.get('Sex')
  }
  get education()
  {
    return this.signupForm.get('education')
  }
  get Governorate()
  {
    return this.signupForm.get('Governorate')
  }
  get address()
  {
    return this.signupForm.get('address')
  }
  get password()
  {
    return this.signupForm.get('password')
  }
  get ConfirmPassword()
  {
    return this.signupForm.get('ConfirmPassword')
  }
  get Rebot()
  {
    return this.signupForm.get('Rebot')
  }
  get Rebot2()
  {
    return this.signupForm.get('Rebot2')
  }
  

  errorMeg:string='';
  onSubmit() {
    if (this.signupForm.valid) {
      // Save data in DB
      console.log(this.signupForm.value);
    //  this.authService.signUp(this.signupForm.value).subscribe(
    //   {
    //     next:(data)=>{
    //       if(data.message==='success')
    //         {
    //           this.authService.signUp(this.signupForm.value);
    //           //go to login
    //           this.router.navigate(['/login'])
    //         }
    //     },
    //     error:(err)=>{
    //       this.errorMeg=err.error.errors.msg;
    //       console.log(err);
    //        }
    //     })
    }

    // if (this.signupForm.valid) {
    //   console.log(this.signupForm.value);
    //   this.authService.signUp(this.signupForm.value).subscribe({
    //     next: (data) => {
    //       if (data.message === 'success') {
            
    //           //go to login
    //           this.router.navigate(['/login'])
    //       }
    //     },
    //     error: (err) => {
    //       this.errorMeg = err.error.errors.msg;
    //       console.log(err);
    //     }
    //   });
    // }
    //  else {
    //   this.signupForm.markAllAsTouched();
    //   console.log("errorrrrr404");

    // }
      const defaultFormData: IuserUdateFormData = {
        firstName: "Johns",
        lastName: "Doqe",
        phoneNumber: "0123456789",
        gender: "Male",
        parentPhoneNumber: "0123456785",
        religion: "Islam",
        dateOfBirth: "1990-01-01T00:00:00.000Z",
        address: "123 Main Street",
        nationalId: "12345678901234",
        email: "MoSalah.doe@example.com",
        password: "Pa$w$w0rd#",
        confirmPassword: "Pa$w$w0rd#"
      };
  
      
      this.authService.signUp(defaultFormData).subscribe({
        next: (data) => {

          if (data.token) {
            // Redirect to login page
            this.router.navigate(['/login']);
            this._snackBar.open('Registered successfully!', 'Close', {
              duration: 5000, 
              verticalPosition: 'top',
            });
          }
        },
        error: (err) => {
          this.errorMeg = err.error.errors.msg;
          console.log(err);
          console.log(err.error.errors);
        }
      });
      
    }
  }
      // }
    

