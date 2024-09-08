import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseURL } from '../../environment/environment.local';


@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  constructor(private _HttpClient:HttpClient) { }

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
