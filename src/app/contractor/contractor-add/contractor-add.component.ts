import { Component ,inject} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, NavigationExtras, Route, Router } from '@angular/router';
import { ManageProjectComponent } from '@app/shared/components/manage-project/manage-project.component';
import { NotifyBarService } from '@app/shared/services/notify-bar.service';
import {  CdkOverlayOrigin,  ScrollStrategy,  ScrollStrategyOptions,  CdkConnectedOverlay,} from '@angular/cdk/overlay';
import { ManageContractorComponent } from '@app/shared/components/manage-contractor/manage-contractor.component';

@Component({
  selector: 'app-contractor-add',
  standalone: false,
  templateUrl: './contractor-add.component.html',
  styleUrl: './contractor-add.component.scss'
})
export class ContractorAddComponent {
readonly dialog = inject(MatDialog);
  scrollStrategy: ScrollStrategyOptions = inject(ScrollStrategyOptions);

  constructor(
    private router: Router,
    private route: ActivatedRoute, private formbuilder: FormBuilder,
    private notifybar: NotifyBarService,private readonly sso: ScrollStrategyOptions) {
      //this.scrollStrategy = this.sso.noop();
   
  }
  ngOnInit(): void {
    this.openDialog();
  }
  
  private defaultdialogoptions:  MatDialogConfig = {
    //width: '1200px',
    panelClass: 'custom-dialog-container',
    minWidth: '1200px', 
    //maxHeight: '90vh',
    disableClose: false,
    data: {},
    //scrollStrategy: this.scrollStrategy.noop()
  };

  openDialog(): void {
    const config = this.defaultdialogoptions;
    config.data = {
      pageGuid: this.route.snapshot.data['pageGuid'],
      type: this.route.snapshot.data['type']
    };
    const dialogRef = this.dialog.open(ManageContractorComponent, config);
    dialogRef.afterClosed().subscribe((data) => {
      if (data && data.valid) {
        let navigationExtras: NavigationExtras = {
          relativeTo: this.route,
          state: { value: data.value, event: 'contractadd', valid: true, msg: 'The Contractor Created successfully.' }
        };
        this.router.navigate(['../'], navigationExtras);
      }
      else {
        this.router.navigate(['../'], { relativeTo: this.route });
      }
    });
  }


}