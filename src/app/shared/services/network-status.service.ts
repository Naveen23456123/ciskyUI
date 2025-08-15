import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NetworkStatusService {
  
 private online$ = new BehaviorSubject<boolean>(navigator.onLine);

  constructor(private ngZone: NgZone) {
    window.addEventListener('online', () => {
      this.ngZone.run(() => this.online$.next(true));
    });

    window.addEventListener('offline', () => {
      this.ngZone.run(() => this.online$.next(false));
    });
  }

  get status$(): Observable<boolean> {
    return this.online$.asObservable();
  }
}
