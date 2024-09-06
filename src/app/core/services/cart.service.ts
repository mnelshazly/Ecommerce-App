import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseURL } from '../../environment/environment.local';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  myHeader:any = {token: localStorage.getItem('userToken')}

  constructor(private _HttpClient:HttpClient) { }

  addProductToCart = (id:string):Observable<any> => {
    return this._HttpClient.post(baseURL + 'api/v1/cart',

      {
        // body
        "productId": id
      },

      {
        headers: this.myHeader
      }
    )
  }

  getCartDetails = ():Observable<any> => {
    return this._HttpClient.get(baseURL + 'api/v1/cart', {
      headers: this.myHeader
    })
  }

  removeSpecificCartItem = (id:string):Observable<any> => {
    return this._HttpClient.delete(baseURL + 'api/v1/cart/' + id,
      {
        headers: this.myHeader
      }
    )
  }

  updateProductQuantity = (id:string, newCount:number):Observable<any> => {
    return this._HttpClient.put(baseURL + 'api/v1/cart/' + id,
      {
        "count": newCount
      },
      {
        headers: this.myHeader
      }
    )
  }

  clearCart = ():Observable<any> => {
    return this._HttpClient.delete(baseURL + 'api/v1/cart',
      {
        headers: this.myHeader
      }
    )
  }
}
