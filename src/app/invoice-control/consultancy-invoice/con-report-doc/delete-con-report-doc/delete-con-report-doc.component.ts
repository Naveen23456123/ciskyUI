import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { DialogService } from '@app/shared/services/dialog.service';
import { ManageConsultancyReportDocComponent } from '@app/shared/components/invoices/consultancy/manage-consultancy-report-doc/manage-consultancy-report-doc.component';
@Component({
  selector: 'app-delete-con-report-doc',
  standalone: false,
  templateUrl: './delete-con-report-doc.component.html',
  styleUrl: './delete-con-report-doc.component.scss'
})
export class DeleteConReportDocComponent {
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
      element: {
        id:window.history.state.invoiceid,
        scopeid:window.history.state.id
      }
    };
    const dialogRef = this.dialog.open(ManageConsultancyReportDocComponent, this.defaultdialogOptionConfig);
    dialogRef.afterClosed().subscribe((data) => {
      if (data.valid) {
        let navigationExtras: NavigationExtras = {
          relativeTo: this.route,
          state: { value: data.value, event: 'conrddelete', valid: true, msg: 'The Report Doc invoice details removed successfully.' }
        };
        this.router.navigate(['../../'], navigationExtras);
      }
      else {
        this.router.navigate(['../../'], { relativeTo: this.route, });
      }
    });

  }
}




