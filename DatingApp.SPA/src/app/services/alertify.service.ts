
import { Injectable } from '@angular/core';
import * as alertify from 'alertifyjs';
//declate let alertify: any; es igual a la linea anterior

@Injectable()
export class AlertifyService {

  constructor() { }

  success(msg: string) {
    alertify.success(msg);
  }

  error(msg: string) {
    alertify.error(msg);
  }

  warning(msg: string) {
    alertify.warning(msg);
  }

  message(msg: string) {
    alertify.message(msg);
  }

  alert(msg: string) {
    alertify.alert(msg, function() {
      alertify.message('OK');
    });
  }

  confirm(msg, callback: () => any) {
    alertify.confirm(msg, function(e) {
      if (e) {
        callback();
      }
    });
  }
}
