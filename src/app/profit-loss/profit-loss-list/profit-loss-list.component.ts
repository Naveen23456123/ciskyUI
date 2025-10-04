import { Component,ViewChild,inject} from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { untilDestroyed } from '@app/core/until-destroyed';
import { PaymentService } from '@app/payments/payment.service';
import { ProfitLossCommulativeComponent } from '@app/shared/components/profit-and-loss/profit-loss-commulative/profit-loss-commulative.component';
import { ProfitLossInvListComponent } from '@app/shared/components/profit-and-loss/profit-loss-inv-list/profit-loss-inv-list.component';
import { DialogOperation, TOTAL_PROFIT_LOSS_HEADING } from '@app/shared/models/constant.config';
import { CommonService } from '@app/shared/services/common.service';
import { ProfitLossInterfaceService } from '@app/shared/services/external/profit-loss-interface.service';
import { HelperService } from '@app/shared/services/helper.service';
import { StateDataService } from '@app/shared/services/state-data.service';
import { SessionService } from '@app/shared/services/session.service';
import { delay, finalize, Subscription, take } from 'rxjs';
import { NotifyBarService } from '@app/shared/services/notify-bar.service';

export type Row = { type: 'group'; label: string } | {
  id?:string;
  type?: 'data'|'totalinfo'|'totalfooter';
  name?: string;
  currentexpenditure?: number;
  previousexpenditure?: number;
  group?: string;
  isincome?:boolean;
  noteno?:string;
  order?:number;
};

@Component({
  selector: 'app-profit-loss-list',
  standalone: false,
  templateUrl: './profit-loss-list.component.html',
  styleUrl: './profit-loss-list.component.scss'
})
export class ProfitLossListComponent {
  itemsList:any[]= [];
    isLoading = true;
    pwdisplayedColumns: string[] = ['serial','projectid','name', 'monthly','commulative'];
    dataSource!: MatTableDataSource<any[]>;
    activeOrgId='123';
 @ViewChild(MatPaginator) set matPaginator(paginator: MatPaginator) {
    this.dataSource.paginator = paginator;
  }
  @ViewChild(MatSort) sort!: MatSort;
  pagination: any;
  pageSize!: number;
  resultsLength!:number;
    detailsObj:any={today : new Date()};
    scopes:any[]=[];
    dataRecords:any[]=[];
    scopeLoaded=false;
    currentTotalIncome=0;
    currentTotalExpense=0;
    previousTotalIncome=0;
    previousTotalExpense=0; 
    totaldataSource: Row[] = [];
    footerRow:string='totalfooter';
    constructor(private profitLossService:ProfitLossInterfaceService,private sessionService:SessionService,
      private commonService:CommonService,private paymentService:PaymentService,private helperService:HelperService,
    private stateDataService:StateDataService,private notifyBarService:NotifyBarService){
    this.dataSource = new MatTableDataSource(this.itemsList);
   }
  ngOnInit(){
    this.subscription= this.stateDataService.stateDataSubject.subscribe((data:any) => {   
     if (data.event == 'pfladd' && data.valid && data.value) {        
        this.notifyBarService.showsnackbar(data.msg);
        this.stateDataService.stateDataSubject.next({});
      }
    });
    this.profitLossService.getProfitLossScopes({},'').pipe(finalize(()=> this.isLoading=false))
    .subscribe((response:any)=>{
      if(response && response.success){
        this.scopes = response.data;
        this.sessionService.setProfileLossScope(response.data);
        this.scopeLoaded=true;
      }
    })    
    //this.isLoading=true;
    this.subscription=  this.paymentService.getAllProjectPartialDetailsByOrdIg({ organizationId: this.activeOrgId }, '')
      .pipe(untilDestroyed(this), finalize(() => this.isLoading = false))
      .subscribe((response: any) => {
      if (response && response.success) {
        this.itemsList = response.data;
        this.updateTable(this.itemsList);
      }
    });
  
  }
  viewClick(data:any){
    const config = this.defaultdialogoptions;
    config.minWidth='60vw';
    config.minHeight="10vh";
    config.data = {
      element:data
    };
    this.dialog.open(ProfitLossInvListComponent,config);
  }
  viewCommulative(data:any){
    const config = this.defaultdialogoptions;
    config.minWidth='80vw';
    config.minHeight="90vh";
    config.data = {
      element:data
    };
    this.dialog.open(ProfitLossCommulativeComponent,config);
  }


  buildGroupedRows(data: any[]): Row[] {
    let result: Row[] = [];
    const groups = Array.from(new Set(data.map(d => ({group:d.group,order:d.order}))));
    let sortedGroups= groups.sort((a, b) => a.order - b.order).map(item=>item.group);
    //const groups = Array.from(new Set(data.map(d => d.group)));
    let sortedScopes= this.scopes.sort((a, b) => a.order - b.order).map(item=>item.value);
    [...new Set(sortedScopes)].forEach((groupName, index) => {
      const sectionNumber = `${this.commonService.toRoman(index + 1)} - `;
      
      result.push({ 
        type: 'group', 
        label: `${sectionNumber} ${groupName}`
      });
  
      // Add data rows for this group
      data.filter(d => d.group === groupName).forEach((d,index) => {
        result.push({ ...d,srno:index+1, type: 'data' });
      });   
      result.push({
        type: 'totalinfo',
        name:'Total',
        currentexpenditure:this.getCurrentAmount(data.filter(d => d.group === groupName)),
        previousexpenditure:this.getPreviousAmount(data.filter(d => d.group === groupName)),
        isincome:this.scopes.find(x=>x.value== groupName)?.accounttype.toLowerCase() =='income'
      });         
    });  
    //result.filter(x=>x.type==this.footerRow)
    result = result.filter((record:any) => !this.footerRow.includes(record.type));
    let totalIncome:Row = {
      type: 'totalfooter',
      name:'Total Income',
      currentexpenditure:this.getTotalCurrentIncome(),
      previousexpenditure:this.getTotalPreviousIncome(),
      isincome:true
    }
    let totalExpense:Row = {
      type: 'totalfooter',
      name:'Total Expense',
      currentexpenditure:this.getTotalCurrentExpense(),
      previousexpenditure:this.getTotalPreviousExpense(),
      isincome:false
    }         
    result.push(totalIncome);
    result.push(totalExpense);
    return result;
  }
  isGroup = (_: number, row: Row) => row.type === 'group';
  isData = (_: number, row: Row) => row.type === 'data';
  isTotalInfo = (_: number, row: Row) => row.type === 'totalinfo';
  isFooterInfo = (_: number, row: Row) => row.type === 'totalfooter';

  revenueDataLoad(data:any){
    if(data)
      this.addDatatoSheet(data);
  }
    
  addDatatoSheet(data:any){
    this.sessionService.profileLossScopeSubject$.pipe(take(1)).subscribe((response:any)=>{
    if(response.length>0){     
      if(data.type== DialogOperation.ADD){
        let records = data.value.map((item:any)=>({
          id:item.id,
          type:'data',
          name:item.name,
          currentexpenditure:+item.amount,
          noteno:'',
          order:this.scopes.find(x=>x.id== item.scopeid)?.order,
          group: this.scopes.find(x=>x.id== item.scopeid)?.value,
          acctype:this.scopes.find(x=>x.id== item.scopeid)?.accounttype,   
          isincome:this.scopes.find(x=>x.id== item.scopeid)?.accounttype.toLowerCase() =='income'       
      }));
        this.dataRecords.splice(0, 0, ...records);
        this.totaldataSource = this.buildGroupedRows(this.dataRecords);
      }
      else if(data.type== DialogOperation.EDIT){
        const element:any = this.dataRecords.find((x:any) => x.id == data.value.id);
        if(element){
        element.id = data.value.id;     
        element.name=data.value.name,
        element.currentexpenditure = +data.value.amount,
        element.noteno='';
        }
        this.totaldataSource = this.buildGroupedRows(this.dataRecords);
      }
      else if(data.type== DialogOperation.DELETE){        
        const index = this.dataRecords.findIndex((x:any) => x.id == data.value);
        this.dataRecords.splice(index, 1);
        this.totaldataSource = this.buildGroupedRows(this.dataRecords);
      }
      this.getTotalCurrentIncome();
      let totalIncome = {
        type: 'totalfooter',
        name:'Total Income',
        currentexpenditure:this.getTotalCurrentIncome(),
        previousexpenditure:this.getTotalPreviousIncome(),
        isincome:true
      }
      let totalExpense = {
        type: 'totalfooter',
        name:'Total Expense',
        currentexpenditure:this.getTotalCurrentExpense(),
        previousexpenditure:this.getTotalPreviousExpense(),
        isincome:false
      }         
      this.dataRecords.push(totalIncome);
      this.dataRecords.push(totalExpense);
      this.totaldataSource = this.buildGroupedRows(this.dataRecords);
    }
    })
  }
  getCurrentAmount(data:Row[]) {
    let total= data.map((t:any) => t.currentexpenditure).reduce((acc, value) => acc + value, 0);    
    return !isNaN(total) ? total :0;
  }
  getPreviousAmount(data:Row[]) {
    let total= data.map((t:any) => t.previousexpenditure).reduce((acc, value) => acc + value, 0);    
    return !isNaN(total) ? total :0;
  }
  getTotalCurrentIncome(){
    let total= this.dataRecords.filter(x=>x.isincome && x.type!=this.footerRow).map((t:any) => t.currentexpenditure).reduce((acc:number, value:number) => acc + value, 0);    
    return !isNaN(total) ? total :0;
  }
  getTotalCurrentExpense(){
    let total= this.dataRecords.filter(x=>x.isincome==false&& x.type!=this.footerRow).map((t:any) => t.currentexpenditure).reduce((acc:number, value:number) => acc + value, 0);    
    return !isNaN(total) ? total :0;
  }

  getTotalPreviousIncome(){
    let total= this.dataRecords.filter(x=>x.isincome&& x.type!=this.footerRow).map((t:any) => t.previousexpenditure).reduce((acc:number, value:number) => acc + value, 0);    
    return !isNaN(total) ? total :0;
  }
  getTotalPreviousExpense(){
    let total= this.dataRecords.filter(x=>x.isincome==false&& x.type!=this.footerRow).map((t:any) => t.previousexpenditure).reduce((acc:number, value:number) => acc + value, 0);    
    return !isNaN(total) ? total :0;
  }

    private subscription:Subscription = new Subscription();
  
    readonly dialog = inject(MatDialog);
    
    private defaultdialogoptions:  MatDialogConfig = {      
      disableClose: false,
      data: {},
    };

  


ngOnDestroy(){
   this.subscription.unsubscribe();
} 
    ngAfterViewInit() {
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
    this.itemsList = info;
    this.dataSource = new MatTableDataSource<any>(info);
    this.pagination = this.helperService.paginationOptionGeneration(info, info.length); 
    this.pageSize= this.helperService.getPageSize();  
    this.resultsLength= this.itemsList.length;   
  }
    // Dynamically 
    displayedColumns: string[] = ['name', 'actions'];
    ddataSource = new MatTableDataSource<any>([
      { name: 'Alice', isEditing: false },
      { name: 'Bob', isEditing: false },
    ]);
  
    // Insert an editable row after current index
    addRowAfter(index: number): void {
      const data = this.ddataSource.data;
      // Avoid multiple editable rows
     // if (data.some(d => d.isNew)) return;
  
      const newRow = { name: '', isNew: true };
      data.splice(index + 1, 0, newRow);
      this.ddataSource.data = [...data];
    }
  
    // Save the new row
    saveRow(index: number): void {
      const data = this.ddataSource.data;
      const row = data[index];

      if (row.name && row.name.trim() !== '') {
        row.isNew = false;
        row.isEditing = false;
        this.ddataSource.data = [...data];
      } else {
        alert('Name is required.');
      }
    }
  
    // Remove any row
    removeRow(index: number): void {
      const data = this.ddataSource.data;
      data.splice(index, 1);
      this.ddataSource.data = [...data];
    }
    editRow(index: number): void {
      this.ddataSource.data[index].isEditing = true;
      this.ddataSource.data = [...this.ddataSource.data];
    }
    cancelEdit(index: number): void {
      const data = this.ddataSource.data;
      const row = data[index];
  
      if (!row.name) {
        // Assume blank = new = remove on cancel
        this.removeRow(index);
      } else {
        row.isEditing = false;
        this.dataSource.data = [...data];
      }
    }

    // financial year
    monthlyData:any[] = [];
    scopeRows: any[] = [];
    isfinancialLoading=true;
    isNoRecordForFY=false;
    getReport:any={
      projectid:'',
      year:'',
    }
   months = ['Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec','Jan','Feb','Mar'];
  
    // Rows with key name and per-month values
   rows = [
    {
      key: 'Amount',
      values: ['', '', '', '', '', '', '', '', '', '', '', ''] // one value per month
    },
    {
      key: 'Remarks',
      values: ['', '', '', '', '', '', '', '', '', '', '', '']
    }
  ]; 
  totaldisplayedColumns: string[] =  ['srno', 'name', ...this.months,'total'];

  yearChange(data:any){
    if(data)
      this.getReport.year= +data.value;
    this.getReports();
    this.detailsObj.financialyear=(+data.value)+ "-"+(+data.value+1);
  }
  projectChange(data:any=null){   
    
    if(data && data.value){
      this.getReport.projectid=data.value.id;
      this.detailsObj.projectname=data.value.projectshortname;
    }
    else
      this.getReport.projectid='';
    this.getReports();
    
  }
  monthDataRecords:any[]=[];
  getReports(){
    // if(this.getReport.projectid==''){
    //   this.isfinancialLoading=false;
    //   return;
    // }
      
    this.isfinancialLoading=true;
    this.profitLossService.getProfitLossFinancial(this.getReport,'').pipe(finalize(()=> this.isfinancialLoading=false))
    .subscribe((response:any)=>{
      if(response && response.success){
        this.scopes = response.data;      
        this.scopeLoaded=true;  
        this.isNoRecordForFY = this.scopes.every(month => month.scopes.length === 0);  
       this.monthDataRecords=[];
        for (let entry of this.scopes) {   
          if(entry.scopes.length>0){               
          this.monthDataRecords.push(entry.scopes.map((item: any) => ({             
              type: 'data',
              name: item.name,
              actualamount: this.commonService.roundValue(+item.total),              
              isadmin: item.isadmin,
              ispersonal: item.ispersonal,
              group: item.isincome ? 'Income' : 'Expense',
              isincome: item.isincome,
              month: entry.month  // assuming month is 1-12
            })));
          }
        }
        this.scopeRows = this.buildGroupedRowsByMonth(this.monthDataRecords);
         this.detailsObj.percentage = this.commonService.netPercentage(
          this.detailsObj.totalincome,
          this.detailsObj.totalexpense,
          this.detailsObj.totalincome-this.detailsObj.totalexpense);
      }
    })
  }
  rowTotal = 0;

  keyToGroup= TOTAL_PROFIT_LOSS_HEADING;
  buildGroupedRowsByMonth(data: any[]): Row[] {
    let result: Row[] = [];
    const months = ['Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec','Jan','Feb','Mar','total'];
  
    this.keyToGroup.forEach((groupName, index) => {
      const sectionNumber = `${this.commonService.toRoman(index + 1)} - `;
      result.push({
        type: 'group',
        label: `${sectionNumber} ${groupName.Name}`        
      });
      // Get all unique item names in group
      const groupItems = data.flat().filter(d =>
        d.isadmin === groupName.isadmin && d.ispersonal === groupName.ispersonal
      );
      const nameSet = [...new Set(groupItems.map(x => x.name))];
  
      // Build rows per name across months
      nameSet.forEach((itemName, i) => {
        const row: any = {
          type: 'data',
          srno: i + 1,
          name: itemName
        };
        this.rowTotal=0;
        // Fill month columns
        months.forEach((m, mi) => {
          const matching = groupItems.find(x => x.name === itemName && x.month === (mi < 9 ? mi + 4 : mi - 8)); // Apr=4 ... Mar=3
          row[m] = matching ? matching.actualamount : '-';
        });
        // Fill month columns and calculate row total
        months.forEach((m, mi) => {
          if(m!='total'){
          const matching = groupItems.find(x => x.name === itemName && x.month === (mi < 9 ? mi + 4 : mi - 8));
        
          const value = matching ? +matching.actualamount : 0;
          row[m] = matching ? matching.actualamount : '-';
          this.rowTotal += value;
          }
        });
        // Add horizontal total
        row['total'] = this.commonService.roundValue(this.rowTotal);
        result.push(row);
        
      });
      this.rowTotal=0;
      console.log(this.rowTotal);
      // Add total row
      const totalRow: any = {
        type: 'totalinfo',
        name: 'Total'
      };
  
      months.forEach((m, mi) => {       
        const monthlySum = groupItems
          .filter(x => x.month === (mi < 9 ? mi + 4 : mi - 8))
          .reduce((sum, x) => sum + (+x.actualamount || 0), 0);
  
        totalRow[m] = this.commonService.roundValue(monthlySum);
        if(m!='total'){
        this.rowTotal += this.commonService.roundValue(monthlySum);
        }
      });  
      if(this.rowTotal!=0)
      totalRow['total'] = (groupName.isincome? '(+)':'(-)') + this.commonService.roundValue(this.rowTotal);
      result.push(totalRow);     
    });

    const incomeTotalRow: any = {
      type: 'summary',
      name: 'Total Income'
    };
    
    const expenseTotalRow: any = {
      type: 'summary',
      name: 'Total Expense'
    };
    console.log(data.flat());
    // Step 3: Month-wise totals
    let incomeRowTotal = 0;
    let expenseRowTotal = 0;

    months.forEach((m, mi) => {
      console.log(m,mi);
          
      //const monthNum = (mi < 9 ? mi + 4 : mi - 8); // Apr = 4 ... Mar = 3
      const monthNum = (m === 'total') ? null : (mi < 9 ? mi + 4 : mi - 8); // Apr = 4 ... Mar = 3
      if (monthNum !== null) {
        const incomeSum = data.flat()
        .filter(x => x.month === monthNum && x.isincome === true)
        .reduce((sum, x) => sum + (+x.actualamount || 0), 0);
  
      const expenseSum = data.flat()
        .filter(x => x.month === monthNum && x.isincome === false)
        .reduce((sum, x) => sum + (+x.actualamount || 0), 0);
  
      const roundedIncome = this.commonService.roundValue(incomeSum);
      const roundedExpense = this.commonService.roundValue(expenseSum);
  
      incomeTotalRow[m] = roundedIncome;
      expenseTotalRow[m] = roundedExpense;
  
      incomeRowTotal += roundedIncome;
      expenseRowTotal += roundedExpense;
    }
    });
    incomeTotalRow['total'] = this.commonService.roundValue(incomeRowTotal);
    expenseTotalRow['total'] = this.commonService.roundValue(expenseRowTotal);
   
    // Step 4: Push summary rows
    result.push(expenseTotalRow);
    result.push(incomeTotalRow);
    this.detailsObj.totalincome=this.commonService.roundValue(incomeRowTotal);
    this.detailsObj.totalexpense=this.commonService.roundValue(expenseRowTotal);
    return result;
  }

}
