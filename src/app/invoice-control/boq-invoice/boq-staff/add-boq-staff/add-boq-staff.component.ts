import { Component ,inject} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, NavigationExtras, Route, Router } from '@angular/router';
import { NotifyBarService } from '@app/shared/services/notify-bar.service';
import { ManageSupportStaffComponent } from '@app/shared/components/invoices/boq/manage-support-staff/manage-support-staff.component';

@Component({
  selector: 'app-add-boq-staff',
  standalone: false,
  templateUrl: './add-boq-staff.component.html',
  styleUrl: './add-boq-staff.component.scss'
})
export class AddBoqStaffComponent {

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
    disableClose: false,
    data: {},
  };

  openDialog(): void {
    const config = this.defaultdialogoptions;
    config.data = {
      pageGuid: this.route.snapshot.data['pageGuid'],
      type: this.route.snapshot.data['type']
    };
    config.minWidth='50vw';
    const dialogRef = this.dialog.open(ManageSupportStaffComponent, config);
    dialogRef.afterClosed().subscribe((data) => {
      if (data && data.valid) {
        let navigationExtras: NavigationExtras = {
          relativeTo: this.route,
          state: { value: data.value,professionalData:data.professionalData, event: 'boqstaffadd', valid: true, msg: 'The Staff invoice details created successfully.' }
        };
        this.router.navigate(['../'], navigationExtras);
      }
      else {
        this.router.navigate(['../'], { relativeTo: this.route });
      }
    });
  }


}



