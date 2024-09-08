import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../core/services/products.service';
import { Product } from '../../core/interfaces/product';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit{

  productDetails:Product = {} as Product
  
  private readonly _ActivatedRoute = inject(ActivatedRoute);
  private readonly _ProductsService = inject(ProductsService);
  private readonly _ToastrService = inject(ToastrService);
  private readonly _CartService = inject(CartService);
  
  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (p) => {
        console.log(p.get('id'));
        let productId = p.get('id')

        this._ProductsService.getSpecificProduct(productId).subscribe({
          next: (res) => {
            console.log(res.data)
            this.productDetails = res.data
          },

          error: (err) => {
            console.log(err)
          }
        })
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
        console.log(res)
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

}
