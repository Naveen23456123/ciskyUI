import { ScrollStrategyOptions } from '@angular/cdk/overlay';
import { Component ,inject} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, NavigationExtras, Route, Router } from '@angular/router';
import { ManageProjectComponent } from '@app/shared/components/manage-project/manage-project.component';
import { ManageDprComponent } from '@app/shared/components/projects/transport-infra/dpr/manage-dpr/manage-dpr.component';
import { ManageSupervisionComponent } from '@app/shared/components/projects/transport-infra/supervision/manage-supervision/manage-supervision.component';
import { NotifyBarService } from '@app/shared/services/notify-bar.service';

@Component({
  selector: 'app-dpr-create',
  standalone: false,
  templateUrl: './dpr-create.component.html',
  styleUrl: './dpr-create.component.scss'
})
export class DprCreateComponent {
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
    disableClose: false,
    data: {},
  };

  openDialog(): void {
    const config = this.defaultdialogoptions;
    config.data = {
      pageGuid: this.route.snapshot.data['pageGuid'],
      parentPageGuid : this.route.snapshot.parent?.data['pageGuid'],
      type: this.route.snapshot.data['type']
    };
    config.minWidth='75vw';
    const dialogRef = this.dialog.open(ManageDprComponent, config);
    dialogRef.afterClosed().subscribe((data) => {
      if (data && data.valid) {
        let navigationExtras: NavigationExtras = {
          relativeTo: this.route,
          state: { value: data.value, event: 'dpr-projectadd', valid: true, msg: 'The Project Created successfully.' }
        };
        this.router.navigate(['../'], navigationExtras);
      }
      else {
        this.router.navigate(['../'], { relativeTo: this.route });
      }
    });
  }


}


