import { Component ,inject} from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, NavigationExtras,  Router } from '@angular/router';
import { ManageExpenseComponent } from '@app/shared/components/siteops/manage-expense/manage-expense.component';


@Component({
  selector: 'app-claim-expense',
  standalone: false,
  templateUrl: './claim-expense.component.html',
  styleUrl: './claim-expense.component.scss'
})
export class ClaimExpenseComponent {
 readonly dialog = inject(MatDialog);

  constructor(
    private router: Router,
    private route: ActivatedRoute) {    
  }

  ngOnInit(): void {
    this.openDialog();
  }
  
  private defaultdialogoptions:  MatDialogConfig = {   
    disableClose: false,
    data: {},
  };

  openDialog(): void {
    const config = this.defaultdialogoptions;
    config.data = {
      pageGuid: this.route.snapshot.data['pageGuid'],
      type: this.route.snapshot.data['type'],
      element:window.history.state
    };
    config.minWidth= '70vw';
    const dialogRef = this.dialog.open(ManageExpenseComponent, config);
    dialogRef.afterClosed().subscribe((data) => {
      if (data && data.valid) {
        let navigationExtras: NavigationExtras = {
          relativeTo: this.route,
          state: { value: data.value, event: 'expclaim', valid: true, msg: 'The Expense claimed successfully.' }
        };
        this.router.navigate(['../../'], navigationExtras);
      }
      else {
        this.router.navigate(['../../'], { relativeTo: this.route });
      }
    });
  }


}




