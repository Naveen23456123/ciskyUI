import { ChangeDetectorRef, Component,EventEmitter,Output,ViewChild,inject} from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { untilDestroyed } from '@app/core/until-destroyed';;
import { InvoiceService } from '@app/invoice-control/invoice.service';
import { StaffType } from '@app/shared/models/constant.config';
import { HelperService } from '@app/shared/services/helper.service';
import { NotifyBarService } from '@app/shared/services/notify-bar.service';
import { SessionService } from '@app/shared/services/session.service';
import { StateDataService } from '@app/shared/services/state-data.service';
import { finalize,forkJoin,take } from 'rxjs';

@Component({
  selector: 'app-boq-staff-list',
  standalone: false,
  templateUrl: './boq-staff-list.component.html',
  styleUrl: './boq-staff-list.component.scss'
})
export class BoqStaffListComponent {

  kpsData:any[]= [];
  spsData:any[]=[];
  ssData:any[]=[];
  totalData:any[]=[];
  @Output() onAmountChange: EventEmitter<any> = new EventEmitter();
  @Output() onkpAmountChange: EventEmitter<any> = new EventEmitter();
  @Output() onssAmountChange: EventEmitter<any> = new EventEmitter();
  @Output() onspsAmountChange: EventEmitter<any> = new EventEmitter();
  isLoading = true;
  kpsDataColumn: string[] = ['serial','position','name','constperiod','omperiod','manmonth','rate','amount','action' ];
  spsdataColumn: string[] = ['serial','position','name','constperiod','omperiod','manmonth','rate','amount','action' ];
  ssdataColumn: string[] = ['serial','position','name','constperiod','omperiod','manmonth','rate','amount','action' ];
  footerColumns: string[] = ['serial', 'amount','action'];

  dataSource!: MatTableDataSource<any[]>;
  spsdataSource!: MatTableDataSource<any[]>;
  ssdataSource!: MatTableDataSource<any[]>;

    readonly dialog = inject(MatDialog);
    
    private defaultdialogoptions:  MatDialogConfig = {
      minWidth: '900px', 
      disableClose: false,
      data: {},
    };
  
   constructor(private invoiceService:InvoiceService,private helperService:HelperService,
    private stateDataService :StateDataService, private notifyBarService :NotifyBarService,
    private sessionService:SessionService
    
   ){
    this.dataSource = new MatTableDataSource(this.kpsData);
    this.ssdataSource = new MatTableDataSource(this.ssData);
    this.spsdataSource = new MatTableDataSource(this.spsData);
   }
  
   ngOnInit()  {
    this.stateDataService.stateDataSubject.subscribe((data) => {   
      if (data.event == 'boqstaffedit'  && data.valid && data.value) {      
        this.updateRowData(data);
        this.notifyBarService.showsnackbar(data.msg);
        this.stateDataService.stateDataSubject.next({});
      } else if (data.event == 'boqstaffadd' && data.valid && data.value) {
        this.addRowData(data);
        this.notifyBarService.showsnackbar(data.msg);
        this.stateDataService.stateDataSubject.next({});
      } else if(data.event == 'boqstaffdelete' && data.valid && data.value){
        this.deleteRow(data);
        this.notifyBarService.showsnackbar(data.msg);
        this.stateDataService.stateDataSubject.next({});
      }
    });
    this.sessionService.projectEntitySubject$.pipe(take(1)).subscribe((projectEntity:any)=>{
      if(projectEntity && projectEntity.projectId){
        forkJoin({
          staffTypeAPI:this.invoiceService.getStaffTypesList({},''),
          boqstaffAPI:this.invoiceService.getBoqStaffListByProjectId({id: projectEntity.projectId}, '')
        }).pipe(take(1),untilDestroyed(this),finalize(()=>this.isLoading=false)).subscribe((response:any)=>{
          if(response.staffTypeAPI && response.staffTypeAPI.success){
              this.sessionService.setStaffType(response.staffTypeAPI.data);
            let kpItem=  response.staffTypeAPI.data.find((x:any)=>x.name==StaffType.KEY_PROFESSIONAL);       
            let ssItem=  response.staffTypeAPI.data.find((x:any)=>x.name==StaffType.SUPPORT_STAFF);        
            let spsItem=  response.staffTypeAPI.data.find((x:any)=>x.name==StaffType.SUB_PROFESSIONAL);        
            if(response.staffTypeAPI && response.boqstaffAPI.success){
              this.totalData = response.boqstaffAPI.data;         
              if(this.totalData && this.totalData.length>0){
                this.kpsData=this.totalData.filter((x:any)=>x.professionalid==kpItem.id) ?? [];
                this.dataSource = new MatTableDataSource(this.kpsData);   
    
                this.ssData =this.totalData.filter((x:any)=>x.professionalid==ssItem.id) ?? [];  
                this.ssdataSource = new MatTableDataSource(this.ssData);
    
                this.spsData =this.totalData.filter((x:any)=>x.professionalid==spsItem.id) ?? [];
                this.spsdataSource = new MatTableDataSource(this.spsData);
               
              }          
            }
            this.getssTotalAmount();
            this.getspsTotalAmount();
            this.getkpTotalAmount();
          }      
        }); 
      }
    })
   
  } 

  ngOnDestroy(){}

    updateRowData(newdata: any) {
      let data= newdata.value;
      let element:any = {};
      const prfSelected = newdata.professionalData.find((option:any) => option.id === data.professionalid);     
      
      if(prfSelected.name===StaffType.KEY_PROFESSIONAL){
        element = this.dataSource.data.find((x:any) => x.id == data.id);
      } 
      else if(prfSelected.name===StaffType.SUPPORT_STAFF){
        element = this.ssdataSource.data.find((x:any) => x.id == data.id);
      }
      else{  
        element = this.spsdataSource.data.find((x:any) => x.id == data.id); 
      }
      if(element){
      element.id = data.id;
      element.designationid =data.designationid,
      element.professionalid=data.professionalid,
      element.employeeid=data.employeeid,
      element.rate=data.rate,
      element.designation=data.designation,
      element.employeename= data.employeename,
      element.totalamount= data.totalamount,
      element.constructionperiod=data.constructionperiod,
      element.oandmperiod=data.oandmperiod
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
    addRowData(newdata: any) {
      let data= newdata.value;  
      const prfSelected = newdata.professionalData.find((option:any) => option.id === data.professionalid);     
      const data1:any = {
        id: data.id,
        designationid :data.designationid,
        professionalid:data.professionalid,
        designation:data.designation,
        employeename: data.employeename,
        employeeid:data.employeeid,
        rate:data.rate,
        totalamount: data.totalamount,
        constructionperiod:data.constructionperiod,
        oandmperiod:data.oandmperiod,
      }
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
        const index = this.dataSource.data.findIndex((x:any) => x.id == data.id);
        this.dataSource.data.splice(index, 1);
        this.dataSource._updateChangeSubscription();
      } 
      else if(prfSelected.name===StaffType.SUPPORT_STAFF){
        const index = this.ssdataSource.data.findIndex((x:any) => x.id == data.id);
        this.ssdataSource.data.splice(index, 1);
        this.ssdataSource._updateChangeSubscription();
      }
      else{
        const index = this.spsdataSource.data.findIndex((x:any) => x.id == data.id);
        this.spsdataSource.data.splice(index, 1);
        this.spsdataSource._updateChangeSubscription();
      } 
     
    }
    getkpTotalAmount(){
      let spstotal= this.spsData.map(t => t.totalamount).reduce((acc, value) => acc + value, 0);
      let kpstotal= this.kpsData.map(t => t.totalamount).reduce((acc, value) => acc + value, 0);
      this.onAmountChange.emit({key :'total' , totalAmount:(spstotal+kpstotal)});
      return kpstotal;
    }
    getssTotalAmount(){
      let total= this.ssData.map(t => t.totalamount).reduce((acc, value) => acc + value, 0);
      this.onAmountChange.emit({key :StaffType.SUPPORT_STAFF , totalAmount:total});
      return total;
    }
    getspsTotalAmount(){
      let spstotal= this.spsData.map(t => t.totalamount).reduce((acc, value) => acc + value, 0);
      let kpstotal= this.kpsData.map(t => t.totalamount).reduce((acc, value) => acc + value, 0);
      this.onAmountChange.emit({key :'total' , totalAmount:(spstotal+kpstotal)});
      return spstotal;
    }
  }
  
  
