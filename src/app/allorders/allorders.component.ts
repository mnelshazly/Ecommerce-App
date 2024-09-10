import { Component, inject, OnInit } from '@angular/core';
import { OrdersService } from '../core/services/orders.service';
import { AuthService } from '../core/services/auth.service';
import { order } from '../core/interfaces/order';

@Component({
  selector: 'app-allorders',
  standalone: true,
  imports: [],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.scss'
})
export class AllordersComponent implements OnInit {
  private readonly _OrdersService = inject(OrdersService);
  private readonly _AuthService = inject(AuthService);

  userOrders:order[] = []

  ngOnInit(): void {
    this._AuthService.saveUserData()

    this._OrdersService.getUserOrders(this._AuthService.userData.id).subscribe({
      next: (res) => {
        this.userOrders = res
        console.log(this.userOrders)
      }
    })
  }

}
