import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatCurrency',
  standalone: false
})
export class FormatCurrencyPipe implements PipeTransform {

  transform(val: string|number) {

    // if (typeof val === 'string') {
    //   val = val.split(' ')[0];
    // }
    
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2,
    }).format(Number(val));
  }
}

