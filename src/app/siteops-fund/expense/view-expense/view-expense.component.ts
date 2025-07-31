import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { ViewExpDetailsInfoComponent } from '@app/shared/components/siteops/view-exp-details-info/view-exp-details-info.component';
@Component({
  selector: 'app-view-expense',
  standalone: false,
  templateUrl: './view-expense.component.html',
  styleUrl: './view-expense.component.scss'
})
export class ViewExpenseComponent {
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
      element: this.route.snapshot.paramMap.get('expId')
    };
    this.defaultdialogOptionConfig.minWidth='80vw';
    const dialogRef = this.dialog.open(ViewExpDetailsInfoComponent, this.defaultdialogOptionConfig);
    dialogRef.afterClosed().subscribe((data) => {
      let navigationExtras: NavigationExtras = {
          relativeTo: this.route,
          state: { value: data.value, event: 'expclose', valid: true }
        };
       this.router.navigate(['../../'], navigationExtras);
    });

  }
}






