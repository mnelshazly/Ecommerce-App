import { AuthService } from './../../core/services/auth.service';
import { Component, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { confirmPassword } from '../../shared/utilities/confirm-password.utilities';
import { signupValidators } from '../../shared/validators/register.validators';
import { AlertErrorComponent } from "../../shared/ui/alert-error/alert-error.component";
import { NgClass } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, AlertErrorComponent, NgClass],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {

  isBtnSubmit: boolean = false;
  errorMsg: string = "";
  successMsg: string = "";

  private readonly _AuthService = inject(AuthService);
  private readonly _Router = inject(Router)

  registerForm: FormGroup = new FormGroup({
    name: new FormControl(null, signupValidators.name),
    email: new FormControl(null, signupValidators.email),
    password: new FormControl(null, signupValidators.password),
    rePassword: new FormControl(null),
    phone: new FormControl(null, signupValidators.phone),
  }, confirmPassword);

  sendData ():void {
    if (this.registerForm.valid) {
      this.isBtnSubmit = true;
      this._AuthService.signup(this.registerForm.value).subscribe({
       
        next:(res) => {


          if(res.message == 'success') {
            
            this.isBtnSubmit = false;

            // reset the error message
            this.errorMsg = "";
            this.successMsg = "Your account has been created successfully, you will be redirected to the login page in 5 seconds";

            // navigate to the login page
            setTimeout(()=>{
              this._Router.navigate(['/signin']);
            }, 5000)

          }



          console.log(res);
        },

        error: (err:HttpErrorResponse) => {
          this.isBtnSubmit = false;
          this.errorMsg = err.error.message;
          console.log(err);
        },

      })


      console.log(this.registerForm)
    }
  }
}
