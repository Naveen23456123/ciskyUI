import { Component ,inject} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, NavigationExtras, Route, Router } from '@angular/router';
import { ManageConsultancyStaffComponent } from '@app/shared/components/invoices/consultancy/manage-consultancy-staff/manage-consultancy-staff.component';
import { NotifyBarService } from '@app/shared/services/notify-bar.service';

@Component({
  selector: 'app-edit-con-staff',
  standalone: false,
  templateUrl: './edit-con-staff.component.html',
  styleUrl: './edit-con-staff.component.scss'
})
export class EditConStaffComponent {

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
      element:{
        professionalid:window.history.state.professionalid,
        pid:window.history.state.invoiceid,
        designation:window.history.state.designation,
        id:window.history.state.id,
        currentbillmonths:window.history.state.currentbillmonths,
        currentbill:window.history.state.currentbill,
        employeename:window.history.state.name,
        rate:window.history.state.rate,
      }
    };
    const dialogRef = this.dialog.open(ManageConsultancyStaffComponent, config);
    dialogRef.afterClosed().subscribe((data) => {
      if (data && data.valid) {
        let navigationExtras: NavigationExtras = {
          relativeTo: this.route,
          state: { value: data.value,professionalData:data.professionalData, event: 'contstaffedit', valid: true, msg: 'The Staff invoice details updated successfully.' }
        };
        this.router.navigate(['../../'], navigationExtras);
      }
      else {
        this.router.navigate(['../../'], { relativeTo: this.route, });
      }
    });
  }


}







