import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { AlertifyService } from '../../services/alertify.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  form: any = {};
  constructor(public _as: AuthService, private _als: AlertifyService  ) { }

  ngOnInit() {
  }

  login() {
    this._as.login(this.form).subscribe(
      resp => {
        this._als.message('login successfull');
      }, error => {
        this._als.error(error);
      }
    );
  }

  logout() {
    this._as.logout();
  }
}
