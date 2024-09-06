import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { Cart } from '../../core/interfaces/cart';
import { CurrencyPipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit{

  private readonly _CartService = inject(CartService);
  private readonly _ToastrService = inject(ToastrService);

  cartData:Cart = {} as Cart;

  ngOnInit(): void {
    this._CartService.getCartDetails().subscribe({
      next: (res) => {
        this.cartData = res.data;
        console.log(this.cartData)
      },

      error: (err) => {
        console.log(err)
      }

    })
  }

  removeItem = (id:string):void => {
    this._CartService.removeSpecificCartItem(id).subscribe({
      next: (res) => {
        this.cartData = res.data;
        this._ToastrService.success("Cart has been updated")
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  updateCount = (id:string, count:number):void => {
    if(count > 0) {
      this._CartService.updateProductQuantity(id, count).subscribe({
        next: (res) => {
          this.cartData = res.data;
          this._ToastrService.success("Cart has been updated")
        },

        error:(err) => {
          console.log(err)
        }
      })
    }
  }

  clearItems = () => {
    this._CartService.clearCart().subscribe({
      next: (res) => {
        console.log(res)
        if (res.message == 'success') {
          this._ToastrService.success("Cart has been cleared")
          this.cartData = {} as Cart;
        }
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

}
