import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AlertErrorComponent } from '../../shared/ui/alert-error/alert-error.component';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [ReactiveFormsModule, AlertErrorComponent],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent {

  private readonly _FormBuilder = inject(FormBuilder);

  orders:FormGroup = this._FormBuilder.group({
    details: [null, Validators.required],
    phone: [null, Validators.required],
    city: [null, Validators.required]
  })

  submitOrder = ():void => {
    console.log(this.orders)
  }

}
