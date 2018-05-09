import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  form: any = {};
  constructor(public _as: AuthService) { }

  ngOnInit() {
  }

  login() {
    this._as.login(this.form).subscribe(
      resp => {
        console.log('login successfull');
      }, error => {
        console.log('login failed');
      }
    );
  }

  logout() {
    this._as.logout();
  }
}
