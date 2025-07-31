import { Component ,inject} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, NavigationExtras, Route, Router } from '@angular/router';
import { ManageUploadConsultantComponent } from '@app/shared/components/consultant/manage-upload-consultant/manage-upload-consultant.component';
import { TemplateType } from '@app/shared/models/CSVTemplate';
import { NotifyBarService } from '@app/shared/services/notify-bar.service';

@Component({
  selector: 'app-upload-project',
  standalone: false,
  templateUrl: './upload-project.component.html',
  styleUrl: './upload-project.component.scss'
})
export class UploadProjectComponent {
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
      type: this.route.snapshot.data['type'],
      template_type: TemplateType.PROJECT 
    };
    config.minWidth='75vw';
    const dialogRef = this.dialog.open(ManageUploadConsultantComponent, config);
    dialogRef.afterClosed().subscribe((data) => {
      if (data && data.valid) {
        console.log(data.value);
        let navigationExtras: NavigationExtras = {
          relativeTo: this.route,
          state: { value: data.value, event: 'bulkproject', valid: true, msg: 'The Project(s) Created successfully.' }
        };
        this.router.navigate(['../'], navigationExtras);
      }
      else {
        this.router.navigate(['../'], { relativeTo: this.route });
      }
    });
  }


}

