import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { ManageVehicleComponent } from '@app/shared/components/vehicle/manage-vehcile/manage-vehcile.component';

@Component({
  selector: 'app-edit-vehicle',
  standalone: false,
  templateUrl: './edit-vehicle.component.html',
  styleUrl: './edit-vehicle.component.scss'
})
export class EditVehicleComponent {
constructor(private route: ActivatedRoute, private dialog: MatDialog,
    private router: Router) { }

  defaultdialogOptionConfig: MatDialogConfig = {
    minWidth: '1000px',
    disableClose: false,
    data: {}
  }

  ngOnInit(): void {
    this.openDialog();
  }
  openDialog() {
    this.defaultdialogOptionConfig.data = {
      pageGuid: this.route.snapshot.data['pageGuid'],
      type: this.route.snapshot.data['type'],
      element: window.history.state
    };
    this.defaultdialogOptionConfig.minWidth='65vw';
    const dialogRef = this.dialog.open(ManageVehicleComponent, this.defaultdialogOptionConfig);
    dialogRef.afterClosed().subscribe((data) => {
      if (data && data.valid) {
        let navigationExtras: NavigationExtras = {
          relativeTo: this.route,
          state: { value: data.value, event: 'vehedit', valid: true, msg: 'The Vehicle updated successfully.' }
        };
        this.router.navigate(['../../'], navigationExtras);
      }
      else {
        this.router.navigate(['../../'], { relativeTo: this.route, });
      }
    });

  }
}



