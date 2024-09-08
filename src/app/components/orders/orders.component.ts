import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AlertErrorComponent } from '../../shared/ui/alert-error/alert-error.component';
import { ActivatedRoute } from '@angular/router';
import { OrdersService } from '../../core/services/orders.service';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [ReactiveFormsModule, AlertErrorComponent],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent implements OnInit{

  private readonly _FormBuilder = inject(FormBuilder);
  private readonly _ActivatedRoute = inject(ActivatedRoute);
  private readonly _OrdersService = inject(OrdersService);

  orders:FormGroup = this._FormBuilder.group({
    details: [null, Validators.required],
    phone: [null, Validators.required],
    city: [null, Validators.required]
  })

  cartId:string | null = "";

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (p) => {
        this.cartId = p.get('id');
      }
    })
  }

  submitOrder = ():void => {
    console.log(this.orders.value)
    this._OrdersService.checkOut(this.cartId, this.orders.value).subscribe({
      next: (res) => {
        console.log(res)
        if(res.status === 'success') {
          window.open(res.session.url, '_self')
        }
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

}
