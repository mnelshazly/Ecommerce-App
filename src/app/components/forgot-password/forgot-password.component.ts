import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { signupValidators } from '../../shared/validators/register.validators';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent {

  step:number = 1;
  isBtnSubmit: boolean = false;

  private readonly _FormBuilder = inject(FormBuilder);
  private readonly _AuthService = inject(AuthService);
  private readonly _Router = inject(Router);

  // Verify Email Form
  verifyEmail:FormGroup = this._FormBuilder.group({
    email: [null, signupValidators.email]
  });

  // Verify Code Form
  verifyCode:FormGroup = this._FormBuilder.group({
    resetCode: [null, signupValidators.resetCode]
  })

  // Reset Password Form
  resetPassword:FormGroup = this._FormBuilder.group({
    email: [null, signupValidators.email],
    newPassword: [null, signupValidators.password]
  })

  verifyEmailSubmit():void {
    this.isBtnSubmit = true;
    this._AuthService.setEmailVerify(this.verifyEmail.value).subscribe({
      next: (res) => {
        console.log(res)
        this.isBtnSubmit = false;
        if(res.statusMsg === 'success') {
          this.step = 2;
        }
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  verifyCodeSubmit():void {
    this.isBtnSubmit = true;
    this._AuthService.verifyResetCode(this.verifyCode.value).subscribe({
      next: (res) => {
        this.isBtnSubmit = false;
        console.log(res)
        if(res.status === 'Success') {
          this.step = 3;
        }
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  resetPasswordSubmit():void {
    this.isBtnSubmit = true;
    this._AuthService.resetPassword(this.resetPassword.value).subscribe({
      next: (res) => {
        this.isBtnSubmit = false;
        console.log(res)
        localStorage.setItem('userToken', res.token)
        this._Router.navigate(['/home'])

      },
      error: (err) => {
        console.log(err)
      }
    })
  }

}
