import { Wishlist } from './../interfaces/wishlist';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { baseURL } from '../../environment/environment.local';


@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  constructor(private _HttpClient:HttpClient) { }

  WishlistNumber: BehaviorSubject<number> = new BehaviorSubject(0);

  addProductToWishlist = (productId:string):Observable<any> => {
    return this._HttpClient.post(baseURL + 'api/v1/wishlist', 
      {
        "productId": productId
      }
     )
  }

  removeProductFromWishlist = (id:string):Observable<any> => {
    return this._HttpClient.delete(baseURL + 'api/v1/wishlist/' + id)
  }

  getWishlistData = ():Observable<any> => {
    return this._HttpClient.get(baseURL + 'api/v1/wishlist')
  }
}
