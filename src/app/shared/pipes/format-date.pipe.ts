import { Pipe, PipeTransform } from '@angular/core';
import moment from 'moment';

@Pipe({
  name: 'formatDate',
  standalone: false,
})
export class FormatDatePipe implements PipeTransform {

  transform(value: any,format: string ='MMM DD, YYYY'): string {
        if(value!=='' && value!== null)
          return moment(value).format(format);
        else
          return '-';
      }

}
