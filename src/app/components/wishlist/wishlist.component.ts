import { Wishlist } from './../../core/interfaces/wishlist';
import { Component, inject, OnInit } from '@angular/core';

import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../core/services/cart.service';
import { WishlistService } from '../../core/services/wishlist.service';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent implements OnInit{

  private readonly _WishlistService = inject(WishlistService);
  private readonly _ToastrService = inject(ToastrService);
  private readonly _CartService = inject(CartService);
  
  wishlistData:Wishlist[] = [] 
  isLoading:boolean = true;

  getDataFromWishlist = ():void => {
    this._WishlistService.getWishlistData().subscribe({
      next: (res) => {
        this.wishlistData = res.data
        this.isLoading = false
        console.log( this.wishlistData)
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  ngOnInit(): void {
    this.getDataFromWishlist();
  }

  removeProductFromWishlist = (id:string) => {
    this._WishlistService.removeProductFromWishlist(id).subscribe({
      next: (res) => {
        this.getDataFromWishlist();
        this._ToastrService.success(res.message, '', {
          progressBar: true,
          timeOut: 3000
        })
        this._WishlistService.WishlistNumber.next(res.data.length)
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  addToCart = (id:string):void => {
    this._CartService.addProductToCart(id).subscribe({
      next: (res) => {
        this._ToastrService.success(res.message, '', {
          progressBar: true,
          timeOut: 3000
        })
        this._CartService.cartNumber.next(res.numOfCartItems);
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

}
