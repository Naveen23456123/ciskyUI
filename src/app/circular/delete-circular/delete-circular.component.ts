import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { DialogService } from '@app/shared/services/dialog.service';
import { ManageCircularComponent } from '@app/shared/components/manage-circular/manage-circular.component';

@Component({
  selector: 'app-delete-circular',
  standalone: false,
  templateUrl: './delete-circular.component.html',
  styleUrl: './delete-circular.component.scss'
})
export class DeleteCircularComponent {
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
    disableClose: false,
    data: {}
  }

  openDialog() {
    this.defaultdialogOptionConfig.data = {
      pageGuid: this.route.snapshot.data['pageGuid'],
      type: this.route.snapshot.data['type'],
      element: window.history.state
    };
    const dialogRef = this.dialog.open(ManageCircularComponent, this.defaultdialogOptionConfig);
    dialogRef.afterClosed().subscribe((data) => {
      if (data && data.valid) {
        let navigationExtras: NavigationExtras = {
          relativeTo: this.route,
          state: { value: data.value, event: 'vehdelete', valid: true, msg: 'Vehicle removed successfully.' }
        };
        this.router.navigate(['../../'], navigationExtras);
      }
      else {
        this.router.navigate(['../../'], { relativeTo: this.route, });
      }
    });

  }
}

