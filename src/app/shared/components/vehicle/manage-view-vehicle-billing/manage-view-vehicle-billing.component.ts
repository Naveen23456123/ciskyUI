import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { DialogService } from '@app/shared/services/dialog.service';
import { VehicleBillingInterfaceService } from '@app/shared/services/external/vehicle-billing-interface.service';
import { GeneratePdfService } from '@app/shared/services/generate-pdf.service';
import { finalize } from 'rxjs';
import { PdfViewerComponent } from '../../pdf-viewer/pdf-viewer.component';

@Component({
  selector: 'app-manage-view-vehicle-billing',
  standalone: false,
  templateUrl: './manage-view-vehicle-billing.component.html',
  styleUrl: './manage-view-vehicle-billing.component.scss'
})
export class ManageViewVehicleBillingComponent {
  data:any;
  isLoading=true;
  billingList:any=[];
  today= new Date();
  billing:any={};
  displayedColumns: string[] = ['serial','desc', 'entity', 'rate','amount'];
  dataSource!: MatTableDataSource<any[]>;
  @ViewChild('pdfContent', { static: false }) pdfContent!: ElementRef;
  private defaultdialogoptions:  MatDialogConfig = {       
    disableClose: false,
    data: {},
  };
  constructor(@Inject(MAT_DIALOG_DATA) data: any,private pdfService:GeneratePdfService, 
  private dialogService:DialogService,private dialog: MatDialog,
  private billingService:VehicleBillingInterfaceService){
      this.data= data || {};
      this.dataSource = new MatTableDataSource(this.billingList);
  }

  ngOnInit(){
    this.billing.overallstatus= this.data.element.overallstatus;
    this.billingService.getVehicleBillingById({id:this.data.element.id},'')
    .pipe(finalize(() => {this.isLoading = false;})).subscribe((response:any)=>{
      if(response && response.success){
        this.billing={...this.billing,... response.data[0]};
        var objData = response.data[0];
        if(objData){
        let data:any = {
          1: {desc:'Fixed Km', entity: objData.fixedkm +' Kms.',rate:objData.fixedamount, amount: objData.fixedamount },
          2: {desc:'Total Running (Excluding Fixed)', 
                    entity: objData.totalreading > objData.fixedkm 
                            ? (objData.totalreading - objData.fixedkm) + ' Kms.' 
                            : '0 Kms',
                   rate: objData.totalreading > objData.fixedkm 
                            ? objData.extrakmamount 
                            : 0,
                    amount: objData.totalreading > objData.fixedkm 
                            ? (objData.totalreading - objData.fixedkm) * objData.extrakmamount 
                            : 0},
          3: {desc:'Sunday Duties', 
                    entity: (objData.sundays ??0) +' Days',
                    rate:objData.sundayamount, 
                    amount: objData.sundays*objData.sundayamount },
          4: {desc:'Night Duties', 
                    entity: (objData.nights ??0)  +' Days',
                    rate:objData.nightamount, 
                    amount: objData.nights*objData.nightamount },
          5: {desc:'Extra Hours', 
                    entity: (objData.hours ??0) +' Hrs.',
                    rate:objData.houramount, 
                    amount: objData.hours*objData.houramount },
          6: {desc:'Additional/Previous Unbilled Amount', 
                    entity: (objData.additionalcharges ??0),
                    rate:(objData.additionalcharges ??0), 
                    amount: (objData.additionalcharges ??0) }
        };
        this.billingList = Object.keys(data).map(key => {
          return {
            srno: key,
            ...data[key]  
          };
        });
        this.dataSource = new MatTableDataSource<any>(this.billingList);
      }
    }
    })
  }
  getTotalAmount(): number {
    return this.billing.billamount;
  }
 download(){
    this.pdfService.generateAndGetPDF(this.pdfContent, this.billing.vehicleno+'.pdf').then((pdf) => {
      if (pdf) {
        const config = this.defaultdialogoptions;
        config.minWidth='80vw';
        config.data = {
          url:false,
          element:pdf
        };
        this.dialog.open(PdfViewerComponent,config);
      }
    });
  }
}
