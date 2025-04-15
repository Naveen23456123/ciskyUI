import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Logger } from '@app/core/logger.service';

const log = new Logger('HelperService');
@Injectable({
  providedIn: 'root'
})
export class HelperService {
  private config = {
    set: false,
    api: {
      url: '',
      prefix: ''
    },
    loginUrl: ''
  };
  pageSize: number = 10;
  constructor(private _httpclient: HttpClient) { }

  public getRunTimeConfigFile(configFile: any) {    
    return new Observable((sub) => {
      if (this.config.set) {
        sub.next(this.config);
        sub.complete();
      }
      else {
        this._httpclient.get(configFile).subscribe({
          next: (content: any) => {
          this.config = content;
          this.config.set = true;
          sub.next(this.config);
          sub.complete();
        },
          error: (err) => { sub.error(err); }});
      }
    });
  }

  public apiConfig() {
    return this.config;
  }

  /***get page size of=for the pagination */
  getPageSize() {
    return this.pageSize;
  }
  /*** Create the pagination option for data depend upon the lenth of the passed-in objects */
  paginationOptionGeneration(data: any[], totalrecords: number) {
    const datalength = totalrecords;

    const paginationOptions = [];
    if (datalength > 10) {
      paginationOptions.push(10)
    }
    if (datalength > 20) {
      paginationOptions.push(20)
    }
    if (datalength > 30) {
      paginationOptions.push(30)
    }
    if (datalength > 40) {
      paginationOptions.push(40)
    }
    if (data)
      paginationOptions.push(totalrecords);
    return paginationOptions;
  }
}
