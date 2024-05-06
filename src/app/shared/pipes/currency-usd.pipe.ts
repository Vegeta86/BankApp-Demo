import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyUSD'
})
export class CurrencyUSDPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
