import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { ManageViewVehicleBillingComponent } from '@app/shared/components/vehicle/manage-view-vehicle-billing/manage-view-vehicle-billing.component';

@Component({
  selector: 'app-view-vehicle-billing',
  standalone: false,
  templateUrl: './view-vehicle-billing.component.html',
  styleUrl: './view-vehicle-billing.component.scss'
})
export class ViewVehicleBillingComponent {
  constructor(private route: ActivatedRoute, private dialog: MatDialog,
    private router: Router) { }
  vehbilId='';
  defaultdialogOptionConfig: MatDialogConfig = {
    minWidth: '75vw',
    disableClose: false,
    data: {}
  }

  ngOnInit(): void {
    this.vehbilId = this.route.snapshot.paramMap.get('vehbilId') ?? '';
    this.openDialog();
  }
  openDialog() {
    this.defaultdialogOptionConfig.data = {
      pageGuid: this.route.snapshot.data['pageGuid'],
      type: this.route.snapshot.data['type'],
      element:window.history.state
    };

    const dialogRef = this.dialog.open(ManageViewVehicleBillingComponent, this.defaultdialogOptionConfig);
    dialogRef.afterClosed().subscribe((data) => {
     this.router.navigate(['../../'], { relativeTo: this.route, });
    });

  }
}




