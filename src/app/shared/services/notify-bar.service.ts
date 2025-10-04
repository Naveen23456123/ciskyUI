import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, Observable } from 'rxjs';
import { INotifyBarModel } from '../models/NotifyBarModel';
import { AppSnackbarComponent } from '../components/app-snackbar/app-snackbar.component';



@Injectable({
  providedIn: 'root'
})
export class NotifyBarService {

  private messages: BehaviorSubject<INotifyBarModel[]> = new BehaviorSubject<INotifyBarModel[]>([]);
  public messages$: Observable<INotifyBarModel[]> = this.messages.asObservable();

  constructor(private _snackbar: MatSnackBar) { }

  public broadcast(message: INotifyBarModel[]) {
    this.messages.next(this.messages.value.concat(message));
  }

  public clear(type?: string) {
    const without:any = [];
    if (type) {
      this.messages.value.forEach((message)   => {
        if (message.Type !== type) {
          without.push(message);
        }
      });
    }
    this.messages.next(without);
  }

  // public showsnackbar(text: string, params: any = { duration: 3000 }) {
  //   // set timeout because of angular bug
  //   setTimeout(() => {
  //     this._snackbar.open(text, '', params);
  //   });

  //}
  public showsnackbar(text: string,isError: boolean = false,params: any = { duration: 3000 }
  ) {
    setTimeout(() => {
      this._snackbar.openFromComponent(AppSnackbarComponent, {
        data: { message:text,iserror:isError },
        duration: 3000,
        panelClass: isError ? 'snackbar-error' : 'snackbar-success'
      });
    });
  }
}
