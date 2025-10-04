import { Component,ElementRef,EventEmitter,Output,ViewChild,inject} from '@angular/core';
import { untilDestroyed } from '@app/core/until-destroyed';
import { ContractorInterfaceService } from '@app/shared/services/external/contractor-interface.service';
import { GeneratePdfService } from '@app/shared/services/generate-pdf.service';
import { SessionService } from '@app/shared/services/session.service';

import { finalize, Subscription, take } from 'rxjs';
import { PdfViewerComponent } from '../../pdf-viewer/pdf-viewer.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CommonService } from '@app/shared/services/common.service';


@Component({
  selector: 'app-contractor-billing-details',
  standalone: false,
  templateUrl: './contractor-billing-details.component.html',
  styleUrl: './contractor-billing-details.component.scss'
})
export class ContractorBillingDetailsComponent {
  private subscription: Subscription = new Subscription();
  isLoading=true;
  billingList:any[]= [];
  readonly dialog = inject(MatDialog);
  private defaultdialogoptions:  MatDialogConfig = {       
      disableClose: false,
      data: {},
    };
  pdfStart=false;
 @ViewChild('pdfContent', { static: false }) pdfContent!: ElementRef;
  constructor(private sessionService : SessionService,private contractorBillingService:ContractorInterfaceService,
    private pdfService:GeneratePdfService, private commonService:CommonService
  ){
  
  }

  ngOnInit()  {
    this.subscription= this.sessionService.projectEntitySubject$.pipe(untilDestroyed(this)).subscribe((response:any)=>{     
      if(response && response.projectId){
        this.contractorBillingService.getContractorBillingByProjectIdandOrgId({ 
          projectId: response.projectId,
          contractorId: response.isConsultant? '': response.contractorId 
        }, '')
        .pipe(finalize(() => this.isLoading = false))
        .subscribe((response: any) => {
          if (response && response.success) {
            this.billingList = response.data.map((data:any)=>({
            id:data.id,
            //bill details
            parentid:data.parentid,
            billtypeid: data.billtypeid,
            billcategoryid :data.billcategoryid,
            billtype: data.billtype,
            billPercentage: this.commonService.getContractorBillTypePercentage(data.billtype),
            billcategory :data.billcategory,
            billnumber:data.billnumber,
            billstartdate:data.billstartdate,
            billenddate:data.billenddate,
            billsubmitdate:data.billsubmitdate,
            billworkdoneamount:data.billworkdoneamount,
            billescamount:data.billescamount,
            billgstamount:data.billgstamount,
            billdeductsubamount:data.billdeductsubamount,
            submittedBillAmount: this.getattributes(data).submittedBillAmount,
            billsubmittedpercamount:data.billsubmittedpercamount,
            billsubmittedPercentage :this.getattributes(data).submittedPercentage,
            billsubmittedletterid:data.billsubmittedletterid,
            // sitebill details
            sitebillrecommbilldate:data.sitebillrecommbilldate,
            sitebillldamount:data.sitebillldamount,
            sitebillwithheldamount:data.sitebillwithheldamount,
            sitebillworkdoneamount:data.sitebillworkdoneamount,
            sitebillescamount:data.sitebillescamount,
            sitebillgstamount:data.sitebillgstamount,
            sitebilldeductsubmittedamount:data.sitebilldeductsubmittedamount,
            siterecombillamountpercent :this.getattributes(data).siterecombillamountpercent,
            sitebillrecommpercamount:data.sitebillrecommpercamount,
            siterecommendedbillamount:this.getattributes(data).siterecommendedbillamount,
            sitebillreleasedwithheldamount:data.sitebillreleasedwithheldamount,
            sitebillattachmentid:data.sitebillattachmentid,//doc
            remarks:data.remarks,      
            // HO bill details
            horecommbilldate:data.horecommbilldate,
            howorkdoneamount:data.howorkdoneamount,
            hoescamount:data.hoescamount,
            hogstamount:data.hogstamount,
            hodeductedsubmittedamount:data.hodeductedsubmittedamount,
            horecommendedbillamount: this.getattributes(data).horecommendedbillamount,
            horecommpercentageamount:data.horecommpercentageamount,
            horecombillamountpercent:this.getattributes(data).horecombillamountpercent,
            holdamount:data.holdamount,
            howithheldamount:data.howithheldamount,
            horeleasedwithheldamount:data.horeleasedwithheldamount,
            hoAttachment:data.hoAttachment,
            horecommletterid:data.horecommletterid
          })); 
          const lookup: { [id: string]: any } = {};
          this.billingList.forEach(item => {
            lookup[item.id] = { ...item, children: [] };
          });
          const tree = this.billingList
          .map(item => {
            if (item.parentid) {
              const parent = lookup[item.parentid];
              if (parent) {
                parent.child = lookup[item.id]; 
              }
              return null; 
            } else {
              return lookup[item.id]; 
            }
          })
          .filter(item => item !== null)
           this.billingList= tree;
          }
        });
      }
    });
  }
  getattributes(data:any){  
    let billAmount=(parseFloat(data.billworkdoneamount)+parseFloat(data.billescamount))-(parseFloat(data.billgstamount)+parseFloat(data.billdeductsubamount));
    let sitebillAmount=(parseFloat(data.sitebillworkdoneamount)+parseFloat(data.sitebillescamount))-(parseFloat(data.sitebillgstamount)+parseFloat(data.sitebilldeductsubmittedamount));
    let hobillAmount=(parseFloat(data.howorkdoneamount)+parseFloat(data.hoescamount))-(parseFloat(data.hogstamount)+parseFloat(data.hodeductedsubmittedamount));

    return {
      submittedBillAmount:!isNaN(billAmount) ? billAmount :0,
      submittedPercentage:(parseFloat(data.billsubmittedpercamount)/(billAmount))*100,
      siterecommendedbillamount:!isNaN(sitebillAmount) ?sitebillAmount:0,
      siterecombillamountpercent:(parseFloat(data.sitebillrecommpercamount)/(sitebillAmount))*100,
      horecommendedbillamount:!isNaN(hobillAmount) ? hobillAmount:0,
      horecombillamountpercent:(parseFloat(data.horecommpercentageamount)/(hobillAmount))*100,
    }
  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  download(){
    this.pdfStart=true;
    this.pdfService.generateAndGetPDF(this.pdfContent, 'Contractor_Bill.pdf').then((pdf) => {
      if (pdf) {
        this.pdfStart=false;        
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
