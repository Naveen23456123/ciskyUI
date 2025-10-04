import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { ViewOfficeDetailsComponent } from '@app/shared/components/office/view-office-details/view-office-details.component';

@Component({
  selector: 'app-view-office-rent',
  standalone: false,
  templateUrl: './view-office-rent.component.html',
  styleUrl: './view-office-rent.component.scss'
})
export class ViewOfficeRentComponent {
constructor(private route: ActivatedRoute, private dialog: MatDialog,
    private router: Router) { }

  defaultdialogOptionConfig: MatDialogConfig = {
    minWidth: '1100px',
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

    const dialogRef = this.dialog.open(ViewOfficeDetailsComponent, this.defaultdialogOptionConfig);
    dialogRef.afterClosed().subscribe((data) => {
      this.router.navigate(['../../'], { relativeTo: this.route, });
    });
  }
}




