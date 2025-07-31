import { Component ,inject} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, NavigationExtras, Route, Router } from '@angular/router';
import { ManageConsultancyContingenciesComponent } from '@app/shared/components/invoices/consultancy/manage-consultancy-contingencies/manage-consultancy-contingencies.component';
import { NotifyBarService } from '@app/shared/services/notify-bar.service';


@Component({
  selector: 'app-add-con-contingency',
  standalone: false,
  templateUrl: './add-con-contingency.component.html',
  styleUrl: './add-con-contingency.component.scss'
})
export class AddConContingencyComponent {

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
    panelClass: 'custom-dialog-container',
    minWidth: '1000px',
    disableClose: false,
    data: {},
  };

  openDialog(): void {
    const config = this.defaultdialogoptions;
    config.data = {
      pageGuid: this.route.snapshot.data['pageGuid'],
      type: this.route.snapshot.data['type']
    };
    const dialogRef = this.dialog.open(ManageConsultancyContingenciesComponent, config);
    dialogRef.afterClosed().subscribe((data) => {
      if (data && data.valid) {
        let navigationExtras: NavigationExtras = {
          relativeTo: this.route,
          state: { value: data.value, event: 'concontadd', valid: true, msg: 'The Contingency invoice details created successfully.' }
        };
        this.router.navigate(['../'], navigationExtras);
      }
      else {
        this.router.navigate(['../'], { relativeTo: this.route });
      }
    });
  }


}






