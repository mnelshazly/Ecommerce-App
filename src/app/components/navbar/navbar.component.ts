import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { CartService } from '../../core/services/cart.service';
import { WishlistService } from '../../core/services/wishlist.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit{
  readonly _AuthService = inject(AuthService)
  private readonly _CartService = inject(CartService)
  private readonly _WishlistService = inject(WishlistService)

  countNumber:number = 0;
  itemsInWishlist:number = 0

  ngOnInit(): void {

    this._CartService.getCartDetails().subscribe({
      next: (res) => {
        this._CartService.cartNumber.next(res.numOfCartItems);
      }
    })

   this._CartService.cartNumber.subscribe({
    next: (data) => {
      this.countNumber = data;
    }
   })

   this._WishlistService.getWishlistData().subscribe({
    next: (res) => {
      this._WishlistService.WishlistNumber.next(res.count)
    }
   })

   this._WishlistService.WishlistNumber.subscribe({
    next: (data) => {
      this.itemsInWishlist = data;
    }
   })

  }

}
