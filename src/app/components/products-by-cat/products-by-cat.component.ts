import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product } from '../../core/interfaces/product';
import { CartService } from '../../core/services/cart.service';
import { ProductsService } from '../../core/services/products.service';
import { WishlistService } from '../../core/services/wishlist.service';



@Component({
  selector: 'app-products-by-cat',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './products-by-cat.component.html',
  styleUrl: './products-by-cat.component.scss'
})
export class ProductsByCatComponent implements OnInit{

  private readonly _ActivatedRoute = inject(ActivatedRoute);
  private readonly _ProductsService = inject(ProductsService);
  private readonly _WishlistService = inject(WishlistService);
  private readonly _CartService = inject(CartService);
  private readonly _ToastrService = inject(ToastrService);

  productsList:Product[] = []

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (p) => {
        let catId = p.get('id');
    
        this._ProductsService.getProductsByCat(catId).subscribe({
          next: (res) => {
            this.productsList = res.data
            console.log(this.productsList);
          },
          error: (err) => {
            console.log(err)
          }
        })

      }
    })
  }

  addToWishlist = (id:string):void => {
    this._WishlistService.addProductToWishlist(id).subscribe({
      next: (res) => {
        this._ToastrService.success(res.message, '', {
          progressBar: true,
          timeOut: 3000
        })
        console.log(res)
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
        console.log( this._CartService.cartNumber)
        console.log(res)
      },
      error: (err) => {
        console.log(err)
      }
    })
  }


}
