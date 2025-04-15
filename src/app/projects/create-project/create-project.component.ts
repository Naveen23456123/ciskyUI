import { Component ,inject} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, NavigationExtras, Route, Router } from '@angular/router';
import { ManageProjectComponent } from '@app/shared/components/manage-project/manage-project.component';
import { NotifyBarService } from '@app/shared/services/notify-bar.service';
import {  CdkOverlayOrigin,  ScrollStrategy,  ScrollStrategyOptions,  CdkConnectedOverlay,} from '@angular/cdk/overlay';

@Component({
  standalone:false,
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrl: './create-project.component.scss'
})
export class CreateProjectComponent {
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
    const dialogRef = this.dialog.open(ManageProjectComponent, config);
    dialogRef.afterClosed().subscribe((data) => {
      if (data && data.valid) {
        let navigationExtras: NavigationExtras = {
          relativeTo: this.route,
          state: { value: data.value, event: 'projectadd', valid: true, msg: 'The Project Created successfully.' }
        };
        this.router.navigate(['../'], navigationExtras);
      }
      else {
        this.router.navigate(['../'], { relativeTo: this.route });
      }
    });
  }


}
