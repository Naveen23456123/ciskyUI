import { group } from '@angular/animations';
import { Component } from '@angular/core';
import { DialogOperation } from '@app/shared/models/constant.config';
import { CommonService } from '@app/shared/services/common.service';
import { ProfitLossInterfaceService } from '@app/shared/services/external/profit-loss-interface.service';
import { SessionService } from '@app/shared/services/session.service';
import { finalize, take } from 'rxjs';
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
  selector: 'app-profit-loss-details',
  standalone: false,
  templateUrl: './profit-loss-details.component.html',
  styleUrl: './profit-loss-details.component.scss'
})
export class ProfitLossDetailsComponent {
  displayedColumns: string[] = ['name','noteno', 'currentexpenditure', 'previousexpenditure'];
  isLoading=false;
  scopes:any[]=[];
  dataRecords:any[]=[];
  scopeLoaded=false;
  currentTotalIncome=0;
  currentTotalExpense=0;
  previousTotalIncome=0;
  previousTotalExpense=0; 
  dataSource: Row[] = [];
  footerRow:string='totalfooter';
  constructor(private profitLossService:ProfitLossInterfaceService,private sessionService:SessionService,
    private commonService:CommonService
  ) {    
  }
ngOnInit(){
  this.profitLossService.getProfitLossScopes({},'').pipe(finalize(()=> this.isLoading=false))
  .subscribe((response:any)=>{
    if(response && response.success){
      this.scopes = response.data;
      this.sessionService.setProfileLossScope(response.data);
      this.scopeLoaded=true;
    }
  })
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
        this.dataSource = this.buildGroupedRows(this.dataRecords);
      }
      else if(data.type== DialogOperation.EDIT){
        const element:any = this.dataRecords.find((x:any) => x.id == data.value.id);
        if(element){
        element.id = data.value.id;     
        element.name=data.value.name,
        element.currentexpenditure = +data.value.amount,
        element.noteno='';
        }
        this.dataSource = this.buildGroupedRows(this.dataRecords);
      }
      else if(data.type== DialogOperation.DELETE){        
        const index = this.dataRecords.findIndex((x:any) => x.id == data.value);
        this.dataRecords.splice(index, 1);
        this.dataSource = this.buildGroupedRows(this.dataRecords);
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
      this.dataSource = this.buildGroupedRows(this.dataRecords);
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
  ngAfterViewInit(): void {
    console.log('view finished');
  }
}
