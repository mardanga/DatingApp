import {Http} from '@angular/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-values',
  templateUrl: './Values.component.html',
  styleUrls: ['./Values.component.css']
})
export class ValuesComponent {

values = [];

  constructor(private http: Http) {
    http.get('http://localhost:5000/api/values').subscribe(
      resp => {
        console.log(resp.json());
        this.values = resp.json();
      }
    );
  }
}
