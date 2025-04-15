import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { ManageItemComponent } from '@app/shared/components/manage-item/manage-item.component';


@Component({
  selector: 'app-edit-item',
  standalone: false,
  templateUrl: './edit-item.component.html',
  styleUrl: './edit-item.component.scss'
})
export class EditItemComponent {
constructor(private route: ActivatedRoute, private dialog: MatDialog,
    private router: Router) { }

  defaultdialogOptionConfig: MatDialogConfig = {
    minWidth: '400px',
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

    const dialogRef = this.dialog.open(ManageItemComponent, this.defaultdialogOptionConfig);
    dialogRef.afterClosed().subscribe((data) => {
      if (data.valid) {
        let navigationExtras: NavigationExtras = {
          relativeTo: this.route,
          state: { value: data.value, event: 'itemedit', valid: true, msg: 'The Item created successfully.' }
        };
        this.router.navigate(['../../'], navigationExtras);
      }
      else {
        this.router.navigate(['../../'], { relativeTo: this.route, });
      }
    });

  }
}


