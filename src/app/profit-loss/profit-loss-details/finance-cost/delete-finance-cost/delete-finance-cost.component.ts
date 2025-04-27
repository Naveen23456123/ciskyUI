import { Component ,inject} from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, NavigationExtras, Route, Router } from '@angular/router';
import { ManageProfitLossComponent } from '@app/shared/components/proft-and-loss/manage-profit-loss/manage-profit-loss.component';
import { ProfitLossScope } from '@app/shared/models/constant.config';

@Component({
  selector: 'app-delete-finance-cost',
  standalone: false,
  templateUrl: './delete-finance-cost.component.html',
  styleUrl: './delete-finance-cost.component.scss'
})
export class DeleteFinanceCostComponent {
  readonly dialog = inject(MatDialog);

  constructor(private router: Router,private route: ActivatedRoute) {    
  }

  ngOnInit(): void {
    this.openDialog();
  }
  
  private defaultdialogoptions:  MatDialogConfig = {
    minWidth: '35vw',
    disableClose: false,
    data: {},
  };

  openDialog(): void {
    const config = this.defaultdialogoptions;
    config.data = {
      pageGuid: this.route.snapshot.data['pageGuid'],
      type: this.route.snapshot.data['type'],
      scope: ProfitLossScope.FINANCE_COST,
      element: window.history.state
    };
    const dialogRef = this.dialog.open(ManageProfitLossComponent, config);
    dialogRef.afterClosed().subscribe((data) => {
      if (data && data.valid) {
        let navigationExtras: NavigationExtras = {
          relativeTo: this.route,
          state: { value: data.value, event: 'fcdelete', valid: true, msg: 'The Finance Cost removed successfully.' }
        };
        this.router.navigate(['../'], navigationExtras);
      }
      else {
        this.router.navigate(['../'], { relativeTo: this.route });
      }
    });
  }


}









