import { Validators } from "@angular/forms";

export const signupValidators = {
    name: [Validators.required, Validators.minLength(3), Validators.maxLength(20)],
    email: [Validators.required, Validators.email],
    password: [Validators.required, Validators.pattern(/^\w{6,}$/)],
    phone: [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)],
}