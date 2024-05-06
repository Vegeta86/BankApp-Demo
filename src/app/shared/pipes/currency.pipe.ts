import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyFormat'
})
export class CurrencyFormatPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value !== undefined && value !== null) {
      return value.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' });
    } else {
      return '';
    }
  }

}