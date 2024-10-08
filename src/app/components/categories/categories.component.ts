import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../../core/services/categories.service';
import { Category } from '../../core/interfaces/category';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit{

  allCategories:Category[] = [];
  isLoading:boolean = true;

  constructor(private _CategoriesService:CategoriesService) {}

  getCategories = () => {
    this._CategoriesService.getCategories().subscribe({

      next: (res) => {
        this.allCategories = res.data
        this.isLoading = false;
      },

      error: (error) => {
        console.log(error)
      }
    });
  }

  ngOnInit(): void {
    this.getCategories();
  }

}
