import { Injectable } from '@angular/core';
import sweetalert from 'sweetalert2';

@Injectable()
export class SweetAlertService {

  constructor() { }

  swal(param1?, param2?, param3?) {
    return sweetalert(param1, param2, param3);
  }

  prompt(options): Promise<any> {
    const baseOptions = {
      showCancelButton: true,
      confirmButtonText: 'Submit',
      input: 'text'
    }
    return sweetalert(Object.assign(baseOptions, options));
  }

  confirm(options): Promise<any> {
    const baseOptions = {
      showCancelButton: true,
      confirmButtonText: 'Confirm',
      type: 'warning'
    };

    return sweetalert(Object.assign(baseOptions, options));
  }

  alert(options): Promise<any> {
    const baseOptions = {
      confirmButtonText: 'OK',
      type: 'info'
    };

    return sweetalert(Object.assign(baseOptions, options));
  }

  question(options): Promise<any> {
    return this.alert(Object.assign( { type: 'question' }, options ));
  }

  success(options): Promise<any> {
    return this.alert(Object.assign( { type: 'success' }, options ));
  }

  error(options): Promise<any> {
    return this.alert(Object.assign( { type: 'error' }, options ));
  }

  warn(options): Promise<any> {
    return this.alert(Object.assign( { type: 'warning' }, options ));
  }

  info(options): Promise<any> {
    return this.alert(Object.assign( { type: 'info' }, options ));
  }


}