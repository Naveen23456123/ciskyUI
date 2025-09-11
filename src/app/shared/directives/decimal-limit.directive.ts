import { Directive, HostListener, Input } from '@angular/core';
import { NgControl } from '@angular/forms';
import { DECIMAL_LIMIT } from '../models/constant.config';

@Directive({
  selector: '[appDecimalLimit]',
  standalone: false
})
export class DecimalLimitDirective {

  @Input('appDecimalLimit') limitKey!: keyof typeof DECIMAL_LIMIT;

  constructor(private control: NgControl) {}

  @HostListener('input', ['$event']) onInputChange(event: any) {
    let value: string = event.target.value;
    const decimalLimit = DECIMAL_LIMIT[this.limitKey] ?? 2;

    // Allow only digits and dot
    value = value.replace(/[^0-9.]/g, '');

    // Prevent multiple dots
    const parts = value.split('.');
    if (parts.length > 2) {
      value = parts[0] + '.' + parts.slice(1).join('');
    }
    
    // Apply decimal limit only if decimal exists
    if (parts[1] && parts[1].length > decimalLimit) {
      parts[1] = parts[1].substring(0, decimalLimit);
      value = parts.join('.');
    }
    // Set value back if changed
    if (value !== event.target.value) {
      this.control.control?.setValue(value, { emitEvent: false });
    }
  }
}


