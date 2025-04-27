import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { DialogService } from '@app/shared/services/dialog.service';
import { ManageExpenseComponent } from '@app/shared/components/siteops/manage-expense/manage-expense.component';

@Component({
  selector: 'app-delete-expense',
  standalone: false,
  templateUrl: './delete-expense.component.html',
  styleUrl: './delete-expense.component.scss'
})
export class DeleteExpenseComponent {
ngOnInit(): void {
    this.openDialog();
  }
  restrictDialog() {
    const dialogref = this.dialogservice.warn("You do not have privilige to to this action.", "Delete Employee", '', "Cancel");

    dialogref.afterClosed().subscribe((result:any) => {
      this.router.navigate(['../../'], { relativeTo: this.route })
    });
  }

  constructor(private route: ActivatedRoute, private dialog: MatDialog,
    private router: Router, private dialogservice: DialogService) { }
  defaultdialogOptionConfig: MatDialogConfig = {   
    disableClose: true,
    data: {}
  }

  openDialog() {
    this.defaultdialogOptionConfig.data = {
      pageGuid: this.route.snapshot.data['pageGuid'],
      type: this.route.snapshot.data['type'],
      element: window.history.state
    };
    this.defaultdialogOptionConfig.minWidth='50vw';
    const dialogRef = this.dialog.open(ManageExpenseComponent, this.defaultdialogOptionConfig);
    dialogRef.afterClosed().subscribe((data) => {
      if (data.valid) {
        let navigationExtras: NavigationExtras = {
          relativeTo: this.route,
          state: { value: data.value, event: 'expdelete', valid: true, msg: 'The Expense removed successfully.' }
        };
        this.router.navigate(['../../'], navigationExtras);
      }
      else {
        this.router.navigate(['../../'], { relativeTo: this.route, });
      }
    });

  }
}



