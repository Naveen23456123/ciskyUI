import { Component ,inject} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, NavigationExtras, Route, Router } from '@angular/router';
import { ManageConsultancyOfficeRentComponent } from '@app/shared/components/invoices/consultancy/manage-consultancy-office-rent/manage-consultancy-office-rent.component';
import { NotifyBarService } from '@app/shared/services/notify-bar.service';

@Component({
  selector: 'app-edit-con-ofc-rent',
  standalone: false,
  templateUrl: './edit-con-ofc-rent.component.html',
  styleUrl: './edit-con-ofc-rent.component.scss'
})
export class EditConOfcRentComponent {
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
      element: {
        pid:window.history.state.invoiceid,
        description:window.history.state.description,
        id:window.history.state.id,
        currentbillmonths:window.history.state.currentbillmonths,
        currentbill:window.history.state.currentbill,
        ratepermonth:window.history.state.rate
      }
    };
    const dialogRef = this.dialog.open(ManageConsultancyOfficeRentComponent, config);
    dialogRef.afterClosed().subscribe((data) => {
      if (data && data.valid) {
        let navigationExtras: NavigationExtras = {
          relativeTo: this.route,
          state: { value: data.value, event: 'conoredit', valid: true, msg: 'The Office Rent invoice details updated successfully.' }
        };
        this.router.navigate(['../../'], navigationExtras);
      }
      else {
        this.router.navigate(['../../'], { relativeTo: this.route, });
      }
    });
  }


}







