import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {

  registerForm: FormGroup = new FormGroup({

    name: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),

    email: new FormControl(null, [Validators.required, Validators.email]),

    password: new FormControl(null, [Validators.required, Validators.pattern(/^\w{6,}$/)]),

    rePassword: new FormControl(null),

    phone: new FormControl(null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]),
  }, this.confirmPassword);

  confirmPassword(g:AbstractControl) {

    if(g.get('password')?.value === g.get('rePassword')?.value) {

      return null;

    } else {

      return {mismatch:true}

    }
  }

  sendData ():void {
    if (this.registerForm.valid) {
      console.log(this.registerForm)
    }
  }
}
