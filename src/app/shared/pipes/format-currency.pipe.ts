import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatCurrency',
  standalone: false
})
export class FormatCurrencyPipe implements PipeTransform {

  // transform(val: string|number) {    
  //   return new Intl.NumberFormat('en-IN', {
  //     style: 'currency',
  //     currency: 'INR',
  //     minimumFractionDigits: 2,
  //   }).format(Number(val===''?0:val));
  // }
  transform(val: string | number | null | undefined): string {
    const num = Number(val);

    if (val === null || val === undefined || val === '' || isNaN(num)) {
      return '₹0.00'; 
    }

    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(num);
  }
}

