import { Component, inject, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeInterfaceService } from '@app/shared/services/external/employee-interface.service';
import { ProfitLossInterfaceService } from '@app/shared/services/external/profit-loss-interface.service';
import { finalize } from 'rxjs';
import { ProfitLossInvDetailsComponent } from '../profit-loss-inv-details/profit-loss-inv-details.component';
import { DialogOperation } from '@app/shared/models/constant.config';
import { NotifyBarService } from '@app/shared/services/notify-bar.service';

@Component({
  selector: 'app-profit-loss-inv-list',
  standalone: false,
  templateUrl: './profit-loss-inv-list.component.html',
  styleUrl: './profit-loss-inv-list.component.scss'
})
export class ProfitLossInvListComponent {
  employees: any[] = [];
  data: any;
  isLoading = true;
  displayedColumns: string[] = ['serial', 'name', 'monthly','expense', 'action'];
  dataSource!: MatTableDataSource<any[]>;
  title: string = '';
  titleValue: string = '';
  readonly dialog = inject(MatDialog);
  private defaultdialogoptions: MatDialogConfig = {
    disableClose: false,
    data: {},
  };

  constructor(@Inject(MAT_DIALOG_DATA) data: any, private profitlossService: ProfitLossInterfaceService,
    private route: ActivatedRoute, private notifyBarService: NotifyBarService, private router: Router,
    private dialogRef: MatDialogRef<ProfitLossInvListComponent>
  ) {
    this.data = data || {};
    this.dataSource = new MatTableDataSource(this.employees);
  }
  filterChange(event: any) {
    if (event) {
      this.dataSource.filter = (event.target as HTMLInputElement).value.trim().toLowerCase()
    }
    else {
      this.dataSource.filter = '';
    }
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  ngOnInit() {
    if (this.data) {
      console.log(this.data);
      this.title = this.data.element.projectshortname;
      this.profitlossService.getProfitLossListByOrgId({ pid: this.data.element.id }, '')
        .pipe(finalize(() => this.isLoading = false))
        .subscribe({
          next: (response: any) => {
            if (response && response.success) {
              this.employees = response.data;
              this.dataSource = new MatTableDataSource(this.employees);
            }
          }
        });
    }
  }
  viewClick(data: any) {
    const config = this.defaultdialogoptions;
    config.minWidth = '80vw';
    config.minHeight = '10vh',
      config.data = {
        pageGuid: this.route.snapshot.data['pageGuid'],
        type: this.route.snapshot.data['type'],
        element: data
      };
    this.dialogRef.close();
    this.router.navigate(['/profit-loss-details'], { state: { value: data } });
    //this.dialog.open(ProfitLossInvDetailsComponent,config);
  }
  viewExpense(data: any) {
    let obj={
      project:this.data.element,
      invoice:data
    }
    this.dialogRef.close();
    this.router.navigate(['/profit-loss-expense'], { state: { value: obj } });
  }
  deleteClick(data: any) {
    const config = this.defaultdialogoptions;
    config.minWidth = '45vw';
    config.minHeight = '10vh',
      config.data = {
        pageGuid: this.route.snapshot.data['pageGuid'],
        type: DialogOperation.DELETE,
        element: data
      };
    let dialogRef = this.dialog.open(ProfitLossInvDetailsComponent, config);
    dialogRef.afterClosed().subscribe((data: any) => {
      if (data && data.valid) {
        const index = this.dataSource.data.findIndex((x: any) => x.id == data.value);
        this.dataSource.data.splice(index, 1);
        this.dataSource._updateChangeSubscription();
        this.notifyBarService.showsnackbar('Profit Loss removed successfully');
      }
    })
  }
}


