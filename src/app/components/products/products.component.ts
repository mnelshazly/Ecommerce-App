import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { Product } from '../../core/interfaces/product';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { CartService } from '../../core/services/cart.service';
import { RouterLink } from '@angular/router';
import { WishlistService } from '../../core/services/wishlist.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit{

  // allProducts:Product[] = []

  // constructor (private _ProductsService:ProductsService) {}

  // getProducts = () => {
  //   this._ProductsService.getProducts().subscribe({
  //     next: (res) => {
  //       this.allProducts = res.data;
  //     },
  //     error: (error) => {
  //       console.log(error);
  //     }
  //   })
  // }

  // ngOnInit(): void {
  //   this.getProducts();
  // }

  private readonly _ProductsService = inject(ProductsService)
  private readonly _CartService = inject(CartService)
  private readonly _ToastrService = inject(ToastrService)
  private readonly _WishlistService = inject(WishlistService)

  allProducts:Product[] = [];

  getProductsSub!: Subscription;

  getProducts = () => {
    this.getProductsSub = this._ProductsService.getProducts().subscribe({
      next:(res) => {
        this.allProducts = res.data;
      },
      error:(error) => {
        console.log(error)
      },
    });
  };

  ngOnInit(): void {
    this.getProducts();
  }

  ngOnDestroy(): void {
    this.getProductsSub?.unsubscribe();
  }

  addToCart = (id:string):void => {
    this._CartService.addProductToCart(id).subscribe({
      next: (res) => {
        this._ToastrService.success(res.message, '', {
          progressBar: true,
          timeOut: 3000
        })
        this._CartService.cartNumber.next(res.numOfCartItems);
        console.log( this._CartService.cartNumber)
        console.log(res)
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  added:boolean = false

  addToWishlist = (id:string):void => {
    this._WishlistService.addProductToWishlist(id).subscribe({
      next: (res) => {
        this._ToastrService.success(res.message, '', {
          progressBar: true,
          timeOut: 3000
        })
        console.log(res)
        this.added = true
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

}
