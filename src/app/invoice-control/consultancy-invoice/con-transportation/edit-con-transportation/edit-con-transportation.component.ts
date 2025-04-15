import { Component ,inject} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, NavigationExtras, Route, Router } from '@angular/router';
import { ManageConsultancyDutyTravelComponent } from '@app/shared/components/invoices/consultancy/manage-consultancy-duty-travel/manage-consultancy-duty-travel.component';
import { ManageConsultancyTransportationComponent } from '@app/shared/components/invoices/consultancy/manage-consultancy-transportation/manage-consultancy-transportation.component';
import { NotifyBarService } from '@app/shared/services/notify-bar.service';

@Component({
  selector: 'app-edit-con-transportation',
  standalone: false,
  templateUrl: './edit-con-transportation.component.html',
  styleUrl: './edit-con-transportation.component.scss'
})
export class EditConTransportationComponent {
readonly dialog = inject(MatDialog);

  constructor(
    private router: Router,
    private route: ActivatedRoute, private formbuilder: FormBuilder,
    private notifybar: NotifyBarService) {    
  }

  ngOnInit(): void {
    this.openDialog();
  }
  
  private defaultdialogoptions:  MatDialogConfig = {
    minWidth: '1000px',
    disableClose: false,
    data: {},
  };

  openDialog(): void {
    const config = this.defaultdialogoptions;
    config.data = {
      pageGuid: this.route.snapshot.data['pageGuid'],
      type: this.route.snapshot.data['type'],
      element: window.history.state
    };
    const dialogRef = this.dialog.open(ManageConsultancyTransportationComponent, config);
    dialogRef.afterClosed().subscribe((data) => {
      if (data && data.valid) {
        let navigationExtras: NavigationExtras = {
          relativeTo: this.route,
          state: { value: data.value, event: 'conttpedit', valid: true, msg: 'The Transportation invoice details updated successfully.' }
        };
        this.router.navigate(['../../'], navigationExtras);
      }
      else {
        this.router.navigate(['../../'], { relativeTo: this.route, });
      }
    });
  }


}







