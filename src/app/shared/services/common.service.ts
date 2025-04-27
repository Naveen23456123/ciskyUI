import { Injectable } from '@angular/core';
import moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor() { }
  public roundValue(value:number, digit:number=2) : number{
    if(value>0){
      return parseFloat(value.toFixed(digit));
    }
    return 0;
  }

  getDaysDifference(startDate: string | Date, endDate: string | Date): number {
    if(startDate && endDate){
      const start = new Date(startDate);
      const end = new Date(endDate);
      
      const diffTime = Math.abs(end.getTime() - start.getTime());
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // Convert milliseconds to days
    }
    else
     return 0;
  }
  toRoman(num: number): string {
    const romans: { [key: number]: string } = {
      1000: 'M', 900: 'CM', 500: 'D', 400: 'CD',
      100: 'C', 90: 'XC', 50: 'L', 40: 'XL',
      10: 'X', 9: 'IX', 5: 'V', 4: 'IV',
      1: 'I'
    };
    let result = '';
    for (const value of Object.keys(romans).map(Number).sort((a, b) => b - a)) {
      while (num >= value) {
        result += romans[value];
        num -= value;
      }
    }
    return result;
  }
    
  costFormatter(value: number): string | number {
    if (value >= 10000000) return value / 10000000 + ' Cr.';
    if (value >= 1000000) return value / 1000000 + ' M';
    if (value >= 1000) return value / 1000 + ' K';
    return value;
  } 
  getMonthandYear(data:any){
    if(data){
      return {month:moment(data).format('MMMM'),year :moment(data).format('YYYY')};
    }
    return {month:'-',year:'-'};
  }  
  
}
