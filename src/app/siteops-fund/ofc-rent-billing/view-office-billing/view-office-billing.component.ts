import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { ManageViewOfficeBillingComponent } from '@app/shared/components/siteops/office/manage-view-office-billing/manage-view-office-billing.component';

@Component({
  selector: 'app-view-office-billing',
  standalone: false,
  templateUrl: './view-office-billing.component.html',
  styleUrl: './view-office-billing.component.scss'
})
export class ViewOfficeBillingComponent {
constructor(private route: ActivatedRoute, private dialog: MatDialog,
    private router: Router) { }
  vehbilId='';
  defaultdialogOptionConfig: MatDialogConfig = {
    minWidth: '75vw',
    disableClose: false,
    data: {}
  }

  ngOnInit(): void {
    this.vehbilId = this.route.snapshot.paramMap.get('ofcBillId') ?? '';
    this.openDialog();
  }
  openDialog() {
    this.defaultdialogOptionConfig.data = {
      pageGuid: this.route.snapshot.data['pageGuid'],
      type: this.route.snapshot.data['type'],
      element: window.history.state
    };

    const dialogRef = this.dialog.open(ManageViewOfficeBillingComponent, this.defaultdialogOptionConfig);
    dialogRef.afterClosed().subscribe((data) => {
     this.router.navigate(['../../'], { relativeTo: this.route, });
    });

  }
}





