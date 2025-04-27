import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { DialogService } from '@app/shared/services/dialog.service';
import { ManageTicketComponent } from '@app/shared/components/manage-ticket/manage-ticket.component';

@Component({
  selector: 'app-delete-ticket',
  standalone: false,
  templateUrl: './delete-ticket.component.html',
  styleUrl: './delete-ticket.component.scss'
})
export class DeleteTicketComponent {
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
    const dialogRef = this.dialog.open(ManageTicketComponent, this.defaultdialogOptionConfig);
    dialogRef.afterClosed().subscribe((data) => {
      if (data.valid) {
        let navigationExtras: NavigationExtras = {
          relativeTo: this.route,
          state: { value: data.value, event: 'ticdelete', valid: true, msg: 'The Ticket removed successfully.' }
        };
        this.router.navigate(['../../'], navigationExtras);
      }
      else {
        this.router.navigate(['../../'], { relativeTo: this.route, });
      }
    });

  }
}

