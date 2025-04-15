import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'replaceUnderscore',
  standalone: false
})
export class ReplaceUnderscorePipe implements PipeTransform {

  transform(value: string, replacement: string=' '): unknown {
    return value.replace(/_/g, replacement);
  }

}
