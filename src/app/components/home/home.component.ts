import { Subscription } from 'rxjs';
import { Product } from '../../core/interfaces/product';
import { ProductsService } from './../../core/services/products.service';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CategorySliderComponent } from "../category-slider/category-slider.component";
import { MainSliderComponent } from "../main-slider/main-slider.component";
import { RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../core/services/wishlist.service';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CategorySliderComponent, MainSliderComponent, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy{

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
