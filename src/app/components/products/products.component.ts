import { Component, inject, Input, input, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { Product } from '../../core/interfaces/product';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { CartService } from '../../core/services/cart.service';
import { RouterLink } from '@angular/router';
import { WishlistService } from '../../core/services/wishlist.service';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [RouterLink, SearchPipe, FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit{

  private readonly _ProductsService = inject(ProductsService)
  private readonly _CartService = inject(CartService)
  private readonly _ToastrService = inject(ToastrService)
  private readonly _WishlistService = inject(WishlistService)

  @Input() pageTitle:string = 'All Products';

  allProducts:Product[] = [];
  wishlistData:any[] = []
  getProductsSub!: Subscription;
  searchText:string = "";
  isLoading:boolean = true;

  getProducts = () => {
    this.getProductsSub = this._ProductsService.getProducts().subscribe({
      next:(res) => {
        this.allProducts = res.data;
        this.isLoading = false;
      },
      error:(error) => {
        console.log(error)
      },
    });
  };

  ngOnInit(): void {
    this.getProducts();

    this._WishlistService.getWishlistData().subscribe({
      next: (res) => {
        this.wishlistData = res.data.map((item: any) => item._id);
      }
    })
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

  addToWishlist = (id:string):void => {
    this._WishlistService.addProductToWishlist(id).subscribe({
      next: (res) => {
        this._ToastrService.success(res.message, '', {
          progressBar: true,
          timeOut: 3000
        })
        this._WishlistService.WishlistNumber.next(res.data.length);
        console.log(res.data)
        this.wishlistData = res.data;
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  removeProductFromWishlist = (id:string) => {
    this._WishlistService.removeProductFromWishlist(id).subscribe({
      next: (res) => {
        this._ToastrService.success(res.message, '', {
          progressBar: true,
          timeOut: 3000
        })
        this._WishlistService.WishlistNumber.next(res.data.length)
        this.wishlistData = res.data;
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

}
