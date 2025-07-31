import { Component ,inject} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, NavigationExtras, Route, Router } from '@angular/router';
import { ManageConsultancyOfficeFurnitureComponent } from '@app/shared/components/invoices/consultancy/manage-consultancy-office-furniture/manage-consultancy-office-furniture.component';
import { NotifyBarService } from '@app/shared/services/notify-bar.service';

@Component({
  selector: 'app-edit-con-ofc-furniture',
  standalone: false,
  templateUrl: './edit-con-ofc-furniture.component.html',
  styleUrl: './edit-con-ofc-furniture.component.scss'
})
export class EditConOfcFurnitureComponent {
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
    const dialogRef = this.dialog.open(ManageConsultancyOfficeFurnitureComponent, config);
    dialogRef.afterClosed().subscribe((data) => {
      if (data && data.valid) {
        let navigationExtras: NavigationExtras = {
          relativeTo: this.route,
          state: { value: data.value, event: 'conofedit', valid: true, msg: 'The Office Furniture invoice details updated successfully.' }
        };
        this.router.navigate(['../../'], navigationExtras);
      }
      else {
        this.router.navigate(['../../'], { relativeTo: this.route, });
      }
    });
  }


}







