import { Pipe, PipeTransform } from '@angular/core';
import { DecimalPipe } from '@angular/common';


@Pipe({
  name: 'formatAmount',
  standalone: false
})
export class FormatAmountPipe implements PipeTransform {

  constructor(private decimalPipe: DecimalPipe) {}

  transform(value: number, roundoff:boolean=true): string | null  {
    if(roundoff)
      return this.decimalPipe.transform(value, '1.0-0');
    else
      return this.decimalPipe.transform(value, '1.2-2');
  }

}
