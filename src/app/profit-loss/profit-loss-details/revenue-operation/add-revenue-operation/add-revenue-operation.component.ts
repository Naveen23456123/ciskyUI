import { Component ,inject} from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, NavigationExtras, Route, Router } from '@angular/router';
import { ManageProfitLossComponent } from '@app/shared/components/proft-and-loss/manage-profit-loss/manage-profit-loss.component';
import { ProfitLossScope } from '@app/shared/models/constant.config';

@Component({
  selector: 'app-add-revenue-operation',
  standalone: false,
  templateUrl: './add-revenue-operation.component.html',
  styleUrl: './add-revenue-operation.component.scss'
})
export class AddRevenueOperationComponent {
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
      scope: ProfitLossScope.REVENUE_FROM_OPERATION
    };
    const dialogRef = this.dialog.open(ManageProfitLossComponent, config);
    dialogRef.afterClosed().subscribe((data) => {
      if (data && data.valid) {
        let navigationExtras: NavigationExtras = {
          relativeTo: this.route,
          state: { value: data.value, event: 'prvadd', valid: true, msg: 'The Revenue from operations details created successfully.' }
        };
        this.router.navigate(['../'], navigationExtras);
      }
      else {
        this.router.navigate(['../'], { relativeTo: this.route });
      }
    });
  }


}





