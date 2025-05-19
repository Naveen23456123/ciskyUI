import { Component ,inject} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, NavigationExtras, Route, Router } from '@angular/router';
import { ManageConsultancyOfficeSuppliesComponent } from '@app/shared/components/invoices/consultancy/manage-consultancy-office-supplies/manage-consultancy-office-supplies.component';
import { NotifyBarService } from '@app/shared/services/notify-bar.service';

@Component({
  selector: 'app-edit-con-ofc-supply',
  standalone: false,
  templateUrl: './edit-con-ofc-supply.component.html',
  styleUrl: './edit-con-ofc-supply.component.scss'
})
export class EditConOfcSupplyComponent {
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
        currentbillmonths:window.history.state.currentbillmonths
      }
    };
    const dialogRef = this.dialog.open(ManageConsultancyOfficeSuppliesComponent, config);
    dialogRef.afterClosed().subscribe((data) => {
      if (data && data.valid) {
        let navigationExtras: NavigationExtras = {
          relativeTo: this.route,
          state: { value: data.value, event: 'conosedit', valid: true, msg: 'The Office Supply invoice details updated successfully.' }
        };
        this.router.navigate(['../../'], navigationExtras);
      }
      else {
        this.router.navigate(['../../'], { relativeTo: this.route, });
      }
    });
  }


}







