import { Component, Inject, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-manage-admin-expense',
  standalone: false,
  templateUrl: './manage-admin-expense.component.html',
  styleUrl: './manage-admin-expense.component.scss'
})
export class ManageAdminExpenseComponent {
  public data: any;
  isLoading = true;
  dataSource!: MatTableDataSource<any[]>;
  expenseList:any=[];
  totalAmount:number=0;
  constructor(@Inject(MAT_DIALOG_DATA) data: any,
    @Optional() private dialogRef: MatDialogRef<ManageAdminExpenseComponent>) {
    this.data = data || {};
  }
  ngOnInit() {    
    this.expenseList= this.data.element;
    this.isLoading = false;
  }
  displayedColumns: string[] = ['value', 'amount', 'actions'];

  addedExpenses: any[] = [];
  selectedExpenseId: string = '';

  get availableExpenses() {
    const addedIds = new Set(this.addedExpenses.map(x => x.id));
    return this.expenseList.filter((x:any) => !addedIds.has(x.id));
  }

  addExpense() {
    const selected = this.expenseList.find((x:any) => x.id === this.selectedExpenseId);
    if (!selected) return;

    this.addedExpenses.push({
      ...selected,
      amount: null,
      isEditing: true
    });
    this.selectedExpenseId = '';  
    this.updateTable(this.addedExpenses);  
  }
  private updateTable(info: any) {
      this.addedExpenses = info;
      this.dataSource = new MatTableDataSource<any>(info);
      this.updateTotal();
    }
updateTotal() {
  // Simply trigger Angular change detection by assigning total again
  this.totalAmount = this.addedExpenses.reduce((sum, e) => sum + (Number(e.amount) || 0), 0);
}
  deleteExpense(item: any) {
    this.addedExpenses = this.addedExpenses.filter(x => x.id !== item.id);
    this.updateTable(this.addedExpenses);  
  }
  submit(){
    this.dialogRef.close({value:this.addedExpenses, valid:true});
  }
}

