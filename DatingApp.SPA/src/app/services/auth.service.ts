import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { UrlResolver } from '@angular/compiler';

@Injectable()
export class AuthService {

  private URL = 'http://localhost:5000/api/auth/';
  token = '';
  loggedIn = false;
  constructor(public http: Http) { }

  login(datos: any) {

    const headers = new Headers({'content-type': 'application/json'});
    const opts = new RequestOptions({headers: headers});

    return this.http.post(this.URL + 'login', datos, opts).map(response => {
      let user = response.json();
      if (user) {
        localStorage.setItem('token', user.tokenString);
        this.token = user.tokenString;
        this.loggedIn = true;
      }

    });
  }

  logout() {
    this.token = null;
    localStorage.removeItem('token');
    this.loggedIn = false;
  }

  register(datos: any) {

    const headers = new Headers({'content-type': 'application/json'});
    const opts = new RequestOptions({headers: headers});

    return this.http.post(this.URL + 'register', datos, opts);

  }
}
