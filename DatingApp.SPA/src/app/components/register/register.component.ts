import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AlertifyService } from '../../services/alertify.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerModel: any = {};
  @Input() registerModeFromHome: any;
  @Output() cancelClick = new EventEmitter();

  constructor(public _as: AuthService, private _als: AlertifyService) { }

  ngOnInit() {
  }

  register() {
    this._as.register(this.registerModel).subscribe(
      resp => {
        this._als.message('Registro exitoso');
      }, error =>  {
        console.log(error);
        this._als.error(error);
      }
    );

  }

  cancel() {
    this.cancelClick.emit(false);
  }
}
