import { group } from '@angular/animations';
import { Component, ElementRef, Inject, Optional, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogOperation, PermissionGuids } from '@app/shared/models/constant.config';
import { CommonService } from '@app/shared/services/common.service';
import { ProfitLossInterfaceService } from '@app/shared/services/external/profit-loss-interface.service';
import { GeneratePdfService } from '@app/shared/services/generate-pdf.service';
import { SessionService } from '@app/shared/services/session.service';

export type Row = { type: 'group'; label: string, id: string, key: string } | {
  id?: string;
  type?: 'data' | 'totalinfo' | 'totalfooter' | 'totalSeparate';
  name?: string;
  isEditing?: boolean,
  isEdited?: false,
  actualamount?: number;
  previousexpenditure?: number;
  group?: string;
  isincome?: boolean;
  noteno?: string;
  order?: number;
};
@Component({
  selector: 'app-profit-loss-inv-details',
  standalone: false,
  templateUrl: './profit-loss-inv-details.component.html',
  styleUrl: './profit-loss-inv-details.component.scss'
})
export class ProfitLossInvDetailsComponent {
  public data: any;
  isLoading = true;
  deleteProfitLoss = false;
  pagePermissions: any = {};
  isClicked = false;
  dataObj: any = {};
  today: Date = new Date();
  constructor(@Inject(MAT_DIALOG_DATA) data: any,
    @Optional() private dialogRef: MatDialogRef<ProfitLossInvDetailsComponent>, private profitLossService: ProfitLossInterfaceService
   
  ) {
    this.data = data || {};
  }
  ngOnInit() {

    if (this.data.element) {
      this.deleteProfitLoss = this.data.type == DialogOperation.DELETE;
      this.isLoading = false;
    }
  }

  delete() {
    this.profitLossService.deleteProfitLoss({ id: this.data.element.id }, '').subscribe((response: any) => {
      if (response && response.success) {
        this.dialogRef.close({ value: this.data.element.id, valid: true });
      }
    })
  }


}



