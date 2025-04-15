import { Injectable } from '@angular/core';
import { Logger } from '@app/core/logger.service';
import { ReplaySubject } from 'rxjs';

const log = new Logger('StateDataService');

@Injectable({
  providedIn: 'root'
})
export class StateDataService {

  public stateDataSubject: ReplaySubject<any> = new ReplaySubject(1);
  public stateDataSubject$ = this.stateDataSubject.asObservable();
  
  constructor() { }

}
