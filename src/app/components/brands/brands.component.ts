import { Component, OnInit } from '@angular/core';
import { BrandsService } from '../../core/services/brands.service';
import { Brand } from '../../core/interfaces/brand';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent implements OnInit{

  allBrands:Brand[] = [];

  constructor(private _BrandsService:BrandsService) {}

  getBrands = () => {
    this._BrandsService.getBrands().subscribe({
      next: (res) => {
        this.allBrands = res.data;
        console.log(res)
      },
      error: (error) => {
        console.log(error)
      } 
    });
  }

  ngOnInit(): void {
    this.getBrands();
  }

}
