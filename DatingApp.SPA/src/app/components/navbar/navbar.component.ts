import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { AlertifyService } from '../../services/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  form: any = {};
  constructor(public _as: AuthService, private _als: AlertifyService, private router: Router  ) { }

  ngOnInit() {
  }

  login() {
    this._as.login(this.form).subscribe(
      resp => {
        this._als.message('login successfull');
      }, error => {
        this._als.error(error);
      }, () => {
        this.router.navigate(['/members']);
      }
    );
  }

  logout() {
    this._as.logout();
    this.router.navigate(['/home']);
  }

  loginValido() {
   return this._as.loggedIn();
  }
}
