import { Pipe, PipeTransform } from '@angular/core';
import  moment from 'moment';

@Pipe({
  standalone:false,
  name: 'time'
})
export class TimePipe implements PipeTransform {

  transform(value: string,format: string ='hh:mm A'): string {
    if (value)
      return moment(value).format(format);
    else
      return '';
  }

}
