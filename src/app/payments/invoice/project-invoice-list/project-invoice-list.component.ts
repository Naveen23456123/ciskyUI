import { Component ,inject} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, NavigationExtras, Route, Router } from '@angular/router';
import { ManageProjectInvoiceListComponent } from '@app/shared/components/payment/manage-project-invoice-list/manage-project-invoice-list.component';
import { NotifyBarService } from '@app/shared/services/notify-bar.service';


@Component({
  selector: 'app-project-invoice-list',
  standalone: false,
  templateUrl: './project-invoice-list.component.html',
  styleUrl: './project-invoice-list.component.scss'
})
export class ProjectInvoiceListComponent {
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
    minWidth: '70vw',
    disableClose: false,
    data: {},
  };

  openDialog(): void {
    const config = this.defaultdialogoptions;
    config.data = {
      pageGuid: this.route.snapshot.data['pageGuid'],
      type: this.route.snapshot.data['type'],
      element:window.history.state
    };
    const dialogRef = this.dialog.open(ManageProjectInvoiceListComponent, config);
    dialogRef.afterClosed().subscribe((data) => { 
      if(data.redirect){ }
      else    
         this.router.navigate(['../'], { relativeTo: this.route });
    });
  }


}



