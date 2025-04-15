import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { ManageSiteInventoryComponent } from '@app/shared/components/inventory/manage-site-inventory/manage-site-inventory.component';

@Component({
  selector: 'app-edit-inventory',
  standalone: false,
  templateUrl: './edit-inventory.component.html',
  styleUrl: './edit-inventory.component.scss'
})
export class EditInventoryComponent {
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

    const dialogRef = this.dialog.open(ManageSiteInventoryComponent, this.defaultdialogOptionConfig);
    dialogRef.afterClosed().subscribe((data) => {
      if (data.valid) {
        let navigationExtras: NavigationExtras = {
          relativeTo: this.route,
          state: { value: data.value, event: 'empedit', valid: true, msg: 'The inventory created successfully.' }
        };
        this.router.navigate(['../../'], navigationExtras);
      }
      else {
        this.router.navigate(['../../'], { relativeTo: this.route, });
      }
    });

  }
}


