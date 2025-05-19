import { Component ,inject} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, NavigationExtras, Route, Router } from '@angular/router';
import { ManageConsultancyInvoiceComponent } from '@app/shared/components/invoices/consultancy/manage-consultancy-invoice/manage-consultancy-invoice.component';
import { NotifyBarService } from '@app/shared/services/notify-bar.service';

@Component({
  selector: 'app-delete-invoice',
  standalone: false,
  templateUrl: './delete-invoice.component.html',
  styleUrl: './delete-invoice.component.scss'
})
export class DeleteInvoiceComponent {
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
    minWidth: '500px',
    disableClose: false,
    data: {},
    //scrollStrategy: this.scrollStrategy.noop()
  };

  openDialog(): void {
    const config = this.defaultdialogoptions;
    config.data = {
      pageGuid: this.route.snapshot.data['pageGuid'],
      type: this.route.snapshot.data['type'],
      element:window.history.state
    };
    const dialogRef = this.dialog.open(ManageConsultancyInvoiceComponent, config);
    dialogRef.afterClosed().subscribe((data) => {
      if (data && data.valid) {
        let navigationExtras: NavigationExtras = {
          relativeTo: this.route,
          state: { value: data.value, event: 'invdelete', valid: true, msg: 'The Inventory removed successfully.' }
        };
        this.router.navigate(['../../'], navigationExtras);
      }
      else {
        this.router.navigate(['../../'], { relativeTo: this.route });
      }
    });
  }


}


