import { Injectable } from '@angular/core';
import { Locker, DRIVERS, IStorageSetConfig } from 'angular-safeguard';
import { AES, enc, HmacSHA256 } from 'crypto-js';
import { Logger } from '@app/core/logger.service';


const log = new Logger('Storage service');

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  public driver: any = {
    memory: DRIVERS.MEMORY,
    cookie: DRIVERS.COOKIE,
    session: DRIVERS.SESSION,
    local: DRIVERS.LOCAL

  };

  private defaultDriver: DRIVERS = this.driver.session;
  private sec = '{ng-pms}';

  constructor() {

  }

  // constructor(private locker: Locker) {
  //   this.locker.setNamespace('vms');
  //   this.locker.setSeparator('-');
  //   this.locker.setDriverFallback([DRIVERS.COOKIE, DRIVERS.LOCAL]);
  // }

  public set(key: string, data: any, config: IStorageSetConfig = {}, driverOverride: DRIVERS = this.defaultDriver): void {
    const enckey = this.sha(key);
    const encval = this.encode(data);
    let updateconfig = config;

    if (driverOverride === this.driver.cookie) {
      updateconfig = {
        secure: window.location.protocol === 'https:' ? true : false,
        path: '/',
        domain: window.location.hostname
      };
    }
    sessionStorage.setItem(enckey,encval);
    //this.locker.set(driverOverride, enckey, encval, updateconfig);
  }

  public get(key: string, driverOverride: DRIVERS = this.defaultDriver): any {
    const enckey = this.sha(key);
    console.log(enckey);
    if (this.has(key, driverOverride)) {
      console.log(this.parse(sessionStorage.getItem(enckey)));
      return this.parse(sessionStorage.getItem(enckey));
      //return this.parse(this.locker.get(driverOverride, decodeURIComponent(enckey)));     
    }
    else {
      return undefined;
    }
  }

  private has(key: string, driverOverride: DRIVERS = this.defaultDriver): boolean {
    const enckey = this.sha(key);
    return sessionStorage.getItem(enckey) !== null
    //return this.locker.has(driverOverride, enckey);
    //return true;
  }

  private hasEnc(key: string, driverOverride: DRIVERS = this.defaultDriver): boolean {
    //return this.locker.has(driverOverride, decodeURIComponent(key));
    return true;
  }

  public clear(driverOverride: DRIVERS = this.defaultDriver): void {
    if (driverOverride === this.defaultDriver) {
      try {
        const cookiesName = document.cookie.split(/=/);
        for (let i = 0; i < cookiesName.length; i++) {
          if (/^vms-/.test(cookiesName[i])) {
            const split = cookiesName[i].split('vms-')[1];
            if (this.hasEnc(split)) {
              const updateconfig = {
                secure: window.location.protocol === 'https:' ? true : false,
                maxAge: 0,
                domain: window.location.hostname,
                path: '/',
                expires: 'Thu, 01 Jan 1970 00:00:00 UTC',
              };
              // this.locker.set(driverOverride, decodeURIComponent(split), '', updateconfig);
              // this.locker.remove(driverOverride, decodeURIComponent(split));
            }
          }
        }
      }
      catch (e) {
        //this.locker.clear(driverOverride);
        log.info('Unable to clear cookies', e);

      }
    }
  }
  private parse(value: any) {
    const decvalue = AES.decrypt(value, this.sec);
    let parsed;
    try {
      parsed = JSON.parse(decvalue.toString(enc.Utf8));
      return parsed;
    }
    catch (e) {
      parsed = decvalue.toString(enc.Utf8);
      return parsed;
    }
  }

  private encode(value: any) {
    return AES.encrypt(JSON.stringify(value), this.sec).toString();
  }

  private sha(value: string) {
    return HmacSHA256(value, this.sec).toString(enc.Base64);
  }
}
