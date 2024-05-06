import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rutFormat'
})
export class RutFormatPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value !== undefined && value !== null) {
      let rut = value.replace(/\./g, '').replace('-', '');
      rut = rut.substring(0, rut.length - 1) + '-' + rut.substring(rut.length - 1);
      return rut;
    } else {
      return '';
    }
  }

}