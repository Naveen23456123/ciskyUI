import { Component ,inject} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, NavigationExtras, Route, Router } from '@angular/router';
import { ManageVehcileBillingComponent } from '@app/shared/components/vehicle/manage-vehcile-billing/manage-vehcile-billing.component';

@Component({
  selector: 'app-add-vehicle-billing',
  standalone: false,
  templateUrl: './add-vehicle-billing.component.html',
  styleUrl: './add-vehicle-billing.component.scss'
})
export class AddVehicleBillingComponent {
readonly dialog = inject(MatDialog);

  constructor(
    private router: Router,
    private route: ActivatedRoute, private formbuilder: FormBuilder) {    
  }

  ngOnInit(): void {
    this.openDialog();
  }
  
  private defaultdialogoptions:  MatDialogConfig = {
    panelClass: 'custom-dialog-container',
    minWidth: '70vw',
    position: { top: '20px' },
    disableClose: false,
    data: {},
  };

  openDialog(): void {
    const config = this.defaultdialogoptions;
    config.data = {
      pageGuid: this.route.snapshot.data['pageGuid'],
      type: this.route.snapshot.data['type']
    };
    const dialogRef = this.dialog.open(ManageVehcileBillingComponent, config);
    dialogRef.afterClosed().subscribe((data) => {
      if (data && data.valid) {
        let navigationExtras: NavigationExtras = {
          relativeTo: this.route,
          state: { value: data.value,bulk:data.bulk, event: 'billingadd', valid: true, msg: 'The Vehicle Billing created successfully.' }
        };
        this.router.navigate(['../'], navigationExtras);
      }
      else {
        this.router.navigate(['../'], { relativeTo: this.route });
      }
    });
  }


}


