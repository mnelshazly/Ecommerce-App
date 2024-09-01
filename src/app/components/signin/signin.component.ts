import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { signupValidators } from '../../shared/validators/register.validators';
import { AlertErrorComponent } from '../../shared/ui/alert-error/alert-error.component';
import { AuthService } from '../../core/services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [ReactiveFormsModule, AlertErrorComponent, RouterLink],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss'
})
export class SigninComponent {

  isBtnSubmit: boolean = false;
  errorMsg: string = "";
  successMsg: string = "";

  private readonly _FormBuilder= inject(FormBuilder);
  private readonly _AuthService=inject(AuthService);
  private readonly _Router = inject(Router);

  loginForm:FormGroup = this._FormBuilder.group({
    email: [null, signupValidators.email],
    password: [null, signupValidators.password]
  });

  loginSubmit():void {

    if (this.loginForm.valid) {
      this.isBtnSubmit = true;
      this._AuthService.signin(this.loginForm.value).subscribe ({
        next: (res) => {
          if (res.message == 'success') {
            this.isBtnSubmit = false;
            this.errorMsg = "";
            // this.successMsg = "Login is successful, you will be redirected to the home page in 5 seconds";

            localStorage.setItem("userToken", res.token);
            this._AuthService.saveUserData();

            this._Router.navigate(['/home']);
          }
        },

        error: (err:HttpErrorResponse) => {
          this.isBtnSubmit = false;
          this.errorMsg = err.error.message;
          console.log(err);
        },

      })
    }

    console.log(this.loginForm)
  }

}
