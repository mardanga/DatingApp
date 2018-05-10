import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerModel: any = {};
  @Input() registerModeFromHome: any;
  @Output() cancelClick = new EventEmitter();

  constructor(public _as: AuthService) { }

  ngOnInit() {
  }

  register() {
    this._as.register(this.registerModel).subscribe(
      resp => {
        console.log('Registro exitoso');
      }, error =>  {
        console.log('Registro error')
      }
    );

  }

  cancel() {
    this.cancelClick.emit(false);
    console.log('cancel');
  }
}
