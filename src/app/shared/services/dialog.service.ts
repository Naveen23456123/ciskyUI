import { Injectable, TemplateRef } from '@angular/core';
import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material/dialog';
import { AlertComponent } from '../dialogs/alert/alert.component';
import { ModelAlertData, AlertType } from '../models/ModelAlertData';
import { ComponentType } from '@angular/cdk/portal';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  private defaultdialogoptions: MatDialogConfig = {
    width: '500px',
    data: {},

  };
  constructor(private _dialog: MatDialog, private _translate: TranslateService) { }

  public open<T, D = any, R = any>(componentOrTemplateRef: ComponentType<T> | TemplateRef<T>, config: MatDialogConfig<D> = this.defaultdialogoptions): MatDialogRef<T, R> {
    const dialogRef = this._dialog.open(componentOrTemplateRef, config);
    return dialogRef;
  }


  public info(message: string, customtitle?: string,  acceptlabel?: string , cancelLabel?: string)
  {
    const config = this.defaultdialogoptions;
    config.data = new ModelAlertData({
      title: this._translate.instant(customtitle || 'Info'),
      content: this._translate.instant(message),
      acceptLabel: this._translate.instant(acceptlabel ?? []),
      alertType: AlertType.INFO,
      closeLabel: this._translate.instant(cancelLabel || 'Close')
    });

    return this.open(AlertComponent, config);
  }

  public error(message: string, customtitle?: string,  acceptlabel?: string, cancelLabel?: string)
  {
    const config = this.defaultdialogoptions;
    config.data = new ModelAlertData({
      title: this._translate.instant(customtitle || 'Error'),
      content: this._translate.instant(message),
      acceptLabel: this._translate.instant(acceptlabel ?? []),
      alertType: AlertType.ERROR,
      closeLabel: this._translate.instant(cancelLabel || 'Close')
    });

    return this.open(AlertComponent, config);
  }

  public warn(message: string, customtitle?: string,  acceptlabel?: string, cancelLabel?: string)
  {
    const config = this.defaultdialogoptions;
    config.data = new ModelAlertData({
      title: this._translate.instant(customtitle || 'Warn'),
      content: this._translate.instant(message),
      acceptLabel: acceptlabel ? this._translate.instant(acceptlabel):null,
      alertType: AlertType.WARNING,
      closeLabel: this._translate.instant(cancelLabel || 'Close')
    });

    return this.open(AlertComponent, config);
  }
 }
