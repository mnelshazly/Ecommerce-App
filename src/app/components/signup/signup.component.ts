import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { confirmPassword } from '../../shared/utilities/confirm-password.utilities';
import { signupValidators } from '../../shared/validators/register.validators';
import { AlertErrorComponent } from "../../shared/ui/alert-error/alert-error.component";

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, AlertErrorComponent],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {

  registerForm: FormGroup = new FormGroup({

    name: new FormControl(null, signupValidators.name),

    email: new FormControl(null, signupValidators.email),

    password: new FormControl(null, signupValidators.password),

    rePassword: new FormControl(null),

    phone: new FormControl(null, signupValidators.phone),
  }, confirmPassword);

  sendData ():void {
    if (this.registerForm.valid) {
      console.log(this.registerForm)
    }
  }
}
