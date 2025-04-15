import {AfterViewInit, Component, ViewChild, inject} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { finalize, Subscription } from 'rxjs';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { SessionService } from '@app/shared/services/session.service';
import { HelperService } from '@app/shared/services/helper.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { TemplateType } from '@app/shared/models/CSVTemplate';
import { ManageContractorBillingComponent } from '../manage-contractor-billing/manage-contractor-billing.component';
import { UploadFileComponent } from '../../upload-file/upload-file.component';
import { ContractorInterfaceService } from '@app/shared/services/external/contractor-interface.service';
import { NotifyBarService } from '@app/shared/services/notify-bar.service';
import { DialogOperation } from '@app/shared/models/constant.config';
import { untilDestroyed } from '@app/core/until-destroyed';
import { CommonService } from '@app/shared/services/common.service';
import { ViewLetterDetailsComponent } from '../../letters/view-letter-details/view-letter-details.component';

@Component({
  selector: 'app-contractor-billing-list',
  standalone: false,
  templateUrl: './contractor-billing-list.component.html',
  styleUrl: './contractor-billing-list.component.scss'
})
export class ContractorBillingListComponent {
  billingList:any[]= [];
  isLoading = true;
  displayedColumns: string[] = ['serial','billstartDate','billendDate', 'billnumber',  'billType','category','action'];
  dataSource!: MatTableDataSource<any[]>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  pagination: any;
  pageSize!: number;
  readonly dialog = inject(MatDialog);
  private subscription: Subscription = new Subscription();

   private defaultdialogoptions:  MatDialogConfig = {
        disableClose: false,
        data: {},
      };

  constructor(private sessionService : SessionService,private contractorBillingService:ContractorInterfaceService,
      private router: Router,private route: ActivatedRoute,private helperService:HelperService,
    private notifyBarService:NotifyBarService, private commonService:CommonService){     
       this.dataSource = new MatTableDataSource(this.billingList);
    }

    ngOnInit()  {
      this.subscription= this.sessionService.projectEntitySubject$.pipe(untilDestroyed(this)).subscribe((response)=>{     
          if(response && response.projectId){
            this.contractorBillingService.getContractorBillingByProjectIdandOrgId({ 
              projectId: response.projectId,
              contractorId: response.isConsultant? '': response.contractorId 
            }, '')
            .pipe(finalize(() => this.isLoading = false))
            .subscribe((response: any) => {
              if (response && response.success) {
               this.billingList = response.data;
               let billingData = response.data.map((data:any)=>({
                id:data.id,
                //bill details
                billtypeid: data.billtypeid,
                billcategoryid :data.billcategoryid,
                billtype: data.billtype,
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

               this.dataSource = new MatTableDataSource(billingData);               
               this.updateTable(billingData);              
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

    ngAfterViewInit() {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  
    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
  
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }

    private updateTable(info: any) {
      this.dataSource = new MatTableDataSource<any>(info);
      this.pagination = this.helperService.paginationOptionGeneration(info, 10);
      this.pageSize = this.helperService.getPageSize();
    }
    import() {
     const config = this.defaultdialogoptions;
          config.minWidth='75vw';          
            config.data = {
              pageGuid: this.route.snapshot.data['pageGuid'],
              type: this.route.snapshot.data['type'], 
              template_type: TemplateType.CONTRACTORBILLING   
            };
              this.dialog.open(UploadFileComponent,config);
    }
    export() {
      
    }
    
    billing(){
        const config = this.defaultdialogoptions;
        config.data = {
          pageGuid: this.route.snapshot.data['pageGuid'],
          type: DialogOperation.ADD,    
        };
        config.minWidth='75vw';    
        const dialogRef = this.dialog.open(ManageContractorBillingComponent, config);
        dialogRef.afterClosed().subscribe((data:any) => {
          if (data && data.valid) {          
            this.notifyBarService.showsnackbar('The Contractor Billing created successfully.');
            this.addRowData(data.value);
          }
          else {
            //this.router.navigate(['../'], { relativeTo: this.route });
          }
        });
    }

  edit_billing(row:any){
    const config = this.defaultdialogoptions;
    config.data = {
      pageGuid: this.route.snapshot.data['pageGuid'],
      type: DialogOperation.EDIT,    
      element:row
    };
    config.minWidth='75vw';    
    const dialogRef = this.dialog.open(ManageContractorBillingComponent, config);
    dialogRef.afterClosed().subscribe((data:any) => {
      if (data && data.valid) {
        this.notifyBarService.showsnackbar('The Contractor Billing updated successfully.');        
        this.updateRowData(data.value);
      }
      else {
        //this.router.navigate(['../'], { relativeTo: this.route });
      }
    });
  }

  delete_billing(row:any){
    const config = this.defaultdialogoptions;
    config.data = {
      pageGuid: this.route.snapshot.data['pageGuid'],
      type: DialogOperation.DELETE,
      element:row    
    };
    config.minWidth='45vw';    
    const dialogRef = this.dialog.open(ManageContractorBillingComponent, config);
    dialogRef.afterClosed().subscribe((data:any) => {
      if (data && data.valid) {      
        this.notifyBarService.showsnackbar('The Contractor Billing Removed successfully.');
        this.deleteRow(data.value);
      }
      else {
        //this.router.navigate(['../'], { relativeTo: this.route });
      }
    });
  }

  updateRowData(data: any) {
    const element:any = this.dataSource.data.find((x:any) => x.id == data.id);
    if(element){
    element.id = data.id;
      //bill details
      element.billtypeid= data.billtypeid,
      element.billcategoryid =data.billcategoryid,
      element.billtype= data.billtype,
      element.billcategory =data.billcategory,      
      element.billnumber=data.billnumber,
      element.billstartdate=data.billstartdate,
      element.billenddate=data.billenddate,
      element.billsubmitdate=data.billsubmitdate,
      element.billworkdoneamount=data.billworkdoneamount,
      element.billescamount=data.billescamount,
      element.billgstamount=data.billgstamount,
      element.billdeductsubamount=data.billdeductsubamount,
      element.submittedBillAmount= this.getattributes(data).submittedBillAmount,
      element.billsubmittedpercamount=data.billsubmittedpercamount,
      element.billsubmittedPercentage =this.getattributes(data).submittedPercentage,      
      element.billsubmittedletterid=data.billsubmittedletterid,
      // sitebill details
      element.sitebillrecommbilldate=data.sitebillrecommbilldate,
      element.sitebillldamount=data.sitebillldamount,
      element.sitebillwithheldamount=data.sitebillwithheldamount,
      element.sitebillworkdoneamount=data.sitebillworkdoneamount,
      element.sitebillescamount=data.sitebillescamount,
      element.sitebillgstamount=data.sitebillgstamount,
      element.sitebilldeductsubmittedamount=data.sitebilldeductsubmittedamount,
      element.siterecombillamountpercent =this.getattributes(data).siterecombillamountpercent,
      element.sitebillrecommpercamount=data.sitebillrecommpercamount,
      element.siterecommendedbillamount=this.getattributes(data).siterecommendedbillamount,
      element.sitebillreleasedwithheldamount=data.sitebillreleasedwithheldamount,
      element.sitebillattachmentid=data.sitebillattachmentid,//doc
      element.remarks=data.remarks,      
      // HO bill details
      element.horecommbilldate=data.horecommbilldate,
      element.howorkdoneamount=data.howorkdoneamount,
      element.hoescamount=data.hoescamount,
      element.hogstamount=data.hogstamount,
      element.hodeductedsubmittedamount=data.hodeductedsubmittedamount,
      element.horecommendedbillamount=this.getattributes(data).horecommendedbillamount,
      element.horecommpercentageamount=data.horecommpercentageamount,
      element.horecombillamountpercent=this.getattributes(data).horecombillamountpercent,
      element.holdamount=data.holdamount,
      element.howithheldamount=data.howithheldamount,
      element.horeleasedwithheldamount=data.horeleasedwithheldamount,
      element.hoAttachment=data.hoAttachment,
      element.horecommletterid=data.horecommletterid
    this.dataSource._updateChangeSubscription();
    }
  }
  addRowData(data: any) {
    const data1:any = {
      id:data.id,
      //bill details
      billtypeid: data.billtypeid,
      billcategoryid :data.billcategoryid,
      billtype: data.billtype,
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
    }      
    this.dataSource.data.unshift(data1);  
    this.dataSource._updateChangeSubscription();
  }
  deleteRow(data: any) {
    const index = this.dataSource.data.findIndex((x:any) => x.id == data.id);
    this.dataSource.data.splice(index, 1);
    this.dataSource._updateChangeSubscription();
  }
  round(value:any){
    return this.commonService.roundValue(value);
  }
  viewletter(data:any){
    const config = this.defaultdialogoptions;
    config.minWidth='1200px';
    config.data = {
      pageGuid: this.route.snapshot.data['pageGuid'],
      type: this.route.snapshot.data['type'],
      element:{id:data}
    };
    this.dialog.open(ViewLetterDetailsComponent,config);
  }
}


