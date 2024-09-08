import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseURL } from '../../environment/environment.local';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private _HttpClient:HttpClient) { }

  cartNumber:BehaviorSubject<number> = new BehaviorSubject(0);

  addProductToCart = (id:string):Observable<any> => {
    return this._HttpClient.post(baseURL + 'api/v1/cart',

      {
        // body
        "productId": id
      }
    )
  }

  getCartDetails = ():Observable<any> => {
    return this._HttpClient.get(baseURL + 'api/v1/cart')
  }

  removeSpecificCartItem = (id:string):Observable<any> => {
    return this._HttpClient.delete(baseURL + 'api/v1/cart/' + id)
  }

  updateProductQuantity = (id:string, newCount:number):Observable<any> => {
    return this._HttpClient.put(baseURL + 'api/v1/cart/' + id,
      {
        "count": newCount
      }
    )
  }

  clearCart = ():Observable<any> => {
    return this._HttpClient.delete(baseURL + 'api/v1/cart' )
  }
}
