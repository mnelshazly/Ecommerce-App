import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseURL, prodServerURL } from '../../environment/environment.local';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private _HttpClient:HttpClient) { }

  checkOut = (cartId:string|null, shippingDetails:object):Observable<any> => {
    return this._HttpClient.post(`${baseURL}api/v1/orders/checkout-session/${cartId}?url=${prodServerURL}`,
      {
        "shippingAddress": shippingDetails
      }
    )
  }

  getUserOrders = (userId:string):Observable<any> => {
    return this._HttpClient.get(`${baseURL}api/v1/orders/user/${userId}`)
  }
}
