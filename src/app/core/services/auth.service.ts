import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { baseURL } from '../../environment/environment.local';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly _HttpClient = inject (HttpClient);
  private readonly _Router = inject (Router);

  signup = (userData:object):Observable<any> => {
    return this._HttpClient.post(baseURL + "api/v1/auth/signup", userData);
  }

  signin = (userData:object):Observable<any> => {
    return this._HttpClient.post(baseURL + "api/v1/auth/signin", userData)
  }

  saveUserData = () => {
    let userToken = localStorage.getItem('userToken');

    if (userToken) {
      try {
        let decodedToken = jwtDecode(userToken);
      } catch (error) {
        localStorage.clear();
      }
    }
  }

  logOut = ():void => {
    localStorage.removeItem('userToken');
    this._Router.navigate(['/signin']);
  }

  setEmailVerify = (userData:object):Observable<any> => {
    return this._HttpClient.post(baseURL + 'api/v1/auth/forgotPasswords', userData)
  }

  verifyResetCode = (userData:object):Observable<any> => {
    return this._HttpClient.post(baseURL + 'api/v1/auth/verifyResetCode', userData)
  }

  resetPassword = (userData:object):Observable<any> => {
    return this._HttpClient.put(baseURL + 'api/v1/auth/resetPassword', userData)
  }

}