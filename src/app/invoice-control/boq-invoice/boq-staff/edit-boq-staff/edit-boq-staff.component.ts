import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { ManageSupportStaffComponent } from '@app/shared/components/invoices/boq/manage-support-staff/manage-support-staff.component';

@Component({
  selector: 'app-edit-boq-staff',
  standalone: false,
  templateUrl: './edit-boq-staff.component.html',
  styleUrl: './edit-boq-staff.component.scss'
})
export class EditBoqStaffComponent {
constructor(private route: ActivatedRoute, private dialog: MatDialog,
    private router: Router) { }

  defaultdialogOptionConfig: MatDialogConfig = {
    disableClose: true,
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
    this.defaultdialogOptionConfig.minWidth='50vw';
    const dialogRef = this.dialog.open(ManageSupportStaffComponent, this.defaultdialogOptionConfig);
    dialogRef.afterClosed().subscribe((data) => {
      if (data.valid) {
        let navigationExtras: NavigationExtras = {
          relativeTo: this.route,
          state: { value: data.value,professionalData:data.professionalData, event: 'boqstaffedit', valid: true, msg: 'The  Staff invoice details updated successfully.' }
        };
        this.router.navigate(['../../'], navigationExtras);
      }
      else {
        this.router.navigate(['../../'], { relativeTo: this.route, });
      }
    });

  }
}




