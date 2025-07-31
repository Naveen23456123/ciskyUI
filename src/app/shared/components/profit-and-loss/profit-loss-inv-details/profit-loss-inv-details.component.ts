import { group } from '@angular/animations';
import { Component, ElementRef, Inject, Optional, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { DialogOperation } from '@app/shared/models/constant.config';
import { CommonService } from '@app/shared/services/common.service';
import { ProfitLossInterfaceService } from '@app/shared/services/external/profit-loss-interface.service';
import { GeneratePdfService } from '@app/shared/services/generate-pdf.service';
import { SessionService } from '@app/shared/services/session.service';
import { finalize, forkJoin, take } from 'rxjs';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export type Row = { type: 'group'; label: string,id:string, key:string } | {
  id?:string;
  type?: 'data'|'totalinfo'|'totalfooter'|'totalSeparate';
  name?: string;
  isEditing?:boolean,
  isEdited?:false,
  actualamount?: number;
  previousexpenditure?: number;
  group?: string;
  isincome?:boolean;
  noteno?:string;
  order?:number;
};
@Component({
  selector: 'app-profit-loss-inv-details',
  standalone: false,
  templateUrl: './profit-loss-inv-details.component.html',
  styleUrl: './profit-loss-inv-details.component.scss'
})
export class ProfitLossInvDetailsComponent {
  public data:any;
  displayedColumns: string[] = ['name', 'actualamount','action'];
  isLoading=true;
  scopes:any[]=[];
  deleteProfitLoss=false;
  dataRecords:any[]=[];
  scopeLoaded=false;
  currentTotalIncome=0;
  currentTotalExpense=0;
  previousTotalIncome=0;
  previousTotalExpense=0; 
  dataSource: Row[] = [];
  profitLossData:any;
  footerRow:string='totalfooter';
  isClicked=false;
  dataObj:any={};
  today: Date = new Date();
   @ViewChild('pdfContent', { static: false }) pdfContent!: ElementRef;

  keyToGroup:any[]=['KEY_PROFESSIONAL','VEHILCE_LEASING','REVENUE','EXTERNAL_COMPANY','OFFICE_RENT','IMPREST','INSURANCES'];
  constructor(@Inject(MAT_DIALOG_DATA) data: any,
      @Optional() private dialogRef: MatDialogRef<ProfitLossInvDetailsComponent>,private profitLossService:ProfitLossInterfaceService,private sessionService:SessionService,
    private commonService:CommonService, private pdfService:GeneratePdfService
  ) {    
    this.data = data || {};
  }
  ngOnInit(){
     this.deleteProfitLoss = this.data.type==DialogOperation.DELETE;
    if(this.data.element){
      this.dataObj.project= this.data.element.project;
      this.dataObj.generatedate= this.data.element.createdate;
      let apiCalls:any={}
      forkJoin({
        scopeAPI:this.profitLossService.getProfitLossScopes({}, ''),
        byId:this.profitLossService.getProfitLossListById({id:this.data.element.id}, ''),
      }).pipe(finalize(() => this.isLoading = false))
      .subscribe({next : (response: any) => {
        if (response.scopeAPI && response.scopeAPI.success) {
          this.scopes = response.scopeAPI.data;
          this.sessionService.setProfileLossScope(response.scopeAPI.data);
          this.scopeLoaded=true;  
          if (response.byId && response.byId.success) {      
            this.profitLossData = response.byId.data;          
            this.addDatatoSheet({type:DialogOperation.ADD,value:this.profitLossData.scopes});
            this.dataObj.percentage = this.commonService.netPercentage(
            this.dataObj.totalincome,
            this.dataObj.totalexpense,
            this.dataObj.totalincome-this.dataObj.totalexpense);
          }     
        }     
      }});
    } 
  }
  download(){
      this.pdfService.generatePDF(this.pdfContent, 'form-data.pdf');
  }
  delete(){
    this.profitLossService.deleteProfitLoss({id:this.data.element.id},'').subscribe((response:any)=>{
      if(response && response.success){
          this.dialogRef.close({ value: this.data.element.id, valid: true });
      }
    })
  }
  buildGroupedRows(data: any[]): Row[] {
    
    let result: Row[] = [];
    const groups = Array.from(new Set(data.map(d => ({group:d.group,order:d.order}))));
    let sortedGroups= groups.sort((a, b) => a.order - b.order).map(item=>item.group);
    //const groups = Array.from(new Set(data.map(d => d.group)));
    const filteredScopesToGrouped = this.scopes.filter(item => this.keyToGroup.includes(item.key));
    let rowIndex=-1;
    let sortedScopes= filteredScopesToGrouped.sort((a, b) => a.order - b.order).map(item=>item.value);
    filteredScopesToGrouped.forEach((groupName, index) => {
      const sectionNumber = `${this.commonService.toRoman(index + 1)} - `;
      
      result.push({ 
        type: 'group', 
        label: `${sectionNumber} ${groupName.value}`,
        id:groupName.id,
        key:groupName.key
      });  
      data.filter(d => d.group === groupName.key).forEach((d,index) => {     
          d.items.forEach((c:any,cindex:any) => {
            if(!c.isdeleted && d.type!=='totalfooter'){           
            result.push({ ...c,actualamount: this.commonService.roundValue(+c.actualamount),srno:cindex+1,
               type: 'data',isNew:c.isNew??false,isEditing:c.isEditing??false,
               realamount: this.commonService.roundValue(+c.actualamount)});
            }
          });
        
      });
     
      result.push({
        type: 'totalinfo',
        name:'Total',
        id:groupName.id,
        actualamount: this.commonService.roundValue(this.getCurrentAmount(data.filter(d => d.group === groupName.key))),
        previousexpenditure:this.getPreviousAmount(data.filter(d => d.group === groupName.key)),
        isincome:this.scopes.find(x=>x.key== groupName.key)?.accounttype.toLowerCase() =='income'
      });         
    }); 
    
    data.filter(item => !this.keyToGroup.includes(item.group)).forEach((d,index) => {
      rowIndex = rowIndex+1;
      if(!d.isdeleted && d.type!=='totalfooter'){ 
      result.push({ ...d,srno:index+1, type: 'data',isNew:d.isNew??false,isEditing:d.isEditing??false,
        realamount:  this.commonService.roundValue(+d.actualamount)
       });
      }
    }); 
   
    result = result.filter((record:any) => !this.footerRow.includes(record.type));
    this.setFooter(result);
    return result;
  }
  isGroup = (_: number, row: Row) => row.type === 'group';
  isData = (_: number, row: Row) => row.type === 'data';
  isTotalSeparate = (_: number, row: Row) => row.type === 'totalSeparate';
  isTotalInfo = (_: number, row: Row) => row.type === 'totalinfo';
  isFooterInfo = (_: number, row: Row) => row.type === 'totalfooter';

  addControls(item:any,index:number){
  let records = {
    id:item.id,
    type:'data',
    name:item.name,
    actualamount: this.commonService.roundValue(+item.total),
    noteno:'',
    order:this.scopes.find(x=>x.id== item.id)?.order,
    group: this.scopes.find(x=>x.id== item.id)?.key,
    acctype:this.scopes.find(x=>x.id== item.id)?.accounttype,   
    isincome:this.scopes.find(x=>x.id== item.id)?.accounttype.toLowerCase() =='income',  
    items:[{
      isNew:true,
      isEditing:false,
      actualamount:0,
      id: '',
      name:"",
      otheramount:0,
      total:0
    }]     
  };
  if(this.keyToGroup.includes(item.key)){
   let id= this.dataRecords.find(x=>x.group== item.key).id;
   console.log(id);
    this.dataRecords.find(x=>x.id==id).items;
    var newObj={
      sid:item.id,
      pid:id,
      isNew:true,
      isEditing:false,
      isdeleted:false,
      actualamount:0,
      index:this.getHighestIndex(this.dataRecords)+1,
      id: '',
      name:"",
      otheramount:0,
      total:0
    };
    this.dataRecords.find(x=>x.id==id).items.push(newObj);    
    this.dataSource = this.buildGroupedRows(this.dataRecords);
  }
  else{
    
  }
  
  }
  // Remove any row
  removeRow(row:any,index: number): void {  
    this.findByIndex(this.dataRecords,row.index).isdeleted=true; 
    this.setTotalForIndividual(row.pid); 
    this.dataSource = this.buildGroupedRows(this.dataRecords);
  }
  editRow(row:any,index: number): void {
   
    this.findByIndex(this.dataRecords,row.index).isEdited=true;
    console.log(this.findByIndex(this.dataRecords,row.index));
    this.findByIndex(this.dataRecords,row.index).isEditing=true;   
    this.dataSource = this.buildGroupedRows(this.dataRecords);
  }
  cancelEdit(item:any,index: number): void {
    this.findByIndex(this.dataRecords,item.index).isEdited=false;
    this.findByIndex(this.dataRecords,item.index).isEditing=false; 
    this.findByIndex(this.dataRecords,item.index).actualamount=this.findByIndex(this.dataRecords,item.index).realamount;
    this.setTotalForIndividual(item.pid);
    this.dataSource = this.buildGroupedRows(this.dataRecords);

  }
  setFooter(records:Row[]){
    let totalIncome:Row = {
      type: 'totalfooter',
      name:'Total Income',
      actualamount: this.commonService.roundValue(this.getTotalCurrentIncome()),
      previousexpenditure:this.getTotalPreviousIncome(),
      isincome:true
    }
    let totalExpense:Row = {
      type: 'totalfooter',
      name:'Total Expense',
      actualamount: this.commonService.roundValue(this.getTotalCurrentExpense()),
      previousexpenditure:this.getTotalPreviousExpense(),
      isincome:false
    }    
    records.push(totalIncome);
    records.push(totalExpense);    
    this.dataObj.totalincome= this.commonService.roundValue(this.getTotalCurrentIncome());
    this.dataObj.totalexpense= this.commonService.roundValue(this.getTotalCurrentExpense());

  }
  saveRow(row:any,index: number): void {
    this.findByIndex(this.dataRecords,row.index).isEditing=false;
    this.findByIndex(this.dataRecords,row.index).isEdited=true; 
    this.findByIndex(this.dataRecords,row.index).realamount=this.findByIndex(this.dataRecords,row.index).actualamount;
    this.dataSource = this.buildGroupedRows(this.dataRecords);
  
  }
  onRowAmountChange(item: any,index:number, value: string) { 
    
    this.findByIndex(this.dataRecords,item.index).actualamount= (+value);
    //if(this.findByIndex(this.dataRecords,item.index).items?.length>0)
    this.setTotalForIndividual(item.pid);    
    let rowitem:any = this.dataSource.find(x=>x.id==item.sid && x.type=='totalinfo');
   
    if(rowitem)
    rowitem.actualamount= this.findById(this.dataRecords,item.pid).actualamount;    

    this.dataSource =[...this.dataSource];
    this.setTotalExpense();
    this.setTotalIncome();
  } 
  onRowNameChange(item: any,index:number, value: string) {
    this.findByIndex(this.dataRecords,item.index).name=value;   
  } 
  setTotalIncome(){
    let incomes:any= this.dataRecords.filter((x:any)=>x.isincome && x.type!='totalfooter');   
    let incomeFooter:any = this.dataSource.find((x:any)=>x.isincome && x.type=='totalfooter');   
    incomeFooter.actualamount= incomes.map((t:any) => t.actualamount).reduce((acc:number, value:number) => acc + value, 0);
    this.dataSource =[...this.dataSource];
  }
  setTotalExpense(){
   let expenses:any= this.dataRecords.filter((x:any)=>!x.isincome && x.type!='totalfooter');  
   let expFooter:any = this.dataSource.find((x:any)=>!x.isincome && x.type=='totalfooter'); 
   expFooter.actualamount= expenses.map((t:any) => t.actualamount).reduce((acc:number, value:number) => acc + value, 0);
   this.dataSource =[...this.dataSource];
  }
  findByIndex(records: any[], targetIndex: number): any | undefined {
    for (const record of records) {
      // Check top-level record
      if (record.index === targetIndex) return record;
  
      // Check nested items
      const foundItem = record.items?.find((item: any) => item.index === targetIndex);
      if (foundItem) return foundItem;
    }
    return undefined;  // Not found
  }

  setTotalForIndividual(id:string){
    var mainItem= this.findById(this.dataRecords,id);  
    console.log(mainItem);
    if(mainItem.items?.length>0){
      this.findById(this.dataRecords,id).actualamount= mainItem.items.filter((x:any)=>!x.isdeleted).map((t:any) => t.actualamount).reduce((acc:number, value:number) => acc + value, 0);
    }
    else{
      this.findById(this.dataRecords,id).actualamount= mainItem.actualamount;
    }
  }

  findById(records: any[], id: string): any | undefined {
    for (const record of records) {
      // Check top-level record
      if (record.id === id) return record;
  
      // Check nested items
      const foundItem = record.items?.find((item: any) => item.id === id);
      if (foundItem) return foundItem;
    }
    return undefined;  // Not found
  }
  revenueDataLoad(data:any){
    if(data)
      this.addDatatoSheet(data);
  }
  getHighestIndex(records: any[]): number {
    let maxIndex = -Infinity;
  
    records.forEach(record => {
      if (record.index != null && record.index > maxIndex) {
        maxIndex = record.index;
      }
  
      if (Array.isArray(record.items)) {
        record.items.forEach((item: any) => {
          if (item.index != null && item.index > maxIndex) {
            maxIndex = item.index;
          }
        });
      }
    });
  
    return maxIndex === -Infinity ? 0 : maxIndex;
  }

  rowIndex=-1;
  addDatatoSheet(data:any){
   // console.log(data);
   this.sessionService.profileLossScopeSubject$.pipe(take(1)).subscribe((response:any)=>{
    if(response.length>0){      
      if(data.type== DialogOperation.ADD){
       
        let records = data.value.map((item:any)=>({
          id:item.id,
          index:++this.rowIndex,
          type:'data',
          pid:item.id,
          name:item.name,
          actualamount: this.commonService.roundValue(+item.total),
          realamount: this.commonService.roundValue(+item.total),
          noteno:'',
          isNew:false,
          isdeleted:false,
          isEditing:false,
          isEdited:false,
          isremovable:item.isremovable,
          order:this.scopes.find(x=>x.id== item.scopeid)?.order,
          group: this.scopes.find(x=>x.id== item.scopeid)?.key,
          acctype:this.scopes.find(x=>x.id== item.scopeid)?.accounttype,   
          isincome:this.scopes.find(x=>x.id== item.scopeid)?.accounttype.toLowerCase() =='income',
          items:item.items.map((subitem:any)=>({
            ...subitem,index:++this.rowIndex,
            isdeleted:false, 
            isNew:false,
            isEdited:false,
            sid:this.scopes.find(x=>x.id== item.scopeid)?.id,
            pid:item.id,
            isremovable:subitem.isremovable,
            realamount: this.commonService.roundValue(+subitem.total),
          }))     
      }));
        this.dataRecords.splice(0, 0, ...records);
        this.dataSource = this.buildGroupedRows(this.dataRecords);
      }
      else if(data.type== DialogOperation.EDIT){
        const element:any = this.dataRecords.find((x:any) => x.id == data.value.id);
        if(element){
        element.id = data.value.id;     
        element.name=data.value.name,
        element.actualamount = this.commonService.roundValue( +data.value.amount),
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
        actualamount: this.commonService.roundValue(this.getTotalCurrentIncome()),
        previousexpenditure:this.getTotalPreviousIncome(),
        isincome:true
      }
      let totalExpense = {
        type: 'totalfooter',
        name:'Total Expense',
        actualamount: this.commonService.roundValue(this.getTotalCurrentExpense()),
        previousexpenditure:this.getTotalPreviousExpense(),
        isincome:false
      }         
      this.dataRecords.push(totalIncome);
      this.dataRecords.push(totalExpense);
      //this.dataSource = this.buildGroupedRows(this.dataRecords);
    }
   })
  }

  getCurrentAmount(data:Row[]) {
    let total= data.map((t:any) => t.actualamount).reduce((acc, value) => acc + value, 0);    
    return !isNaN(total) ? total :0;
  }
  getPreviousAmount(data:Row[]) {
    let total= data.map((t:any) => t.previousexpenditure).reduce((acc, value) => acc + value, 0);    
    return !isNaN(total) ? total :0;
  }
  getTotalCurrentIncome(){
    let total= this.dataRecords.filter(x=>x.isincome && x.type!=this.footerRow).map((t:any) => t.actualamount).reduce((acc:number, value:number) => acc + value, 0);    
    return !isNaN(total) ? total :0;
  }
  getTotalCurrentExpense(){
    let total= this.dataRecords.filter(x=>x.isincome==false&& x.type!=this.footerRow).map((t:any) => t.actualamount).reduce((acc:number, value:number) => acc + value, 0);    
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
  submit(){
    this.isClicked=true;
    const updateobj: any[] = this.dataRecords.map(scope => {
      let filteredItems =[];     
      if(scope.items && scope.items.length>0){
        filteredItems = scope.items
        .filter((item:any) => (item.id=='' || item.isEdited || item.isdeleted))
        .map((item:any) => ({
          id: item.id,
          name: item.name?.trim(),
          actualamount: item.actualamount,
          otheramount: item.otheramount,
          isedited:item.isEdited,
          isdeleted:item.isdeleted
        }));
      }
    
     if(!scope.isEdited && filteredItems.length==0)
        return{id:null};

      return {
        id: scope.id,
        name: scope.name,
        total: scope.actualamount,
        items: filteredItems
      };
    }).filter(x=>x.id);
    this.profitLossService.updateProfitLossById({id:this.profitLossData.id,scopes:updateobj}, '')
    .pipe(finalize(() => {this.isLoading = false; this.isClicked=false;}))
    .subscribe({next : (response: any) => {
      if (response && response.success) {
        this.profitLossData = response.data;      
        this.dataRecords=[];
        this.dataSource=[];    
          this.addDatatoSheet({type:DialogOperation.ADD,value:this.profitLossData.scopes});   
          this.dataObj.percentage = this.commonService.netPercentage(
          this.dataObj.totalincome,
          this.dataObj.totalexpense,
          this.dataObj.totalincome-this.dataObj.totalexpense);
        }     
    }});
  }
  
  print(): void {
    const width = 800;
  const height = 600;

  // Calculate the position to center the window
  // const left = (window.screen.width - width) / 2;
  // const top = (window.screen.height - height) / 2;

    const contentToPrint = document.getElementById('print-section');
    if (!contentToPrint) return;
  
    const printWindow = window.open('', '_blank', 
      `width=${width},height=${height},top=0,left=0,scrollbars=yes,resizable=yes`
    );
    if (!printWindow) return;
  
    // Get all style sheets from the main window
    const styles = Array.from(document.styleSheets)
      .map((styleSheet) => {
        try {
          return Array.from(styleSheet.cssRules)
            .map(rule => rule.cssText)
            .join('');
        } catch (e) {
          return ''; // Avoid cross-origin errors
        }
      })
      .join('');
  
    printWindow.document.head.innerHTML = `
      <style>
        ${styles}
        @media print {
          .no-print {
            display: none !important;
          }
        }
        body {
          background: white;
          color: black;
          padding: 20px;
          font-family: sans-serif;
        }
      </style>
    `;
  
    printWindow.document.body.innerHTML = contentToPrint.innerHTML;
  
    // Wait to ensure content loads before printing
    setTimeout(() => {
      printWindow?.focus();
      printWindow?.print();
      printWindow?.close();
    }, 300);
  }
  
  
  
}



