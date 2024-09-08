import { Component, inject, OnInit } from '@angular/core';
import { CategoriesService } from '../../core/services/categories.service';
import { Category } from '../../core/interfaces/category';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-category-slider',
  standalone: true,
  imports: [CarouselModule, RouterLink],
  templateUrl: './category-slider.component.html',
  styleUrl: './category-slider.component.scss'
})
export class CategorySliderComponent implements OnInit{

  customOptionsCat: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    autoplay: true,
    autoplayTimeout: 2000,
    autoplayHoverPause: true,
    navSpeed: 700,
    navText: ['<i class="fa-solid fa-angles-left"></i>', '<i class="fa-solid fa-angles-right"></i>'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 7
      }
    },
    nav: true
  }

  categoriesList:Category[] = [];

  private readonly _CategoriesService = inject(CategoriesService);

  getCategories = () => {
    this._CategoriesService.getCategories().subscribe({
      next: (res) => {
         console.log(res.data);
         this.categoriesList = res.data;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  ngOnInit(): void {
    this.getCategories();
  }
}
