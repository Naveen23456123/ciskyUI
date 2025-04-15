import { Pipe, PipeTransform } from '@angular/core';
import  moment from 'moment';

@Pipe({
  standalone:false,
  name: 'dateTime'
})
export class DateTimePipe implements PipeTransform {

  transform(value: any,format: string ='MMM DD, YYYY hh:mm A'): string {
    if(value!=='')
      return moment(value).format(format);
    else
      return '-';
  }

}
