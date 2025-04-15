import { Injectable } from '@angular/core';

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
}
