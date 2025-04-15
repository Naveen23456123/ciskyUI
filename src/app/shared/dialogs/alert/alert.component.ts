import { Component, OnInit, Inject,Output, EventEmitter } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModelAlertData, AlertType } from '../../models/ModelAlertData';

@Component({
  standalone:false,
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {
  isLoading=true;
  public data: any;

  constructor(
    @Inject(MAT_DIALOG_DATA)  data: ModelAlertData
  ) {

    this.data = data || {};
   }

  ngOnInit(): void {
    this.isLoading=false;
  }
  getAlertIcon() {
    switch (this.data.alertType) {
      case AlertType.INFO: return 'info';
      case AlertType.ERROR: return 'error';
      case AlertType.WARNING: return 'warning';
    }    
    return '';
  }


}
