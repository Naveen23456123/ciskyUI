import { Injectable } from '@angular/core';
import { Idle } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';
import { DialogService } from './dialog.service';
import { StorageService } from './storage.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import  moment from 'moment';
import { Logger } from '@app/core/logger.service';
import { HelperService } from './helper.service';
import { SessionService } from './session.service';
const log = new Logger('InactivityService');
@Injectable({
  providedIn: 'root'
})
export class InactivityService {

  constructor(
    private _idle: Idle,
    private _keepalive: Keepalive,
    private _dialog: DialogService,
    private _storageservice: StorageService,
    private _dialogRef: MatDialog,
    private _router: Router,
    private _helperService: HelperService, private sessionervice: SessionService) {

  }

  public setTimeOut() {
    // inactivity timeout configuration
    this._idle.setIdle(10); // 900s for 15 min the user is consider to be idle

    this._idle.setTimeout(10); // 120s for 2 minutes of being idle ( after 17 minutes of total inactivity) , user is time out and session can be cleared

    this._keepalive.interval(300); // Hit the pinsession API every 300s tio keep the session alive
    this._keepalive.onPing.subscribe(() => { });


    this._idle.onIdleStart.subscribe(() => {
      this._dialog.info('Your session will expire in 2 minutes. Please click Continue to continue your session.', 'Session Timeout', 'Continue')
        .afterClosed().subscribe(() => {
          this._idle.interrupt();
        });
    });

    this._idle.onTimeout.subscribe(() => {
      log.info(`Session expired at ${moment().format('LLLL')}`);
      this.logout();
    });
    this._idle.watch();
  }

  public logout() {    
    this._storageservice.clear();
    this._dialogRef.closeAll();    
    this._idle.stop();
     this.sessionervice.setWorkingLocation(null);
     this.sessionervice.setOrganization(null);
    // this.sessionervice.workingLocationSubject$.pipe().subscribe((org) => {
    //   log.debug(org);
    // });
    //@TODO:Better Logout
    if (this._helperService.apiConfig().set && this._helperService.apiConfig().loginUrl) {
      window.location.href = this._helperService.apiConfig().loginUrl;
    }
    else {
      this._router.navigateByUrl('session-end').then(() => {       
        this._storageservice.clear();
        this._dialogRef.closeAll();
        this._idle.stop();
      });
    }
  }
}

