import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { ManageVehcileLogComponent } from '@app/shared/components/vehicle/manage-vehcile-log/manage-vehcile-log.component';

@Component({
  selector: 'app-edit-vehicle-log',
  standalone: false,
  templateUrl: './edit-vehicle-log.component.html',
  styleUrl: './edit-vehicle-log.component.scss'
})
export class EditVehicleLogComponent {
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

    const dialogRef = this.dialog.open(ManageVehcileLogComponent, this.defaultdialogOptionConfig);
    dialogRef.afterClosed().subscribe((data) => {
      if (data && data.valid) {
        let navigationExtras: NavigationExtras = {
          relativeTo: this.route,
          state: { value: data.value, event: 'logedit', valid: true, msg: 'The Vehicle Log updated successfully.' }
        };
        this.router.navigate(['../../'], navigationExtras);
      }
      else {
        this.router.navigate(['../../'], { relativeTo: this.route, });
      }
    });

  }
}



