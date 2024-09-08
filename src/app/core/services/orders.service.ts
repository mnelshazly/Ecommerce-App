import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseURL, serverURL } from '../../environment/environment.local';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private _HttpClient:HttpClient) { }

  checkOut = (cartId:string|null, shippingDetails:object):Observable<any> => {
    return this._HttpClient.post(`${baseURL}api/v1/orders/checkout-session/${cartId}?url=${serverURL}`, 
      {
        "shippingAddress": shippingDetails
      }
    )
  }
}
