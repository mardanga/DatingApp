// import { Injectable } from '@angular/core';
// import { environment } from '../../environments/environment';
// import { Http, RequestOptions, Headers } from '@angular/http';
// import { Observable } from 'rxjs/Observable';
// import { User } from '../_models/user';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/catch';
// import 'rxjs/add/observable/throw';
// //import { AuthHttp } from 'angular2-jwt';
// import { HttpClient } from 'selenium-webdriver/http';

// @Injectable()
// export class UserService {
//   baseUrl = environment.apiUrl;

//   //constructor(private authHttp: AuthHttp) {}
//   constructor(private http: HttpClient) {}


//   getUsers(): Observable<User[]> {
//       return this.http.get(this.baseUrl + 'users')
//       .map(response => <User[]>response.json())
//       .catch(this.handleError);
//   }

//   getUser(id): Observable<User> {
//     return this.http
//       .get(this.baseUrl + 'users/' + id)
//       .map(response => <User>response.json())
//       .catch(this.handleError);
//   }

//   updateUser(id: number, user: User) {
//     return this.authHttp.put(this.baseUrl + 'users/' + id, user).catch(this.handleError);
//   }

//   setMainPhotoUser(idUser: number, idFoto: number) {
//     console.log(idUser);
//     console.log(idFoto);

//     return this.authHttp
//       .post(this.baseUrl + 'users/' + idUser + '/photos/' + idFoto + '/setMain', {})
//       .catch(this.handleError);
//   }

//   private handleError(error: any) {
//     const applicationError = error.headers.get('Application-Error');
//     if (applicationError) {
//       return Observable.throw(applicationError);
//     }
//     const serverError = error.json();
//     let modelStateErrors = '';
//     if (serverError) {
//       for (const key in serverError) {
//         if (serverError[key]) {
//           modelStateErrors += serverError[key] + '\n';
//         }
//       }
//     }
//     return Observable.throw(
//       modelStateErrors || 'Server error'
//     );
//   }
// }

import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/observable';
import { User } from '../_models/user';

const httpOptions = {
  headers: new HttpHeaders({
    'Authorization': 'Bearer ' + localStorage.getItem('token')
  })
};

@Injectable()
export class UserService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl + 'users', httpOptions);
  }

  getUser(id): Observable<User> {
    return this.http.get<User>(this.baseUrl + 'users/' + id, httpOptions);
  }

  updateUser(id: number, user: User) {
    return this.http.put(this.baseUrl + 'users/' + id, user);
  }

  setMainPhotoUser(userId: number, id: number) {
    return this.http.post(this.baseUrl + 'users/' + userId + '/photos/' + id + '/setMain', {});
  }
}

