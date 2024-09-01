import { Subscription } from 'rxjs';
import { Product } from '../../core/interfaces/product';
import { ProductsService } from './../../core/services/products.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { CategorySliderComponent } from "../category-slider/category-slider.component";
import { MainSliderComponent } from "../main-slider/main-slider.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CategorySliderComponent, MainSliderComponent, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy{

  allProducts:Product[] = [];

  getProductsSub!: Subscription;

  constructor(private _ProductsService:ProductsService) {}

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

}
