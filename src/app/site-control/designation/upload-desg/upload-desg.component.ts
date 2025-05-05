import { Component ,inject} from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, NavigationExtras, Route, Router } from '@angular/router';
import { UploadFileComponent } from '@app/shared/components/upload-file/upload-file.component';
import { TemplateType } from '@app/shared/models/CSVTemplate';


@Component({
  selector: 'app-upload-desg',
  standalone: false,
  templateUrl: './upload-desg.component.html',
  styleUrl: './upload-desg.component.scss'
})
export class UploadDesgComponent {
readonly dialog = inject(MatDialog);

  constructor(
    private router: Router, private route: ActivatedRoute) {    
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
    config.minWidth='75vw';
    config.data = {
      pageGuid: this.route.snapshot.data['pageGuid'],
      type: this.route.snapshot.data['type'],
      template_type: TemplateType.DESIGNATION
    };
    const dialogRef = this.dialog.open(UploadFileComponent, config);
    dialogRef.afterClosed().subscribe((data) => {
      if (data && data.valid) {
        let navigationExtras: NavigationExtras = {
          relativeTo: this.route,
          state: { value: data.value, event: 'updesgadd', valid: true, msg: 'The Designation(s) created successfully.' }
        };
        this.router.navigate(['../'], navigationExtras);
      }
      else {
        this.router.navigate(['../'], { relativeTo: this.route });
      }
    });
  }


}



