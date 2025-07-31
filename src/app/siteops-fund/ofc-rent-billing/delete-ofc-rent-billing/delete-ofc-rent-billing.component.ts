import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { DialogService } from '@app/shared/services/dialog.service';
import { ManageOfcRentBillingComponent } from '@app/shared/components/siteops/manage-ofc-rent-billing/manage-ofc-rent-billing.component';

@Component({
  selector: 'app-delete-ofc-rent-billing',
  standalone: false,
  templateUrl: './delete-ofc-rent-billing.component.html',
  styleUrl: './delete-ofc-rent-billing.component.scss'
})
export class DeleteOfcRentBillingComponent {
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
    minWidth: '700px',
    disableClose: true,
    data: {}
  }

  openDialog() {
    this.defaultdialogOptionConfig.data = {
      pageGuid: this.route.snapshot.data['pageGuid'],
      type: this.route.snapshot.data['type'],
      element: window.history.state
    };
    const dialogRef = this.dialog.open(ManageOfcRentBillingComponent, this.defaultdialogOptionConfig);
    dialogRef.afterClosed().subscribe((data) => {
      if (data.valid) {
        let navigationExtras: NavigationExtras = {
          relativeTo: this.route,
          state: { value: data.value, event: 'ofcrentbilldelete', valid: true, msg: 'The Office Billing removed successfully.' }
        };
        this.router.navigate(['../../'], navigationExtras);
      }
      else {
        this.router.navigate(['../../'], { relativeTo: this.route, });
      }
    });

  }
}

