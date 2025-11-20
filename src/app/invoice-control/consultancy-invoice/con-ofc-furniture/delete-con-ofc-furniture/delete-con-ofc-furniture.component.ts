import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { DialogService } from '@app/shared/services/dialog.service';
import { ManageConsultancyOfficeFurnitureComponent } from '@app/shared/components/invoices/consultancy/manage-consultancy-office-furniture/manage-consultancy-office-furniture.component';

@Component({
  selector: 'app-delete-con-ofc-furniture',
  standalone: false,
  templateUrl: './delete-con-ofc-furniture.component.html',
  styleUrl: './delete-con-ofc-furniture.component.scss'
})
export class DeleteConOfcFurnitureComponent {
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
    const dialogRef = this.dialog.open(ManageConsultancyOfficeFurnitureComponent, this.defaultdialogOptionConfig);
    dialogRef.afterClosed().subscribe((data) => {
      if (data.valid) {
        let navigationExtras: NavigationExtras = {
          relativeTo: this.route,
          state: { value: data.value, event: 'conofdelete', valid: true, msg: 'The Office Furniture invoice details removed successfully.' }
        };
        this.router.navigate(['../../'], navigationExtras);
      }
      else {
        this.router.navigate(['../../'], { relativeTo: this.route, });
      }
    });

  }
}




