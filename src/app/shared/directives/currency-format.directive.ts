import { Directive, HostListener, ElementRef } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appCurrencyFormat]',
  standalone: false
})
export class CurrencyFormatDirective {

  private regex = new RegExp(/[^0-9]/g);

  constructor(private el: ElementRef, private control: NgControl) { }

  @HostListener('input', ['$event'])
  onInput(event: any) {
    let value = this.el.nativeElement.value;
    console.log(value);
    // Remove non-digits
    value = value.replace(this.regex, '');

    // Format with Indian numbering system
    if (value.length > 3) {
      value = value.replace(/(\d)(?=(\d{2})+\d$)/g, '$1,');
    }

    // Set formatted value for display
    this.el.nativeElement.value = value;
  }

  @HostListener('blur')
  onBlur() {
    // Convert display value (with commas) → number for form
    const rawValue = this.el.nativeElement.value.replace(/,/g, '');

    // Update FormControl **with numeric value**
    this.control.control?.setValue(rawValue ? Number(rawValue) : 0);
  }

}
