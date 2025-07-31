import { ChangeDetectorRef, Component,EventEmitter,Output,ViewChild,inject} from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { untilDestroyed } from '@app/core/until-destroyed';;
import { InvoiceService } from '@app/invoice-control/invoice.service';
import { StaffType } from '@app/shared/models/constant.config';
import { CommonService } from '@app/shared/services/common.service';
import { CommonInterfaceService } from '@app/shared/services/external/common-interface.service';
import { HelperService } from '@app/shared/services/helper.service';
import { NotifyBarService } from '@app/shared/services/notify-bar.service';
import { SessionService } from '@app/shared/services/session.service';
import { StateDataService } from '@app/shared/services/state-data.service';
import { finalize,forkJoin,Subscription,take } from 'rxjs';

@Component({
  selector: 'app-con-staff-list',
  standalone: false,
  templateUrl: './con-staff-list.component.html',
  styleUrl: './con-staff-list.component.scss'
})
export class ConStaffListComponent {

  kpsData:any[]= [];
  spsData:any[]=[];
  ssData:any[]=[];
  totalData:any[]=[];
  @Output() onAmountChange: EventEmitter<any> = new EventEmitter();
  @Output() onkpAmountChange: EventEmitter<any> = new EventEmitter();
  @Output() onssAmountChange: EventEmitter<any> = new EventEmitter();
  @Output() onspsAmountChange: EventEmitter<any> = new EventEmitter();
  isLoading = true;
  amount:any|null;
  dataColumn: string[] =['serial','desg','name','contract_rate','const','main','totalconstmain','cont_amt','prev_month','prev_amt','curr_month','curr_amt','comlt_month','comlt_amt','rem_month','rem_amt','action'];
  
  footerColumns: string[] = ['serial', 'amount','action'];

  dataSource!: MatTableDataSource<any[]>;
  spsdataSource!: MatTableDataSource<any[]>;
  ssdataSource!: MatTableDataSource<any[]>;
  subscription:Subscription = new Subscription(); 
    readonly dialog = inject(MatDialog);
    
    private defaultdialogoptions:  MatDialogConfig = {
      minWidth: '900px', 
      disableClose: false,
      data: {},
    };
  
   constructor(private invoiceService:InvoiceService,private helperService:HelperService,
    private stateDataService :StateDataService, private notifyBarService :NotifyBarService,
    private sessionService:SessionService, private commonService:CommonService
    
   ){
    this.dataSource = new MatTableDataSource(this.kpsData);
    this.ssdataSource = new MatTableDataSource(this.ssData);
    this.spsdataSource = new MatTableDataSource(this.spsData);
   }
  
   ngOnInit()  {
   this.stateDataService.stateDataSubject.subscribe((data) => {   
      if (data.event == 'contstaffedit'  && data.valid && data.value) {      
        this.updateRowData(data);
        this.notifyBarService.showsnackbar(data.msg);
        this.stateDataService.stateDataSubject.next({});
      } else if (data.event == 'contstaffadd' && data.valid && data.value) {
        this.addBulkRecord(data);
        this.notifyBarService.showsnackbar(data.msg);
        this.stateDataService.stateDataSubject.next({});
      } else if(data.event == 'contstaffdelete' && data.valid && data.value){
        this.deleteRow(data);
        this.notifyBarService.showsnackbar(data.msg);
        this.stateDataService.stateDataSubject.next({});
      }      
      this.getTotalAmount();
    });
    this.subscription = this.sessionService.invoiceEntitySubject$.pipe(take(1)).subscribe((invEntity:any)=>{
      if(invEntity && invEntity.projectId){
        forkJoin({
          staffTypeAPI:this.invoiceService.getStaffTypesList({},''),
          boqstaffAPI:this.invoiceService.getConsultantStaffListByProjectId({id: invEntity.invoiceId,projectid:invEntity.projectId }, '')
        }).pipe(take(1),untilDestroyed(this),finalize(()=>this.isLoading=false)).subscribe((response:any)=>{
          if(response.staffTypeAPI && response.staffTypeAPI.success){
            this.sessionService.setStaffType(response.staffTypeAPI.data);
            let kpItem=  response.staffTypeAPI.data.find((x:any)=>x.name==StaffType.KEY_PROFESSIONAL);       
            let ssItem=  response.staffTypeAPI.data.find((x:any)=>x.name==StaffType.SUPPORT_STAFF);        
            let spsItem=  response.staffTypeAPI.data.find((x:any)=>x.name==StaffType.SUB_PROFESSIONAL);        
            if(response.staffTypeAPI && response.boqstaffAPI.success){
              this.totalData = response.boqstaffAPI.data.map((data:any)=>({
                id: data.id,
                designation :data.designation,
                professionalid:data.professionalid,
                name :data.name,
                rate:data.rate,
                invoiceid:data.invoiceid,
                constructionperiod:data.constructionperiod,
                oandmperiod:data.oandmperiod,
                previousbillmonths:data.previousbillmonths,
                currentbillmonths:data.currentbillmonths,
                totalmonths:this.getattributes(data).totalmonths,
                contractamount:this.getattributes(data).contractamount,
                previousbill:this.getattributes(data).previousbill,
                currentbill:this.getattributes(data).currentbill,
                commulativemonth:this.getattributes(data).commulativemonth,
                commulativeAmount:this.getattributes(data).commulativeAmount,
                remainingmonth:this.getattributes(data).remainingmonth,
                remainingamount:this.getattributes(data).remainingamount
              }));         
              if(this.totalData && this.totalData.length>0){
                this.kpsData=this.totalData.filter((x:any)=>x.professionalid==kpItem.id) ?? [];               
                this.dataSource = new MatTableDataSource(this.kpsData);   
    
                this.ssData =this.totalData.filter((x:any)=>x.professionalid==ssItem.id) ?? [];  
                this.ssdataSource = new MatTableDataSource(this.ssData);
    
                this.spsData =this.totalData.filter((x:any)=>x.professionalid==spsItem.id) ?? [];
                this.spsdataSource = new MatTableDataSource(this.spsData);
               
              }
              this.getTotalAmount();          
            }           
          }      
        }); 
      }
    })
   
  } 

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
  getattributes(data:any){
    return {
      totalmonths:data.constructionperiod+data.oandmperiod,
      contractamount:(data.constructionperiod+data.oandmperiod)*data.rate,
      previousbill:data.previousbillmonths*data.rate,
      currentbill: data.currentbillmonths*data.rate,
      commulativemonth:data.previousbillmonths+data.currentbillmonths,
      commulativeAmount:this.commonService.roundValue((data.previousbillmonths+data.currentbillmonths)*data.rate,2),
      remainingmonth:(data.constructionperiod+data.oandmperiod)-(data.previousbillmonths+data.currentbillmonths),
      remainingamount:((data.constructionperiod+data.oandmperiod)*data.rate)-((data.previousbillmonths+data.currentbillmonths)*data.rate)
    }
  }
  bindBilling(data:any){
    data.totalmonths=data.constructionperiod+data.oandmperiod,
    data.contractamount=(data.constructionperiod+data.oandmperiod)*data.rate,
    data.previousbill=data.previousbillmonths*data.rate,
    data.currentbill=data.currentbillmonths*data.rate,
    data.commulativemonth=data.previousbillmonths+data.currentbillmonths,
    data.commulativeAmount=(data.previousbillmonths+data.currentbillmonths)*data.rate,
    data.remainingmonth=(data.constructionperiod+data.oandmperiod)-(data.previousbillmonths+data.currentbillmonths),
    data.remainingamount=((data.constructionperiod+data.oandmperiod)*data.rate)-((data.previousbillmonths+data.currentbillmonths)*data.rate)
  }
    updateRowData(newdata: any) {
      console.log(newdata);
      let data= newdata.value;
      let element:any = {};
      const prfSelected = newdata.professionalData.find((option:any) => option.id === data.professionalid);     
      
      if(prfSelected.name===StaffType.KEY_PROFESSIONAL){
        element = this.dataSource.data.find((x:any) => x.invoiceid == data.id);
      } 
      else if(prfSelected.name===StaffType.SUPPORT_STAFF){
        element = this.ssdataSource.data.find((x:any) => x.invoiceid == data.id);
      }
      else{  
        element = this.spsdataSource.data.find((x:any) => x.invoiceid == data.id); 
      }  
      if(element){
      element.currentbillmonths = data.currentbillmonths;
      this.bindBilling(element);
      }
      
      if(prfSelected.name===StaffType.KEY_PROFESSIONAL){
        this.dataSource._updateChangeSubscription();
      } 
      else if(prfSelected.name===StaffType.SUPPORT_STAFF){
        this.ssdataSource._updateChangeSubscription();
      }
      else{  
        this.spsdataSource._updateChangeSubscription();  
      }
    }
    addBulkRecord(data:any){
      if(data){
        data.value.forEach((element:any) => {
          this.addRowData(element, data.professionalData);
        });
      }
    }
    addRowData(data: any,prfsnalData:any) {      
      const prfSelected = prfsnalData.find((option:any) => option.id === data.professionalid);     
      const data1:any = {
        id: data.id,
        designation :data.designation,
        professionalid:data.professionalid,
        name :data.name,
        rate:data.rate,
        invoiceid:data.invoiceid,
        constructionperiod:data.constructionperiod,
        oandmperiod:data.oandmperiod,
        previousbillmonths:data.previousbillmonths,
        currentbillmonths:data.currentbillmonths
      }
      this.bindBilling(data1);
      if(prfSelected.name===StaffType.KEY_PROFESSIONAL){
        this.dataSource.data.unshift(data1);  
        this.dataSource._updateChangeSubscription();
      } 
      else if(prfSelected.name===StaffType.SUPPORT_STAFF){
        this.ssdataSource.data.unshift(data1);  
        this.ssdataSource._updateChangeSubscription();
      }
      else{
        this.spsdataSource.data.unshift(data1);  
        this.spsdataSource._updateChangeSubscription();  
      }
    }
    deleteRow(newdata: any) {
      let data= newdata.value;
      const prfSelected = newdata.professionalData.find((option:any) => option.id === data.professionalid);    
      if(prfSelected.name===StaffType.KEY_PROFESSIONAL){
        const index = this.dataSource.data.findIndex((x:any) => x.invoiceid == data.id);
        this.dataSource.data.splice(index, 1);
        this.dataSource._updateChangeSubscription();
      } 
      else if(prfSelected.name===StaffType.SUPPORT_STAFF){
        const index = this.ssdataSource.data.findIndex((x:any) => x.invoiceid == data.id);
        this.ssdataSource.data.splice(index, 1);
        this.ssdataSource._updateChangeSubscription();
      }
      else{
        const index = this.spsdataSource.data.findIndex((x:any) => x.invoiceid == data.id);
        this.spsdataSource.data.splice(index, 1);
        this.spsdataSource._updateChangeSubscription();
      } 
     
    }

    getTotalAmount(){
      this.amount ={
        kp:{
          total:this.kpsData.map(t => t.contractamount).reduce((acc, value) => acc + value, 0),
          previous:this.kpsData.map(t => t.previousbill).reduce((acc, value) => acc + value, 0),
          current:this.kpsData.map(t => t.currentbill).reduce((acc, value) => acc + value, 0),
          commulative:this.kpsData.map(t => t.commulativeAmount).reduce((acc, value) => acc + value, 0),
          remaining:this.kpsData.map(t => t.remainingamount).reduce((acc, value) => acc + value, 0)
        },
        sps:{
          total:this.spsData.map(t => t.contractamount).reduce((acc, value) => acc + value, 0),
          previous:this.spsData.map(t => t.previousbill).reduce((acc, value) => acc + value, 0),
          current:this.spsData.map(t => t.currentbill).reduce((acc, value) => acc + value, 0),
          commulative:this.spsData.map(t => t.commulativeAmount).reduce((acc, value) => acc + value, 0),
          remaining:this.spsData.map(t => t.remainingamount).reduce((acc, value) => acc + value, 0)
        },
        ss:{
          total:this.ssData.map(t => t.contractamount).reduce((acc, value) => acc + value, 0),
          previous:this.ssData.map(t => t.previousbill).reduce((acc, value) => acc + value, 0),
          current:this.ssData.map(t => t.currentbill).reduce((acc, value) => acc + value, 0),
          commulative:this.ssData.map(t => t.commulativeAmount).reduce((acc, value) => acc + value, 0),
          remaining:this.ssData.map(t => t.remainingamount).reduce((acc, value) => acc + value, 0)          
        }
      }
      this.onAmountChange.emit(this.amount);
      return this.amount;
    }
  }
  
  

