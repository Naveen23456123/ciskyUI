import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { ManageConsultantAccountComponent } from '@app/shared/components/consultant/manage-consultant-account/manage-consultant-account.component';
@Component({
  selector: 'app-edit-consultant-account',
  standalone: false,
  templateUrl: './edit-consultant-account.component.html',
  styleUrl: './edit-consultant-account.component.scss'
})
export class EditConsultantAccountComponent {
constructor(private route: ActivatedRoute, private dialog: MatDialog,
    private router: Router) { }

  defaultdialogOptionConfig: MatDialogConfig = {
    minWidth: '900px',
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

    const dialogRef = this.dialog.open(ManageConsultantAccountComponent, this.defaultdialogOptionConfig);
    dialogRef.afterClosed().subscribe((data) => {
      if (data.valid) {
        let navigationExtras: NavigationExtras = {
          relativeTo: this.route,
          state: { value: data.value, event: 'accedit', valid: true, msg: 'The Consultant account updated successfully.' }
        };
        this.router.navigate(['../../'], navigationExtras);
      }
      else {
        this.router.navigate(['../../'], { relativeTo: this.route, });
      }
    });

  }
}



