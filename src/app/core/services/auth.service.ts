import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { baseURL } from '../../environment/environment.local';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly _HttpClient = inject (HttpClient);

  signup = (userData:object):Observable<any> => {
    return this._HttpClient.post(baseURL + "api/v1/auth/signup", userData);
  }

  signin = (userData:object):Observable<any> => {
    return this._HttpClient.post(baseURL + "api/v1/auth/signin", userData)
  }
}
