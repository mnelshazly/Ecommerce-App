import { Subscription } from 'rxjs';
import { Product } from '../../core/interfaces/product';
import { ProductsService } from './../../core/services/products.service';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CategorySliderComponent } from "../category-slider/category-slider.component";
import { MainSliderComponent } from "../main-slider/main-slider.component";
import { RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CategorySliderComponent, MainSliderComponent, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy{

  private readonly _ToastrService = inject(ToastrService)

  allProducts:Product[] = [];

  getProductsSub!: Subscription;

  constructor(private _ProductsService:ProductsService, private _CartService:CartService) {}

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
        this._ToastrService.success(res.message)
        console.log(res)
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

}
