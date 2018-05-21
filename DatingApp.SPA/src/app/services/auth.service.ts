
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { Observable } from 'rxjs/Observable';

import {JwtHelperService} from '@auth0/angular-jwt';


@Injectable()
export class AuthService {

  private URL = 'http://localhost:5000/api/auth/';
  token = '';
  varLoggedIn = false;


  tokenDecodificado: any;
  jwtHelper: JwtHelperService = new JwtHelperService();

  constructor(public http: Http) { }

  login(datos: any) {

    const headers = new Headers({'content-type': 'application/json'});
    const opts = new RequestOptions({headers: headers});

    return this.http.post(this.URL + 'login', datos, opts).map(response => {
      const user = response.json();
      if (user) {
        localStorage.setItem('auth_token', user.tokenString);
        this.token = user.tokenString;
        this.tokenDecodificado = this.decodificarToken();

        this.varLoggedIn = true;
      }

    }).catch(this.handleError);
  }

  decodificarToken() {
    return this.jwtHelper.decodeToken(localStorage.getItem('auth_token'));
  }

  logout() {
    this.token = null;
    localStorage.removeItem('auth_token');
    this.varLoggedIn = false;
  }

  register(datos: any) {
    const headers = new Headers({'content-type': 'application/json'});
    const opts = new RequestOptions({headers: headers});
    return this.http.post(this.URL + 'register', datos, opts).catch(this.handleError);
  }

  private handleError(error: any) {
    const applicationError = error.headers.get('Application-Error');
    if (applicationError) {
      return Observable.throw(applicationError);
    }
    const serverError = error.json();
    let modelStateErrors = '';
    if (serverError) {
      for (const key in serverError) {
        if (serverError[key]) {
          modelStateErrors += serverError[key] + '\n';
        }
      }
    }
    return Observable.throw(
      modelStateErrors || 'Server error'
    );
  }

  loggedIn() {
      return !this.jwtHelper.isTokenExpired(localStorage.getItem('auth_token'));
  }
}
